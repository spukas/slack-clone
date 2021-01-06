import type { ITeam } from '../types';
import { assertIsTypedArray } from '../utils/assertIsTypedArray';
import { apiCall } from '../utils/networking';

/**
  export interface ITeam {
    iconUrl: string;
    name: string;
    id: string;
    channels: IChannel[];
  }
 */
function isITeam(arg: any): arg is ITeam {
  return (
    typeof arg.iconUrl === 'string' &&
    typeof arg.name === 'string' &&
    typeof arg.id === 'string' &&
    Array.isArray(arg.channels)
  );
}

let cachedAllTeamsList: Promise<ITeam[]>;
export async function getAllTeams(): Promise<ITeam[]> {
  if (typeof cachedAllTeamsList === 'undefined')
    cachedAllTeamsList = apiCall('teams').then((rawData) => {
      assertIsTypedArray(rawData, isITeam);
      return rawData;
    });

  return await cachedAllTeamsList;
}

const cachedTeamRecords: Record<string, Promise<ITeam>> = {};

export async function getTeamById(id: string): Promise<ITeam> {
  let cached = cachedTeamRecords[id];
  if (typeof cached === 'undefined')
    cached = cachedTeamRecords[id] = apiCall(`teams/${id}`);
  return await cached;
}
