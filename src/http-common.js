const axios = require('axios');
const oauth = require('axios-oauth-client');
const tokenProvider = require('axios-token-interceptor');

const getOwnerCredentials = oauth.client(axios.create(), {
  url: 'https://a6627fdbe1c944516b2700f55562b54b-1830696600.us-east-1.elb.amazonaws.com/auth/realms/mendix/protocol/openid-connect/token',
  grant_type: 'password',
  client_id: 'mendix-api',
  client_secret: 'lnsRorjfEdWlt0WrZA2GzDC9r1pBwkh7',
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