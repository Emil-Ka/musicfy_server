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
require("express");
require("express-fileupload");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../../error/ApiError");
const models_1 = require("../../models");
const user_controller_interfaces_1 = require("./user.controller.interfaces");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function generateJWT(id, email, role = user_controller_interfaces_1.Roles.USER) {
    const token = jsonwebtoken_1.default.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
    return token;
}
class UserController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return next(ApiError_1.ApiError.badRequest('Некорректный E-mail или пароль'));
                }
                const user = yield models_1.User.findOne({ where: { email } });
                if (!user) {
                    return next(ApiError_1.ApiError.internalError('Пользователь с таким E-mail не существует'));
                }
                const comparePass = bcrypt_1.default.compareSync(password, user.password);
                if (!comparePass) {
                    return next(ApiError_1.ApiError.forbidden('Неверный пароль'));
                }
                const token = generateJWT(user.id, email, user.role);
                res.json({ token });
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, role } = req.body;
                const avatar = req.files.avatar;
                const avatarName = (0, uuid_1.v4)() + '.jpg';
                if (!name || !email || !password) {
                    return next(ApiError_1.ApiError.badRequest('Не заданы нужные параметры'));
                }
                const candidate = yield models_1.User.findOne({ where: { email } });
                if (candidate) {
                    return next(ApiError_1.ApiError.badRequest('Пользователь с таким email уже существует'));
                }
                avatar.mv(path_1.default.resolve(__dirname, '../..', 'static', avatarName));
                const hashPassword = yield bcrypt_1.default.hash(password, 5);
                const user = yield models_1.User.create({
                    name,
                    email,
                    password: hashPassword,
                    avatar: avatarName,
                    role,
                });
                yield models_1.Liked.create({ userId: user.id });
                const token = generateJWT(user.id, email, role);
                res.json({ token });
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role);
        res.json({ token });
    }
    updateAvatar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                const avatar = req.files.avatar;
                const avatarName = (0, uuid_1.v4)() + '.jpg';
                const user = yield models_1.User.update({ avatar: avatarName }, { where: { id: userId } });
                avatar.mv(path_1.default.resolve(__dirname, '../..', 'static', avatarName));
                return res.json(user);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    updateName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, name } = req.body;
                const user = yield models_1.User.update({ name }, { where: { id: userId } });
                return res.json(user);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map