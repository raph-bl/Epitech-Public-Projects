const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    });

    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

module.exports = router;
