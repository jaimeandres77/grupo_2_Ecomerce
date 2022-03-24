module.exports = (sequelize, dataType) => {
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
        name: {
            type: dataType.STRING,
        },
        price: {
            type: dataType.DOUBLE,
        },
        discount: {
            type: dataType.DOUBLE,
        },
        description: {
            type: dataType.TEXT,
        },
        stock: {
            type: dataType.INTEGER,
        },
        status: {
            type: dataType.BOOLEAN,
        },
        image: {
            type: dataType.STRING,
        },

    };
    const config = {
        tableName: 'game',
        timestamps: false
    }

    const Game = sequelize.define(alias, cols, config);

    Game.associate = (models) => {
        Game.belongsToMany(models.Genres, {
            as: 'genres',
            through: 'games_genres',
            foreignKey: 'gameId',
            otherkey: 'genreId',
            timestamps: false
        });
        Game.belongsToMany(models.Platforms, {
            as: 'platforms',
            through: 'games_platforms',
            foreignKey: 'gameId',
            otherkey: 'platformId',
            timestamps: false
        });
    }

    return Game;
}
