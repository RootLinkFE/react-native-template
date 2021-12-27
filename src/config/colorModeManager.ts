/**
 * @author giscafer
 * @email giscafer@outlook.com
 * @create date 2021-12-27 11:48:10
 * @modify date 2021-12-27 14:32:51
 * @desc native-base 持久化主题
 */

import { StorageManager, ColorMode } from 'native-base';
import { RhStorage } from '../lib';

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await RhStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await RhStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};

export default colorModeManager;
