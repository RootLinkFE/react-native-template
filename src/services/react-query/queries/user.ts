import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { ApiService } from 'src/services/ApiService';
// import { useStore } from 'src/store';

/**
 *
 * @returns Deals with my request details api
 * Caching handled by react query
 */
export const GetUserDetails = () => {
  const staffRequestService = ApiService.createInstance();
  // const userId = useStore(state => state.userId);

  return useQuery(['UserDetails'], async () => {
    const response: AxiosResponse = await staffRequestService.getCharacters();
    return response.data;
  });
};
