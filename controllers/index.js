"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreController = exports.albumController = exports.playlistController = exports.artistController = exports.trackController = exports.userController = void 0;
const user_controller_1 = __importDefault(require("./user/user.controller"));
exports.userController = user_controller_1.default;
const track_controller_1 = __importDefault(require("./track/track.controller"));
exports.trackController = track_controller_1.default;
const artist_controller_1 = __importDefault(require("./artist/artist.controller"));
exports.artistController = artist_controller_1.default;
const playlist_controller_1 = __importDefault(require("./playlist/playlist.controller"));
exports.playlistController = playlist_controller_1.default;
const album_controller_1 = __importDefault(require("./album/album.controller"));
exports.albumController = album_controller_1.default;
const genre_controller_1 = __importDefault(require("./genre/genre.controller"));
exports.genreController = genre_controller_1.default;
//# sourceMappingURL=index.js.map