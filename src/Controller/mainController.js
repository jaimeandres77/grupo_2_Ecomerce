const db = require('../database/models');

module.exports={
    index: async (req, res) => {
        try {
            const limit = 10;
            const count = await db.Games.count();
            const page = isNaN(req.query.page) || parseInt(req.query.page) <= 1 || parseInt(req.query.page) > Math.ceil(count / limit) ? 1 : parseInt(req.query.page);
            const games = await db.Games.findAll({attributes: ['id','name','price','image'],order: [['name','ASC']],limit,offset: (page - 1) * 10});
            res.render('home',{games,count,page,limit});
        } catch (error) {
            console.log(error);
        }
    }
}