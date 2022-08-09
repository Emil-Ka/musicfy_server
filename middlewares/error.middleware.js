"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
require("express");
const ApiError_1 = require("../error/ApiError");
function errorMiddleware(err, req, res, next) {
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map