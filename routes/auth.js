const { Router } = require('express');
const { createUser, loginUser, renewUser } = require('../controllers/auth');

const router = Router();

router.post('/new', createUser )
router.post('/', loginUser)
router.get('/renew', renewUser)

module.exports = router;