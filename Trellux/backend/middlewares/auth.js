const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

    // Méthode pas http-only:
    // const authHeader = req.headers['authorization'];
    // if (!authHeader) {
    //     return res.status(401).json({
    //         success: false,
    //         message: 'Missing auth header'
    //     });
    // }
    // const token = authHeader.split(' ')[1];

    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Missing token'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };