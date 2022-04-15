const db = require('../../database/models');

module.exports = {
    list: async (req,res) => {
        try {
            const count = await db.Users.count();
            const page = isNaN(req.query.page) || parseInt(req.query.page) <= 1 || parseInt(req.query.page) > Math.ceil(count / 10) ? 1 : parseInt(req.query.page);
            const users = await db.Users.findAll({
                attributes: ['id','fullname','email'],
                order: [['fullname','ASC']],
                limit: 10,
                offset: (page - 1) * 10
            });
            const data = users.map(user => {
                return {... user.dataValues, detail: `/api/users/${user.dataValues.id}`}
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
    detail: async (req,res) => {
        try {
            const id = parseInt(req.params.id);
            const user = await db.Users.findByPk(id,{attributes: ['id','fullname','email','profileimage','sex','country']});
            const data = {...user.dataValues, profileimage: `/img/Avatars/${user.dataValues.profileimage}`};
            return res.json({
                meta: {
                    status: 200,
                    count: 1,
                    url: req.originalUrl
                },
                data
            });
        } catch (error) {
            console.log(error);
        }
    },
}