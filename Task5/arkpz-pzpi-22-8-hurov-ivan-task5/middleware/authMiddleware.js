const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    try {
        let token;
        
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ 
                message: 'Access denied. No token provided.'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ 
                message: 'Invalid token.'
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({ 
            message: 'Authentication error', 
            error: error.message 
        });
    }
};