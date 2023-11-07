import { Router } from 'express'
import SolicitationController from '../controllers/solicitationController'
import FileController from '../controllers/fileController'
import UserController from '../controllers/userController'
import InconsistencyController from '../controllers/inconsistencyController'
import { upload } from '../middlewares/uploadPdfFile'
import { Auth } from '../middlewares/auth'
import OfficesController from '../controllers/officesController'


const router = Router()

router.get('/ping', (req, res) => {
    res.json({pong: true})
})

//Users Routes
router.post('/users/login', UserController.login)
router.get('/users', Auth.private, UserController.getAllUsers)
router.get('/users/:id', Auth.private, UserController.getOneUser)
router.post('/users', UserController.createUser)
router.post('/users/logout', Auth.private, UserController.logoutUser)

//Solicitations Routes
router.get('/solicitations', Auth.private, SolicitationController.getAllSolicitations)
router.get('/solicitations/:id', Auth.private, SolicitationController.getOneSolicitation)
router.post('/solicitations', Auth.private, SolicitationController.postNewSolicitation)
router.put('/solicitations/:id', Auth.private, SolicitationController.putSolicitation)
router.get('/solicitations/filterByDates?&initial_date=:initial_date&final_date=:final_date', Auth.private, SolicitationController.filterSolicitationsByDatesRequests)

//Inconsistencies Routes
router.get('/inconsistencies/:idSolicitation', Auth.private, InconsistencyController.getAllInconsistenciesByIdSolicitation)
router.post('/inconsistencies', Auth.private, InconsistencyController.postInconsistencyByIdSolicitation)
router.put('/inconsistencies/:id', Auth.private, InconsistencyController.updateInconsistency)

//Offices Routes
router.get('/offices', Auth.private, OfficesController.getAllOffices)
router.get('/offices/:uf', Auth.private, OfficesController.getOfficesByUf)
router.get('/offices/city/:city', Auth.private, OfficesController.getOfficesByCity)
//router.post('/officesLocal', Auth.private, OfficesController.postAllOffices)

//File upload
router.post('/upload', Auth.private, upload.single('file'), FileController.uploadFile)
router.post('/uploadFile', Auth.private, FileController.uploadFileMongo)
router.get('/downloadFile/:id', Auth.private, FileController.getFileMongo)

export default router