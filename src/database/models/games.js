const { sequelize } = require("./models");

module.exports =(sequelize,dataType) => {
    const alias = 'Games';
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

    Game.associate = function(models){
        Game.belongsToMany(models.Sales,{
            as:"sales",
            through: "sale_datail",
            foreignKey: "gameId",
            otherKey: "saleId",
            timestamps: false
        })
        Game.belongsToMany(models.Genres,{
            as:"genres",
            through:"games_genres",
            foreignKey:"gameId",
            otherKey:"genreId",
            timestamps: false
        })
        Game.belongsToMany(models.Platforms,{
            as:"platforms",
            through: "games_platforms",
            foreignKey: "gameId",
            otherKey: "platformId",
            timestamps: false
        })
    }
    
    return Game;
}
