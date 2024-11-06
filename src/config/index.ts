// src/config.ts
export default () => ({
    database: {
      type: process.env.DB_TYPE || 'postgres', // Set the database type (default: postgres)
      host: process.env.DB_HOST || 'localhost', // Set the database host (default: localhost)
      port: +process.env.DB_PORT || 5432, // Set the database port (default: 5432)
      username: process.env.DB_USERNAME || 'postgres', // Set the database username
      password: process.env.DB_PASSWORD || 'password', // Set the database password
      database: process.env.DB_DATABASE || 'test', // Set the database name
      synchronize: process.env.DB_SYNCHRONIZE === 'true', // Enable synchronize option
    },
  });
  