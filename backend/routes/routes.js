const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer')
const { authenticateToken } = require('../middlewares/auth');
const ApartmentsController = require('../Controllers/ApartmentsController')
const UserController = require('../Controllers/UsersController');
const MessageController = require('../Controllers/MessageController');

router.get('/', ApartmentsController.index)

router.get('/service', ApartmentsController.showAll)

router.get('/city', ApartmentsController.indexCity)
router.get('/indexService', ApartmentsController.indexService)

router.get('/:slug', ApartmentsController.show)



router.post('/:id/review', ApartmentsController.addReview)


router.post('/addapartment',  authenticateToken,  upload.single('picture_file'), ApartmentsController.addApartment)

router.put('/:id', authenticateToken, ApartmentsController.updateApartment)

/* users routes */

router.post('/login', UserController.login)

router.post('/register', UserController.register)

/* message route */

router.post('/:id', MessageController.sendMessage)

router.post('/:id/vote', ApartmentsController.voteApartment);



module.exports = router

