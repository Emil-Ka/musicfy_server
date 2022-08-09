"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const track_route_1 = __importDefault(require("./track.route"));
const artist_route_1 = __importDefault(require("./artist.route"));
const playlist_route_1 = __importDefault(require("./playlist.route"));
const album_route_1 = __importDefault(require("./album.route"));
const genre_route_1 = __importDefault(require("./genre.route"));
const router = (0, express_1.Router)();
router.use('/user', user_route_1.default);
router.use('/track', track_route_1.default);
router.use('/artist', artist_route_1.default);
router.use('/playlist', playlist_route_1.default);
router.use('/album', album_route_1.default);
router.use('/genre', genre_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map