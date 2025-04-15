import { Router } from "express";
import * as controller from "../../controllers/auth/auth"
import { validateRegisterInput } from "../../middleware/auth.validation";

const router = Router();

router.post('/register', validateRegisterInput, controller.register);
router.post('/login', controller.login)

export default router;