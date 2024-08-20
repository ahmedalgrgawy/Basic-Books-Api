var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { log } = require('winston');

exports.generateToken = (userId, userName, email, fullName, role, userCode) => {
    var token = jwt.sign({
        userId: userId,
        username: userName,
        email: email,
        fullName: fullName,
        roles: role,
        userType: userCode,
    }, process.env.SECRET_KEY, { expiresIn: "7d" })

    return token;

}

exports.verifyToken = (roles) => {
    return async (roles, req, res, next) => {
        try {
            const { token } = req.headers;

            if (!token) {
                console.log("Token Does Not Exist");
                return res.status(errorStatus.unauthorized).send({ error: "unauthorized" })
            }

            var decode = jwt.verify(token, process.env.SECRET_KEY);

            req.user = {
                userId: decode.userId,
                username: decode.username,
                email: decode.email,
                fullName: decode.fullName,
                roles: decode.roles,
                userType: decode.userCode,
            }

            if (!this.hasRole(roles, decode.roles)) {
                console.log("Error : not have the same role");
                return res.status(401).send({ error: 'Authentication failed' })
            }

            next();
        } catch (error) {
            return res.status(errorStatus.unauthorized).send({ error: "Unauthorized Request" })
        }
    }
}

exports.hasRole = function (routeRoles, userRoles) {
    console.log("routeRoles : " + routeRoles)
    let result = false;
    userRoles.forEach(role => {
        if (routeRoles.includes(role)) {
            result = true;
            return;
        }
    });
    console.log("result : " + result);
    return result;
}