/**
 * @modify date 2021-12-27 11:22:27
 * @desc AsyncStorage 静态方法，方便使用
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class RhStorage {
  /**
   * 保存数据
   * @method setItem
   * @param {String} key 本地缓存的名称
   * @param {Object}  value 数据的键值对
   * @return {void}
   */
  static setItem(key: string, value: any) {
    AsyncStorage.setItem(key, JSON.stringify({ value }));
  }

  /**
   * 获取数据
   * @method getItem
   * @param {String} key 本地缓存的名称
   * @param {Object}  value 数据的键值对
   * @return {Object}
   */
  static async getItem(key: string) {
    const res = await AsyncStorage.getItem(key);
    const obj = JSON.parse(res || '{}');
    return obj.value;
  }

  /**
   * 清空指定的本地缓存
   * @method removeItem
   * @param {String} key 本地缓存的名称
   * @return
   */
  static async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  }
}
