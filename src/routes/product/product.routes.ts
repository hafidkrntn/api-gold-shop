import { Router } from "express";
import * as controller from "../../controllers"

const router = Router()

router.post('/create', controller.createProduct)

export default router;