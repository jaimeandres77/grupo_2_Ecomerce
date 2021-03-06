const db = require('../database/models');

const userLoggedMiddleware = async (req,res,next) => {
    res.locals.isLogged = false;

    const emailInCookie = req.cookies.userEmail;
    // const userFromCookies = User.findByField('email',emailInCookie);
    if(emailInCookie){
        const userFromCookies = await db.Users.findOne({
            where: {email: emailInCookie},
            attributes: ['fullname','email','username','profileimage','sex','country','isAdmin']
        });
        if(userFromCookies){
            req.session.userLogged = userFromCookies;
        }
    }

    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.user = req.session.userLogged;
        res.cookie('userEmail', res.locals.user.email, { maxAge: (1000 * 60) * 60 });
    }
    next();
}

module.exports = userLoggedMiddleware;