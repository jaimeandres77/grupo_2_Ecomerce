module.exports = (sequelize,dataType) => {
    const alias = 'Sale_Detail';
    const cols = {
        amount: {
            type: dataType.INTEGER
        },
        subTotalPrice: {
            type: dataType.DOUBLE
        },
        state: {
            type: dataType.BOOLEAN
        }
    };
    const config = {
        tableName: 'sale_detail',
        timestamps: false
    };

    const SaleDetail = sequelize.define(alias,cols,config);

    return SaleDetail
}