/**
 * Check if array elements implement provided type
 *
 * @param arg - array of elements
 * @param check - function to check a type for an element
 */

export function assertIsTypedArray<T>(
  arg: any[],
  check: (val: any) => val is T,
): asserts arg is T[] {
  if (!Array.isArray(arg))
    throw new Error(`Not an array: ${JSON.stringify(arg)}`);

  if (!arg.every(check))
    throw new Error(`Failed type check: ${JSON.stringify(arg)}`);
}
