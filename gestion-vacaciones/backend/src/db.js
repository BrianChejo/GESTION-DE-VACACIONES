const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestion_vacaciones', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql', // O el dialecto que estés usando
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a MySQL');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

module.exports = sequelize;
