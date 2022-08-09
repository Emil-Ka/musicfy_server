"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const user_controller_interfaces_1 = require("../controllers/user/user.controller.interfaces");
const checkRole_middleware_1 = require("../middlewares/checkRole.middleware");
const router = (0, express_1.Router)();
router.post('/create', (0, checkRole_middleware_1.checkRole)([user_controller_interfaces_1.Roles.ADMIN]), controllers_1.albumController.create);
router.get('/byTitle/:title', controllers_1.albumController.getByTitle);
router.get('/byGenre/:genreId', controllers_1.albumController.getByGenre);
router.get('/byArtist/:artistId', controllers_1.albumController.getByArtist);
router.get('/:id', controllers_1.albumController.getOne);
router.get('/', controllers_1.albumController.getAll);
exports.default = router;
//# sourceMappingURL=album.route.js.map