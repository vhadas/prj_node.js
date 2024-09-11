const  express =require("express")
const router = express.Router()
const userController=require("../Controllers/controllerUser")
const autorition =require("../middelwares/autorition")

router.post('/login', autorition.auth, controllerUser.login)
router.post('/createUser', autorition.auth, controllerUser.createUser)


module.exports=router