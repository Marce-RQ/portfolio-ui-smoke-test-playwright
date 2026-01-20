const environments = {
  dev: {
    baseUrl: 'https://white-label-broker.com',
    apiUrl: 'https://api-white-label-broker.com',
  },
  stg: {
    baseUrl: 'https://staging.white-label-broker.com',
    apiUrl: 'https://staging-api.white-label-broker.com',
  },
};

const currentEnv = process.env.ENV || 'stg';
export const env = environments[currentEnv];
