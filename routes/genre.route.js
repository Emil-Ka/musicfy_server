"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const user_controller_interfaces_1 = require("../controllers/user/user.controller.interfaces");
const checkRole_middleware_1 = require("../middlewares/checkRole.middleware");
const router = (0, express_1.Router)();
router.post('/create', (0, checkRole_middleware_1.checkRole)([user_controller_interfaces_1.Roles.ADMIN]), controllers_1.genreController.create);
router.get('/:id', controllers_1.genreController.getOne);
router.get('/', controllers_1.genreController.getAll);
exports.default = router;
//# sourceMappingURL=genre.route.js.map