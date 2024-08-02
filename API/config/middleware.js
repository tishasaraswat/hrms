var jwt = require('jsonwebtoken');            //for secret token
require('dotenv').config();                   //.env file ko load krane ke liye 

const authentication = (req, res, next) => {      //authentication= middleware function h
    // get the user from the jwt token and add id to req object
    const token = req.header('authorization')
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token " })
    }
try{ const data = jwt.verify(token, process.env.JWT_SECRET_CODE);
    req.user = data.user                                  //using for getting user information
    next();}                                            //using next for calling middleware
catch(error){
    res.status(401).send({ error: "please authenticate using a valid token " })}
}
module.exports = authentication