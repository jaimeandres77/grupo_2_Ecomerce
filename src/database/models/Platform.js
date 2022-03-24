module.exports = (sequelize, dataType) => {
    const alias = 'Platforms';
    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataType.STRING,
        },

    };

    const config = {
        tableName: 'platform',
        timestamps: false
    }

    const Platform = sequelize.define(alias, cols, config);

    Platform.associate = (models) => {
        Platform.belongsToMany(models.Games,{
            as: 'games',
            through: 'games_platforms',
            foreignKey: 'platformId',
            otherKey: 'gameId',
            timestamps: false
        });
    }

    return Platform;
}