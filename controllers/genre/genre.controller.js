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
Object.defineProperty(exports, "__esModule", { value: true });
require("express");
const ApiError_1 = require("../../error/ApiError");
const models_1 = require("../../models");
class GenreController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, color } = req.body;
                const genre = yield models_1.Genre.create({ name, description, color });
                return res.json(genre);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const genre = yield models_1.Genre.findOne({ where: { id } });
                return res.json(genre);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genres = yield models_1.Genre.findAndCountAll();
                return res.json(genres);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
}
exports.default = new GenreController();
//# sourceMappingURL=genre.controller.js.map