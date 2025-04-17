import { Router } from "express";
import * as controller from '../../controllers'

const router = Router()

router.post('/create', controller.createCategory)
router.get('/get', controller.getAllCategory)
router.get('/get/:id', controller.getCategoryById)
router.put('/update/:id', controller.updateCategory)
router.delete('/delete/:id', controller.deleteCategory)

export default router
