const db = require('../database/models');

module.exports = {
    list: async(req,res) => {
        try {
            let sales = [];
            let userId;
            if(req.session.userLogged){
                userId = await db.Users.findOne({
                    where: {
                        fullname: req.session.userLogged.fullname
                    },
                    attributes: ['id']
                });
                sales = await db.Sales.findOne({
                    where: {
                        userId: userId.dataValues.id,
                        state: 'in process'
                    },
                    include: [{
                        association: 'games',
                        attributes: ['id','name','stock','price','image','description'],
                        through: {
                            where: {
                                state: 1
                            },
                            attributes: ['gameId','saleId','amount','subTotalPrice']
                        }
                    }],
                    order: [['id','DESC']]
                });
            }
            res.render('sale',{userId, sales});
        } catch (error) {
            console.log(error);
        }
    },
    guardar: async(req,res) => {
        try {
            const userId = await db.Users.findOne({where: {fullname: req.session.userLogged.fullname}, attributes: ['id']});
            const sale = await db.Sales.findAll({where: {userId: userId.dataValues.id, state: 'in process'}, include: ['games']});
            const {game,amount,price} = req.body;
            if(sale && sale.length === 0){
                const sale = await db.Sales.create({userId: userId.dataValues.id, date: Date.now(), totalPrice: amount * price});
                await sale.setGames(game,{through: {amount, subTotalPrice: amount * price}});
                return res.redirect('/sale');
            } else if(sale && sale.length > 0){
                const findGame = await db.Sale_Detail.findOne({where: {saleId: sale[0].dataValues.id,gameId: game}});
                if(findGame){
                    await db.Sale_Detail.update({amount, subTotalPrice: amount * price},{where: {saleId: sale[0].dataValues.id,gameId: game}});
                } else {
                    await db.Sale_Detail.create({gameId: game, amount, subTotalPrice: amount * price, saleId: sale[0].dataValues.id});
                }
                return res.redirect('/sale');
            }
        } catch (error) {
            console.log({error});
        }
    },
    quitar: async(req,res) => {
        try {
            const gameId = parseInt(req.params.id);
            const userId = await db.Users.findOne({where: {email: req.session.userLogged.email}, attributes: ['id']});
            const saleId = await db.Sales.findOne({where: {userId: userId.dataValues.id, state: 'in process'}, attributes: ['id'],order: [['id','DESC']]});
            const eliminar = await db.Sale_Detail.update({state: 0},{where: {gameId,saleId: saleId.dataValues.id}});
            res.redirect('/sale');
        } catch (error) {
            console.log(error);
        }
    },
    complete: async(req,res) => {
        try {
            if(req.session.userLogged){
                const total = parseInt(req.body.data);
                const userId = await db.Users.findOne({where: {email: req.session.userLogged.email}, attributes: ['id']});
                const saleId = await db.Sales.findOne({where: {userId: userId.dataValues.id, state: 'in process'}, attributes: ['id'], order: [['id','DESC']]});
                const games = JSON.parse(req.body.info);
                for (let i = 0; i < games.length; i++) {
                    const update = await db.Sale_Detail.update({amount: games[i].amount, subTotalPrice: games[i].amount * games[i].price},{where: {saleId: saleId.dataValues.id, gameId: games[i].game}});
                }
                const result = await db.Sales.update({state: 'finalized', totalPrice: total},{where: {userId: userId.dataValues.id, state: 'in process'}});
                return res.redirect('/');
                return res.send(result);
            }
        } catch (error) {
            console.log(error);
        }
    }
}