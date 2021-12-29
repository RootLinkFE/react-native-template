import { useQuery } from 'react-query';
import { doGet } from '../http-client';
// import { useStore } from 'src/store';

/**
 * 推荐歌单排行
 */
export const GetTopPlayList = () => {
  // const userId = useStore(state => state.userId);
  return useQuery(['TopPlayList'], async () => {
    const res = await doGet('/top/playlist/highquality', { limit: 3 });
    return res.playlists;
  });
};

/**
 * 获取歌单详情
 * /playlist/detail
 * @returns
 */
export const GetPlayListDetail = (id: string) => {
  return useQuery(
    ['PlayListDetail', id],
    async () => {
      const res = await doGet('/playlist/detail', { id });
      return res;
    },
    {
      enabled: !!id,
    },
  );
};
/**
 * 批量获取歌曲详情
 * /song/detail
 * @returns
 */
export const GetSongDetail = (ids: string) => {
  return useQuery(
    ['PlayListDetail', ids],
    async () => {
      const res = await doGet('/song/detail', { ids });
      return res;
    },
    {
      enabled: !!ids,
    },
  );
};
