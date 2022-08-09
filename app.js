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
exports.App = void 0;
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
require("sequelize");
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
require("./services/logger/logger.interface");
const error_middleware_1 = require("./middlewares/error.middleware");
require("./models");
(0, dotenv_1.config)();
class App {
    constructor(router, logger, sequelize) {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 8000;
        this.router = router;
        this.logger = logger;
        this.sequelize = sequelize;
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.authenticate();
                yield this.sequelize.sync();
                this.logger.log('Успешное соединение с БД');
            }
            catch (err) {
                this.logger.error(err);
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(express_1.default.json());
            this.app.use((0, cors_1.default)());
            this.app.use(express_1.default.static(path_1.default.resolve(__dirname, 'static')));
            this.app.use((0, express_fileupload_1.default)({}));
            this.app.use('/api', this.router);
            this.app.use(error_middleware_1.errorMiddleware);
            yield this.connectDB();
            this.app.listen(this.port);
            this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map