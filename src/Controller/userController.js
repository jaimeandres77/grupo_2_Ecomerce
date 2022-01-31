module.exports = {

    register: (req, res) => {
        res.render('user/register');
    },
    processRegister: (req,res) => {
        res.send ("Ok,viniste por post");
    },
    login: (req, res) => {
        res.render('user/login');
    },
}

