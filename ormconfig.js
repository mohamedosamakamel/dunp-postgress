module.exports = {
  type: 'postgres',
  host: 'tyke.db.elephantsql.com',
  port: 5432,
  username: 'uwmwpfvc',
  password: 'Wutx70Y3KstyqCB9Cm1HKg-olDGLXD_K',
  database: 'uwmwpfvc',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
