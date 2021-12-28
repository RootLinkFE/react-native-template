import { useQuery } from 'react-query';
import { doGet } from '../http-client';
// import { useStore } from 'src/store';

/**
 *
 */
export const GetTopPlayList = () => {
  // const userId = useStore(state => state.userId);
  return useQuery(['TopPlayList'], async () => {
    const res = await doGet('/top/playlist/highquality', { limit: 3 });
    return res.playlists;
  });
};
