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
require("./track.controller.interface");
class TrackController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, albumId } = req.body;
                let { genreIds, artistIds } = req.body;
                genreIds = JSON.parse(genreIds);
                artistIds = JSON.parse(artistIds);
                const cover = req.files.cover;
                console.log('cover', cover);
                const coverName = (0, uuid_1.v4)() + '.jpg';
                cover.mv(path_1.default.resolve(__dirname, '../..', 'static', coverName));
                const file = req.files.file;
                console.log('file', file);
                const fileName = (0, uuid_1.v4)() + '.mp3';
                file.mv(path_1.default.resolve(__dirname, '../..', 'static', fileName));
                const track = yield models_1.Track.create({ title, cover: coverName, albumId, file: fileName });
                if (genreIds && genreIds.length) {
                    for (const genreId of genreIds) {
                        models_1.TrackGenre.create({ trackId: track.id, genreId });
                    }
                }
                if (artistIds && artistIds.length) {
                    for (const artistId of artistIds) {
                        models_1.TrackArtist.create({ trackId: track.id, artistId });
                    }
                }
                return res.json(track);
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
                const tracks = yield models_1.Track.findAndCountAll({ limit, offset });
                return res.json(tracks);
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
                const track = yield models_1.Track.findOne({ where: { title } });
                return res.json(track);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getByLikedId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { likedId } = req.params;
                const tracks = yield models_1.Liked.findAndCountAll({
                    where: { id: likedId },
                    attributes: [],
                    include: [{ model: models_1.Track }],
                });
                return res.json(tracks);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getByPlaylistId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { playlistId } = req.params;
                const tracks = yield models_1.Playlist.findAndCountAll({
                    where: { id: playlistId },
                    attributes: [],
                    include: [{ model: models_1.Track }],
                });
                return res.json(tracks);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getByGenreId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { genreId } = req.params;
                const tracks = yield models_1.Genre.findAndCountAll({
                    where: { id: genreId },
                    attributes: [],
                    include: [{ model: models_1.Track }],
                });
                return res.json(tracks);
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
                const tracks = yield models_1.Track.findAndCountAll({
                    where: { albumId },
                });
                return res.json(tracks);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    getByArtistId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { artistId } = req.params;
                const tracks = yield models_1.Artist.findAndCountAll({
                    where: { id: artistId },
                    attributes: [],
                    include: [{ model: models_1.Track }],
                });
                return res.json(tracks);
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
                const track = yield models_1.Track.findOne({ where: { id } });
                return res.json(track);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    moveToLiked(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trackId, userId } = req.body;
                const liked = yield models_1.Liked.findOne({ where: { userId } });
                const likedId = liked.id;
                const trackLiked = yield models_1.TrackLiked.create({ trackId, likedSongId: likedId });
                return res.json(trackLiked);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    moveToPlaylist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trackId, playlistId } = req.body;
                const trackPlaylist = yield models_1.TrackPlaylist.create({ trackId, playlistId });
                return res.json(trackPlaylist);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    moveToAlbum(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trackId, albumId } = req.body;
                const track = yield models_1.Track.update({ albumId }, { where: { id: trackId } });
                return res.json(track);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    removeFromAlbum(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trackId } = req.body;
                const track = yield models_1.Track.update({ albumId: null }, { where: { id: trackId } });
                return res.json(track);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    removeFromPlaylist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trackId, playlistId } = req.body;
                const trackPlaylist = yield models_1.TrackPlaylist.destroy({ where: { trackId, playlistId } });
                return res.json(trackPlaylist);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    removeFromLiked(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { trackId, userId } = req.body;
                const liked = yield models_1.Liked.findOne({ where: { userId } });
                const likedId = liked.id;
                const trackLiked = yield models_1.TrackLiked.destroy({ where: { trackId, likedSongId: likedId } });
                return res.json(trackLiked);
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
                const track = yield models_1.Track.destroy({ where: { id } });
                return res.json(track);
            }
            catch (err) {
                next(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
}
exports.default = new TrackController();
//# sourceMappingURL=track.controller.js.map