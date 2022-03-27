const { sequelize } = require(".");

module.exports=(sequelize,dataType) =>{
    const alias= "Genres"
    const cols = {
        id: {
            tipe: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataType.STRING
        },
        description: {
            tupe: dataType.TEXT
        },
    }
    const config = {
        tableName: "genre",
        timestamp: false
    }
    const Genre= sequelize.define (alias,cols,config);

    Genre.associate = function(models){
        Genre.belongsToMany(models.Games,{
            as:"games",
            through:"games_genres",
            foreignKey:"genreId",
            otherKey:"gameId",
            timestamps: false
        })
    }

    return Genre;
}