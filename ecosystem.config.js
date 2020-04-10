module.exports = {
  apps: [
    {
      name: 'ahobsu-node-backend',
      script: './dist/bin/www.js',
      exec_mode: 'cluster',
      instances: '2',
      instance_var: 'INSTANCE_ID',
      env: {
        NODE_ENV: 'production',
      },
      // env_staging: {
      //   NODE_ENV: 'staging',
      //   NODE_CONFIG_DIR: './config/',
      // },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
