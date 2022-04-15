const adminMiddleware = (req,res,next) => {
    // console.log({user: req.session.userLogged?.isAdmin});
    if(!req.session.userLogged){
        return res.redirect('/user/login');
    } else {
        if(!req.session.userLogged.isAdmin){
            return res.redirect('/');
        }
    }
    next();
}

module.exports = adminMiddleware;