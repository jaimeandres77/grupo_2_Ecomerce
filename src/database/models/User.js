module.exports=(sequelize,dataType) => {
    const alias= "Users";
    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        fullname: {
            type: dataType.STRING
        },
        email: {
            type: dataType.STRING
        },
        username: {
            type: dataType.STRING
        },
        password: {
            type: dataType.STRING
        },
        country: {
            type: dataType.STRING
        },
        profileimage: {
            type: dataType.STRING
        },
        isAdmin: {
            type: dataType.BOOLEAN
        },
        sex: {
            type: dataType.ENUM,
            values: ['male','female']
        },
    };
    const config = {
        tableName: "user",
        timestamps: false
    }
    const User = sequelize.define (alias,cols,config);
    return User;
}
