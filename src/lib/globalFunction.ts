/**
 * @author giscafer
 * @email giscafer@outlook.com
 * @create date 2021-12-24 17:52:47
 * @modify date 2021-12-26 17:13:59
 * @desc 全局单例方法
 */

import { Toast } from 'native-base';

/**
 * 全局单例toast
 */
(global as any).$toast = (
  content: string,
  duration: number = 2000,
  placement:
    | 'top'
    | 'top-right'
    | 'top-left'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right' = 'top',
) => {
  Toast.show({
    title: content,
    placement,
    duration,
  });
};
