"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const user_controller_interfaces_1 = require("../controllers/user/user.controller.interfaces");
const checkRole_middleware_1 = require("../middlewares/checkRole.middleware");
const router = (0, express_1.Router)();
router.post('/create', (0, checkRole_middleware_1.checkRole)([user_controller_interfaces_1.Roles.ADMIN, user_controller_interfaces_1.Roles.USER]), controllers_1.playlistController.create);
router.delete('/delete/:id', (0, checkRole_middleware_1.checkRole)([user_controller_interfaces_1.Roles.ADMIN, user_controller_interfaces_1.Roles.USER]), controllers_1.playlistController.delete);
router.get('/:id', (0, checkRole_middleware_1.checkRole)([user_controller_interfaces_1.Roles.ADMIN, user_controller_interfaces_1.Roles.USER]), controllers_1.playlistController.getOne);
router.get('/byUserId/:userId', (0, checkRole_middleware_1.checkRole)([user_controller_interfaces_1.Roles.ADMIN, user_controller_interfaces_1.Roles.USER]), controllers_1.playlistController.getByUserId);
exports.default = router;
//# sourceMappingURL=playlist.route.js.map