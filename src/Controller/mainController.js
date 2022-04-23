const { sequelize } = require('../database/models');
const db = require('../database/models');

module.exports = {
    index: async (req, res) => {
        try {
            let total = 0;
            if (req.session.userLogged) {
                const userId = await db.Users.findOne({where: {email: req.session.userLogged.email},attributes: ['id'], order: [['id','DESC']]});
                const sale = await db.Sales.findOne({ where: { state: 'in process', userId: userId.dataValues.id }, attributes: ['id'] });
                if (sale) {
                    total = await db.Sale_Detail.findAll({ where: { saleId: sale.dataValues.id, state: 1 }, attributes: ['saleId', [sequelize.fn('sum', sequelize.col('subTotalPrice')), 'total']], group: ['saleId'], raw: true });
                }
            }
            // Listado de Juegos
            const limit = 10;
            const count = await db.Games.count({where: {status: 1}});
            const page = isNaN(req.query.page) || parseInt(req.query.page) <= 1 || parseInt(req.query.page) > Math.ceil(count / limit) ? 1 : parseInt(req.query.page);
            const games = await db.Games.findAll({where: {status: 1}, attributes: ['id', 'name', 'price', 'image'], order: [['name', 'ASC']], limit, offset: (page - 1) * 10 });
            return res.render('home', { games, count, page, limit, total: total[0]?.total || 0 });
        } catch (error) {
            console.log(error);
        }
    }
}