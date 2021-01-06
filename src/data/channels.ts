import { IChannel } from '../types';
import { apiCall } from '../utils/networking';

const cachedChannelRecords: Record<string, any> = {};

function isIChannel(arg: any): arg is IChannel {
  return (
    typeof arg.teamId === 'string' &&
    typeof arg.name === 'string' &&
    typeof arg.description === 'string' &&
    typeof arg.id === 'string' &&
    Array.isArray(arg.messages)
  );
}

function assertIsTypedObject<T>(
  arg: any,
  check: (val: any) => val is T,
): asserts arg is T {
  if (typeof arg !== 'object' || arg === null)
    throw new Error(`Not an object: ${JSON.stringify(arg)}`);

  if (!check(arg))
    throw new Error(
      `Failed object type check: ${JSON.stringify(arg)}`,
    );
}

export async function getChannelById(id: string): Promise<IChannel> {
  let cached = cachedChannelRecords[id];
  if (typeof cached !== 'undefined') return await cached;
  cached = cachedChannelRecords[id] = apiCall(`Channels/${id}`).then(
    (rawData) => {
      assertIsTypedObject(rawData, isIChannel);
      return rawData;
    },
  );

  return await cached;
}
