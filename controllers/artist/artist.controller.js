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
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const ApiError_1 = require("../../error/ApiError");
const models_1 = require("../../models");
class ArtistController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nickname, firstName, lastName, description } = req.body;
                const avatar = req.files.avatar;
                const avatarName = (0, uuid_1.v4)() + '.jpg';
                if (!nickname || !firstName || !lastName) {
                    return next(ApiError_1.ApiError.badRequest('Не заданы нужные параметры'));
                }
                const artist = yield models_1.Artist.create({
                    nickname,
                    firstName,
                    lastName,
                    description,
                    avatar: avatarName,
                });
                avatar.mv(path_1.default.resolve(__dirname, '../..', 'static', avatarName));
                res.json(artist);
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
                const artist = yield models_1.Artist.findOne({ where: { id } });
                return res.json(artist);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getByTrackId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trackId } = req.params;
                const artists = yield models_1.Track.findAndCountAll({
                    where: { id: trackId },
                    attributes: [],
                    include: [{ model: models_1.Artist }],
                });
                return res.json(artists);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getByAlbumId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { albumId } = req.params;
                const artists = yield models_1.Album.findAndCountAll({
                    where: { id: albumId },
                    attributes: [],
                    include: [{ model: models_1.Artist }],
                });
                return res.json(artists);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const artists = yield models_1.Artist.findAndCountAll();
                return res.json(artists);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
}
exports.default = new ArtistController();
//# sourceMappingURL=artist.controller.js.map