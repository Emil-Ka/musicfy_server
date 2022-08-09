"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artist = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
exports.Artist = db_config_1.default.define('artist', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nickname: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    firstName: { type: sequelize_1.DataTypes.STRING },
    lastName: { type: sequelize_1.DataTypes.STRING },
    avatar: { type: sequelize_1.DataTypes.STRING },
    description: { type: sequelize_1.DataTypes.STRING },
});
//# sourceMappingURL=artist.model.js.map