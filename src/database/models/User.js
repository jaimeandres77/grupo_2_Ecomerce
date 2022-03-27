module.exports=(sequelize,dataType) => {
    const alias= "Users";
    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        name: {
            type: dataType.STRING
        },
        lastName: {
            type: dataType.STRING
        },
        email: {
            type: dataType.STRING
        },
        userName: {
            type: dataType.STRING
        },
        password: {
            type: dataType.STRING
        },
        country: {
            type: dataType.STRING
        },
        profileImage: {
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
        timestamp: false
    }
    const User = sequelize.define (alias,cols,config);

    User.associate = function(models){
        User.hasMany(models.Sales,{
            as:"sales",
            foreignKey:"userId"
        });
        User.hasMany(models.Sales,{
            as:"user_genres",
            foreignKey:"userId"
        })
    }

    return User;
}
