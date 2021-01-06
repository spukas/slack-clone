import { IMessage } from '../types';
import { assertIsTypedArray } from '../utils/assertIsTypedArray';
import { apiCall } from '../utils/networking';

const cachedMessageRecordArrays: Record<string, any> = {};

/**
 interface IUser {
  id: number;
  username: string;
  name: string;
  iconUrl: string;
}

interface IMessage {
  id: number;
  teamId: string;
  channelId: string;
  userId: string;
  createdAt: string;
  user: IUser;
  body: string;
}
 */
function isIMessage(arg: any): arg is IMessage {
  return (
    typeof arg.id === 'number' &&
    typeof arg.teamId === 'string' &&
    typeof arg.channelId === 'string' &&
    typeof arg.userId === 'string' &&
    typeof arg.body === 'string' &&
    arg.user instanceof Object
  );
}

export async function getChannelMessages(
  teamId: string,
  channelId: string,
): Promise<IMessage[]> {
  let cached = cachedMessageRecordArrays[channelId];
  if (typeof cached === 'undefined')
    cached = cachedMessageRecordArrays[channelId] = apiCall(
      `teams/${teamId}/channels/${channelId}/messages`,
    ).then((rawData) => {
      assertIsTypedArray(rawData, isIMessage);
      return rawData;
    });
  return await cached;
}
