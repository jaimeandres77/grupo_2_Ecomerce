const { sequelize } = require(".");

module.exports=(sequelize,dataType) => {
    const alias= "Sales";
    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        userId: {
            type: dataType.INTEGER
        },
        date: {
            type: dataType.DATETIME
        },
        totalPrice: {
            type: dataType.DOUBLE
        },
    };
    const config = {
        tableName: "sale",
        timestamp: false
    }
    const Sale = sequelize.define (alias,cols,config);

    Sale.associate = function(models){
        Sale.belongsTo(models.Users,{
            as:"user",
            foreignKey:"userId"
        })
        Sale.belongsToMany(models.Games,{
            as:"games",
            through: "sale_datail",
            foreignKey: "sailId",
            otherKey: "gameId",
            timestamps: false
        })
    }


    return Sale;
}
