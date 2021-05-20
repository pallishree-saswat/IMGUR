const { Router } = require("express");
const router = Router();
const upload = require("../utils/multer");

console.log('hello')
const authenticate = require('../middlewares/authenticate');

const { userRegister, userLogin, singleUser, userLogout,  userImageUpdate, addFav, deleteFav, publicImage,allImage,myfav,myphotos } = require('../controllers/userController');
const { route } = require("../app");

router.post('/user/register', userRegister);

router.post('/user/login', userLogin);


router.post("/user/imageupload/:token", authenticate, upload.array("file",10), userImageUpdate);


router.get('/user/me/:token', authenticate, singleUser);
router.post('/user/addfav/:photoId/:token', authenticate, addFav);

router.delete('/user/logout/:token', authenticate, userLogout);

router.delete('/user/removefav/:favId/:token', authenticate, deleteFav);

router.get('/publicimages', publicImage)
router.get('/images/:token',authenticate,allImage)
router.get('/myfav/:token',authenticate,myfav)
router.get('/myphotos/:token',authenticate,myphotos)


module.exports = router;