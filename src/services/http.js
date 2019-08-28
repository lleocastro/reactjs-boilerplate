import axios from 'axios';

axios.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${''}`; // TODO: token logic
  return config;
}, (err) => {
  window.console.log(err);
  return Promise.reject(err);
});

axios.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    const requestConfig = error.config;
    return axios(requestConfig);
  }

  return Promise.reject(error);
});

export default axios;

export const makeGraphqlQuery = (query, variables) => ({
  query,
  variables,
});

export const graphql = (query, variables, params = {}) => axios({
  method: 'POST',
  url: process.env.API_BASE_URL,
  data: makeGraphqlQuery(query, variables),
  ...params,
});
