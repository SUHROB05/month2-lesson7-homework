import express from "express"

import {createUserController, deleteUserInfoController, getUserInfoController, updateUserController} from '../controller/user.controller.js'

const router = express.Router()

router.post('/', createUserController)
router.get('/:item', getUserInfoController)
router.put('/:item', updateUserController)
router.delete('/:username/:password', deleteUserInfoController)

export default router