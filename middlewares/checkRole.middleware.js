"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
require("express");
require("../controllers/user/user.controller.interfaces");
const ApiError_1 = require("../error/ApiError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function checkRole(roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            return next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                console.log('нет токена');
                return next(ApiError_1.ApiError.unauthorized('Пользователь не авторизован'));
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            if (!roles.includes(decoded.role)) {
                return next(ApiError_1.ApiError.forbidden('Нет доступа'));
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            console.log(err);
            return next(ApiError_1.ApiError.unauthorized('Пользователь не авторизован'));
        }
    };
}
exports.checkRole = checkRole;
//# sourceMappingURL=checkRole.middleware.js.map