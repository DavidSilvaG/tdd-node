module.exports = {
    "type": "mysql",
    "host": process.env.DATABASE_HOST,
    "port": 3306,
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "synchronize": true,
    "logging": false,
    'entities': process.env.ENV === 'local' ? ['src/infrastructure/database/entity/*.ts'] : ['dist/src/infrastructure/database/entity/*.js']
}
