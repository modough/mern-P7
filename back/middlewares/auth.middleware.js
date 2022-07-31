const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

module.exports.checkUser = (req, res, next) => {
    // on peut lire le token grace au cookie qui est visible grace a cookieParser dans serverjs
    const token = req.cookies.jwt;
    if (token){
        //  jwt verifie si il y'a un token le decode grace au token secret pour voir s'il y'a un id
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err){
                // on supprime le cookie '' et maxAge 1 milliseconde
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge: 1});
                next();
            }else {
                console.log('decodedToken' +  decodedToken);
                let user = await userModel.findById(decodedToken.id);
                res.locals.user = user;
                console.log(res.locals.user);
                next();

            }
        })
    }else{
        res.locals.user = null;
        next();
    }
};

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err)
            }else{
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log('no token')
    }
};
