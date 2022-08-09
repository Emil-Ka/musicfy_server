"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("../controllers/user/user.controller.interfaces");
const ApiError_1 = require("../error/ApiError");
function authMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[0]; //Bearer dcdcv232jij21232
        if (!token) {
            return next(ApiError_1.ApiError.unauthorized('Пользователь не авторизован'));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        return next();
    }
    catch (err) {
        next(ApiError_1.ApiError.unauthorized('Пользователь не авторизован'));
    }
}
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map