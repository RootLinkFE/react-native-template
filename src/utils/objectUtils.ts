import { omitBy } from 'lodash';

/**
 * 删除对象中为falsy的键值对
 * @param obj
 * @returns
 */
export function removeEmpty<T extends Record<string, any>>(obj: T): T {
  return omitBy(
    {
      ...obj,
    },
    item => [null, undefined, ''].includes(item),
  ) as T;
}
