"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_service_1 = require("./services/logger/logger.service");
const db_config_1 = __importDefault(require("./config/db.config"));
const routes_1 = __importDefault(require("./routes"));
const app = new app_1.App(routes_1.default, new logger_service_1.LoggerService(), db_config_1.default);
app.init();
//# sourceMappingURL=index.js.map