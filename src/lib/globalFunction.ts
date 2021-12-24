/**
 * @author giscafer
 * @email giscafer@outlook.com
 * @create date 2021-12-24 17:52:47
 * @modify date 2021-12-24 17:52:47
 * @desc 全局单例方法
 */

import { Toast } from 'native-base';

(global as any).$toast = Toast.show({
  title: 'Hello world',
  placement: 'top',
});
