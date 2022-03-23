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
    const sale = sequelize.define (alias,cols,config);
    return sale;
}
