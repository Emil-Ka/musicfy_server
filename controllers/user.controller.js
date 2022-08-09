"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
require("express");
require("express-fileupload");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = __importDefault(require("uuid"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../error/ApiError");
const models_1 = require("../models");
var Roles;
(function (Roles) {
    Roles["USER"] = "USER";
    Roles["ADMIN"] = "ADMIN";
})(Roles = exports.Roles || (exports.Roles = {}));
function generateJWT(id, email, role = Roles.USER) {
    const token = jsonwebtoken_1.default.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
    return token;
}
class UserController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ name: 'login' });
        });
    }
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role } = req.body;
            const avatar = req.files.avatar;
            const avatarName = uuid_1.default.v4() + '.jpg';
            avatar.mv(path_1.default.resolve(__dirname, '../..', 'static', avatarName));
            if (!name || !email || !password) {
                return next(ApiError_1.ApiError.badRequest('Не заданы нужные параметры'));
            }
            const candidate = yield models_1.User.findOne({ where: { email } });
            if (candidate) {
                return next(ApiError_1.ApiError.badRequest('Пользователь с таким email уже существует'));
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 5);
            const user = yield models_1.User.create({ name, email, password: hashPassword, role });
            const token = generateJWT(user.id, email, role);
            res.json({ token });
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map