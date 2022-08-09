"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
exports.Genre = db_config_1.default.define('genre', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING },
    color: { type: sequelize_1.DataTypes.STRING },
});
//# sourceMappingURL=genre.model.js.map