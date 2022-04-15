const db = require('../../database/models');

module.exports = {
    list: async(req,res) => {
        try {
            const count = await db.Games.count({where: {status: 1}});
            const page = isNaN(req.query.page) || parseInt(req.query.page) <= 1 || parseInt(req.query.page) > Math.ceil(count / 10) ? 1 : parseInt(req.query.page);
            const products = await db.Games.findAll({
                where: {status: 1},
                attributes: ['id','name','description'],
                include: ['genres','platforms'],
                order: [['name','ASC']],
                limit: 10,
                offset: (page - 1) * 10

            });
            const data = products.map(product => {
                return {...product.dataValues, genres: product.dataValues.genres.length, platforms: product.dataValues.platforms.length, detail: `/api/products/${product.dataValues.id}`}
            });
            return res.json({
                meta: {
                    status: 200,
                    count,
                    url: req.originalUrl,
                    page
                },
                data
            });
        } catch (error) {
            console.log(error);
        }
    },
    detail: async(req,res) => {
        try {
            const id = parseInt(req.params.id);
            const product = await db.Games.findOne({
                where: {id,status: 1},
                include: [
                    {
                        association: 'genres',
                        attributes: ['id','name']
                    },
                    {
                        association: 'platforms',
                        attributes: ['id','name']
                    },
                ]
            });
            const data = product ? {
                ...product.dataValues,
                image: `/img/games/${product.dataValues.image}`,
            } : 0;
            return res.json({
                meta: {
                    status: 200,
                    count: data ? 1 : 0,
                    url: req.originalUrl,
                },
                data: product
            });
        } catch (error) {
            console.log(error);
        }
    },
}