const res = require("express/lib/response");

module.exports={
    index: (req, res) => {
        res.render('home');
    },   
}
