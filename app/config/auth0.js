require('dotenv').config({silent: true});

import { ManagementClient } from 'auth0';
import auth0ApiClient from 'auth0-api-tokens';

const TOKEN_EXPIRATION_IN_SECONDS = 60 * 60;

const createToken = auth0ApiClient({
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

const token = createToken({
  scopes: {
    users: ['read', 'update', 'create'],
    clients: ['delete']
  },
  lifetimeInSeconds: TOKEN_EXPIRATION_IN_SECONDS
});

export const auth0 = new ManagementClient({
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJGVzM1dGsyQlVCZzNYcGpxdWpEZERMSE1GeVlSVmhBWiIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInVwZGF0ZSIsImNyZWF0ZSJdfX0sImlhdCI6MTQ4MTY1NzIyOCwianRpIjoiNzlkNmYxNTE3ZGFlOGY5YTA3ZGJmNTIyOTcxZTZkZDIifQ.3kyt1gqdBCLtcW8c5iAKrWi13eIdaErG5HijtX2Fql0',
  domain: process.env.AUTH0_DOMAIN
});
