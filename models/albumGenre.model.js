"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumGenre = void 0;
require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
exports.AlbumGenre = db_config_1.default.define('album_genre', {});
//# sourceMappingURL=albumGenre.model.js.map