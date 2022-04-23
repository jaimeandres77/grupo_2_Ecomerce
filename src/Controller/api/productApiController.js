const db = require('../../database/models');

module.exports = {
    allList: async(req,res) => {
        try {
            const count = await db.Games.count({where: {status: 1}});
            const products = await db.Games.findAll({
                where: {status: 1},
                attributes: ['id','name','description'],
                include: ['genres','platforms'],
                order: [['name','ASC']]
            });
            const countByCategory = {genre: {}, platform: {}};
            const data = products.map(product => {
                product.genres.forEach(genre => {
                    if(countByCategory.genre[genre.dataValues.name]){
                        countByCategory.genre[genre.dataValues.name] += 1
                    }else{
                        countByCategory.genre[genre.dataValues.name] = 1
                    }
                });
                product.platforms.forEach(platform => {
                    if(countByCategory.platform[platform.dataValues.name]){
                        countByCategory.platform[platform.dataValues.name] += 1
                    }else{
                        countByCategory.platform[platform.dataValues.name] = 1
                    }
                });
                return {...product.dataValues, genres: product.dataValues.genres.length, platforms: product.dataValues.platforms.length, detail: `/api/products/${product.dataValues.id}`}
            });
            return res.json({
                meta: {
                    status: 200,
                    count,
                    countByCategory,
                    url: '/api/products/:id',
                },
                data
            });
        } catch (error) {
            console.log(error);
        }
    },
    pageList: async(req,res) => {
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
            const countByCategory = {genre: {}, platform: {}};
            const data = products.map(product => {
                product.genres.forEach(genre => {
                    if(countByCategory.genre[genre.dataValues.name]){
                        countByCategory.genre[genre.dataValues.name] += 1
                    }else{
                        countByCategory.genre[genre.dataValues.name] = 1
                    }
                });
                product.platforms.forEach(platform => {
                    if(countByCategory.platform[platform.dataValues.name]){
                        countByCategory.platform[platform.dataValues.name] += 1
                    }else{
                        countByCategory.platform[platform.dataValues.name] = 1
                    }
                });
                return {...product.dataValues, genres: product.dataValues.genres.length, platforms: product.dataValues.platforms.length, detail: `/api/products/${product.dataValues.id}`}
            });
            return res.json({
                meta: {
                    status: 200,
                    count,
                    countByCategory,
                    // url: req.originalUrl,
                    url: '/api/products/:id',
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
                data
            });
        } catch (error) {
            console.log(error);
        }
    },
}