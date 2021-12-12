const axios = require('axios');
const oauth = require('axios-oauth-client');
const tokenProvider = require('axios-token-interceptor');

const getOwnerCredentials = oauth.client(axios.create(), {
  url: 'http://a97765db335f5419f95d0ec48c33ee1d-1963285741.us-east-1.elb.amazonaws.com/auth/realms/mendix/protocol/openid-connect/token',
  grant_type: 'password',
  client_id: 'mendix-api',
  client_secret: '39810546-8bc2-4874-8ad0-acd72192b452',
  username: 'test-admin',
  password: 'password',
  scope: 'openid'
});

const instance = axios.create({
    baseURL: "http://sdl-mendix.hopto.org/v1/",
    headers: {
      "Content-type": "application/json"
    }
});
instance.interceptors.request.use(
  // Wraps axios-token-interceptor with oauth-specific configuration,
  // fetches the token using the desired claim method, and caches
  // until the token expires
  oauth.interceptor(tokenProvider, getOwnerCredentials)
);


export default instance;