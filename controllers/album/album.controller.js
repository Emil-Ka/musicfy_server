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
require("./album.controller.interface");
class AlbumController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.body;
                let { genreIds, artistIds } = req.body;
                const cover = req.files.cover;
                const coverName = (0, uuid_1.v4)() + '.jpg';
                genreIds = JSON.parse(genreIds);
                artistIds = JSON.parse(artistIds);
                const album = yield models_1.Album.create({ title, cover: coverName });
                if (genreIds) {
                    for (const genreId of genreIds) {
                        models_1.AlbumGenre.create({ genreId, albumId: album.id });
                    }
                }
                if (artistIds) {
                    for (const artistId of artistIds) {
                        models_1.AlbumArtist.create({ albumId: album.id, artistId });
                    }
                }
                cover.mv(path_1.default.resolve(__dirname, '../../..', 'static', coverName));
                return res.json(album);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { limit, page } = req.query;
                page = page || 1;
                limit = limit || 10;
                const offset = page * limit - limit;
                const albums = yield models_1.Album.findAndCountAll({ limit, offset });
                return res.json(albums);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getByTitle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.params;
                const album = yield models_1.Album.findOne({ where: { title } });
                return res.json(album);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getByGenre(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { genreId } = req.params;
                const albums = yield models_1.Genre.findAndCountAll({
                    where: { id: genreId },
                    attributes: [],
                    include: [{ model: models_1.Album }],
                });
                return res.json(albums);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getByArtist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { artistId } = req.params;
                const albums = yield models_1.Artist.findAndCountAll({
                    where: { id: artistId },
                    attributes: [],
                    include: [{ model: models_1.Album }],
                });
                return res.json(albums);
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
                const album = yield models_1.Album.findOne({ where: { id } });
                return res.json(album);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
}
exports.default = new AlbumController();
//# sourceMappingURL=album.controller.js.map