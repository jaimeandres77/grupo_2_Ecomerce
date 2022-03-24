module.exports = (sequelize, dataType) => {
    const alias = "Genres"
    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataType.STRING
        },
        description: {
            type: dataType.TEXT
        },
    }
    const config = {
        tableName: "genre",
        timestamps: false
    }
    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = (models) => {
        Genre.belongsToMany(models.Games, {
            as: 'games',
            through: 'games_genres',
            foreignKey: 'genreId',
            otherKey: 'gameId',
            timestamps: false
        });
    }

    return Genre;
}