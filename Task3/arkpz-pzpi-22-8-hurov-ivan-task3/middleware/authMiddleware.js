const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Сохраняем данные пользователя для использования в других маршрутах
        next();
    } catch (error) {
        res.status(403).json({ message: 'Недействительный токен' });
    }
};
