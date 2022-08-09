"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const user_controller_interfaces_1 = require("../controllers/user/user.controller.interfaces");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const checkRole_middleware_1 = require("../middlewares/checkRole.middleware");
const router = (0, express_1.Router)();
router.post('/login', controllers_1.userController.login);
router.post('/registration', controllers_1.userController.registration);
router.get('/auth', auth_middleware_1.authMiddleware, controllers_1.userController.check);
router.put('/updateAvatar', (0, checkRole_middleware_1.checkRole)([user_controller_interfaces_1.Roles.ADMIN, user_controller_interfaces_1.Roles.USER]), controllers_1.userController.updateAvatar);
router.put('/updateName', (0, checkRole_middleware_1.checkRole)([user_controller_interfaces_1.Roles.ADMIN, user_controller_interfaces_1.Roles.USER]), controllers_1.userController.updateName);
exports.default = router;
//# sourceMappingURL=user.route.js.map