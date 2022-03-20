const { sequelize } = require("./models");

module.exports =(sequelize,dataType) => {
    const alias = 'games';
    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sku: {
            type: dataType.STRING,
        },
        name:{
            type: dataType.STRING,
        },
        price: {
            type: dataType.DOUBLE,
        },
        discount:{
            type: dataType.DOUBLE,
        },
        description: {
            type: dataType.TEXT,
        },
        stock:{
            type: dataType.INTEGER,
        },
        status: {
            type: dataType.BOOLEAN,
        },
        image:{
            type: dataType.STRING,
        },

    };
    const config ={
        tableName: 'game',
        timeTamps: false
    }

    const Game = sequelize.define(alias,cols, config);
    
    return Game;
}
