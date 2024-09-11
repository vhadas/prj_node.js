const  express =require("express")
const router = express.Router()
const toyController=require("../Controllers/controllerToy")
const autorition =require("../middelwares/autorition")

router.get('/getAllToys', controllerToy.getAllToys)
router.get('/getToyById/:id', controllerToy.getToyById)
router.post('/addToy',autorition.createToken, controllerToy.addToy)
router.delete('/deleteToy/:id',autorition.createToken, controllerToy.deleteToy)
router.put('/updateToy/:id',autorition.createToken, controllerToy.updateToy)
router.get('/getToysByPrice', controllerToy.getToysByPrice)
router.get('/getToysByName', controllerToy.getToysByName)

module.exports=router