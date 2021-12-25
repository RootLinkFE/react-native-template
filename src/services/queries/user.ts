import { useQuery } from 'react-query';
import RhApi from 'src/rh/apis';
// import { useStore } from 'src/store';

/**
 *
 * @returns Deals with my request details api
 * Caching handled by react query
 */
export const GetUserDetails = () => {
  // const userId = useStore(state => state.userId);

  return useQuery(['UserDetails'], RhApi.Base.getCharacters);
};
