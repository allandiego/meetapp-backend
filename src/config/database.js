require('dotenv/config');

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  // supportBigNumbers: true,
  define: {
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_unicode_520_ci',
    },
    timestamps: true,
    underscored: true,
    underscoredAll: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  // eslint-disable-next-line no-console
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};
