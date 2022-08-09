"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
exports.Track = db_config_1.default.define('track', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    cover: { type: sequelize_1.DataTypes.STRING },
    file: { type: sequelize_1.DataTypes.STRING, allowNull: false },
});
//# sourceMappingURL=track.model.js.map