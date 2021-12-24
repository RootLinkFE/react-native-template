import axios from 'axios';

import Config from 'react-native-config';

const baseURL = Config['BASE_URL'];

const apiClient = axios.create({
  baseURL,
  responseType: 'json',
  withCredentials: true,
});

export { apiClient };
