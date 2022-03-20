const { sequelize } = require("./models");

module.exports = (sequelize,dataType) => {
    const alias = 'plataform';
    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
        },

        name: {
            type: dataType.STRING,    
        },

    };

    const config ={
        tableName: 'plataform',
        timeTamps: false
    }

    const plataform = sequelize.define(alias,cols, config);
    
    return plataform;
}