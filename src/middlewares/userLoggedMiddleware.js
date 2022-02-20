const User = require('../models/User');

const userLoggedMiddleware = (req,res,next) => {
    res.locals.isLogged = false;

    const emailInCookie = req.cookies.userEmail;
    const userFromCookies = User.findByField('email',emailInCookie)
    if(userFromCookies){
        req.session.userLogged = userFromCookies;
    }

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.user = req.session.userLogged;
    }
    next();
}

module.exports = userLoggedMiddleware;