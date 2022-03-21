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
    const user= sequelize.define (alias,cols,config);
    return user;
}