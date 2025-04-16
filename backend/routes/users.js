const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getUser, createUser, login, getAllUsers } = require('../controllers/users');

router.post('/signin', login);

router.post('/signup', createUser);

router.use(auth);

router.get('/me', getUser);
router.get('/', getAllUsers);

module.exports = router;
