module.exports = (sequelize, dataType) => {
    const alias = "Sales";
    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: dataType.INTEGER
        },
        date: {
            type: dataType.DATE
        },
        totalPrice: {
            type: dataType.DOUBLE
        },
    };
    const config = {
        tableName: "sale",
        timestamps: false
    }
    const Sale = sequelize.define(alias, cols, config);

    Sale.associate = models => {
        Sale.belongsTo(models.Users, {
            as: 'user',
            foreignKey: 'userId'
        });
        Sale.belongsToMany(models.Games, {
            as: 'games',
            through: 'sale_detail',
            foreignKey: 'saleId',
            otherKey: 'gameId',
            timestamps: false
        });
    }

    return Sale;
}