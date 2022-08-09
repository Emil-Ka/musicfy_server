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
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const ApiError_1 = require("../../error/ApiError");
const models_1 = require("../../models");
class PlaylistController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, userId } = req.body;
                const cover = req.files.cover;
                const coverName = (0, uuid_1.v4)() + '.jpg';
                const playlist = yield models_1.Playlist.create({ title, userId, cover: coverName });
                cover.mv(path_1.default.resolve(__dirname, '../../..', 'static', coverName));
                res.json(playlist);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const playlist = yield models_1.Playlist.destroy({ where: { id } });
                res.json(playlist);
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
                const playlist = yield models_1.Playlist.findOne({ where: { id } });
                res.json(playlist);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const playlists = yield models_1.Playlist.findAndCountAll({ where: { userId } });
                res.json(playlists);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
}
exports.default = new PlaylistController();
//# sourceMappingURL=playlist.controller.js.map