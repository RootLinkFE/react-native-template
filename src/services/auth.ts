import { TOKEN_KEY, USER_INFO_KEY } from 'src/config/constant';
import { RhStorage } from '../lib';
import { removeEmpty } from '../utils/objectUtils';

/**
 * 退出登录
 * @returns
 */
export const signOut = () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      RhStorage.removeItem(TOKEN_KEY),
      RhStorage.removeItem(USER_INFO_KEY),
    ])
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
};

/**
 * 判断是否已登录
 */
export const isSignedIn = async () => {
  const result = await RhStorage.getItem(USER_INFO_KEY);
  return !!result;
};

/**
 * 持久化token相关数据
 * @param token
 */
export const saveToken = (token: Token) => {
  const { accessToken, refreshToken, tokenExpireTime, tokenExpiresIn } = token;
  const _token = removeEmpty({
    accessToken,
    refreshToken,
    tokenExpireTime,
    tokenExpiresIn,
  });
  RhStorage.setItem(TOKEN_KEY, JSON.stringify(_token));
};

export const getToken: () => Promise<Token> = async () => {
  const result = await RhStorage.getItem(TOKEN_KEY);
  if (result) {
    return JSON.parse(result);
  }
  return {};
};
