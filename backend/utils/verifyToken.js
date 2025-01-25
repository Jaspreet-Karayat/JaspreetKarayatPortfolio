const jwt = require('jsonwebtoken');

// JWT Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, process.env.TOKENKEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token. Access denied." });
            }
            req.user = decoded; // Attach decoded user info to the request object for later use
            next();
        });
    } else {
        return res.status(403).json({ message: "No token provided. Authorization denied." });
    }
};

module.exports = verifyToken;
