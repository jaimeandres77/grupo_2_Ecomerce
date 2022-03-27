const { sequelize } = require("./models");

module.exports = (sequelize,dataType) => {
    const alias = 'Plataforms';
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

    const Plataform = sequelize.define(alias,cols, config);
    
    Plataform.associate = function(models){
        Plataform.belongsToMany(models.Games,{
            as:"games",
            through: "games_platforms",
            foreignKey: "platformId",
            otherKey: "gameId",
            timestamps: false
        })
    }

    return Plataform;
}