import { Router } from "express";
import * as controller from '../../controllers'


const router = Router()

router.post('/create', controller.createGoldPurity)
router.get('/get', controller.getGoldPurity)
router.get('/get/pagination', controller.getGoldPurityPagination)
router.get('/get/:id', controller.getGoldPurityById)
router.put('/update/:id', controller.updateGoldPurity)
router.delete('/delete/:id', controller.deleteGoldPurity)

export default router
