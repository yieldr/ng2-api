"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ApiConfig = /** @class */ (function () {
    function ApiConfig(config) {
        this.baseUrl = config.baseUrl || '';
        this.contentType = config.contentType || 'application/json';
        this.tokenName = config.tokenName || 'token';
        this.authHeaderName = config.authHeaderName || 'Authorization';
        this.authHeaderPrefix = config.authHeaderPrefix || 'Bearer';
        var headers = new http_1.Headers();
        headers.set('Content-Type', this.contentType);
        headers.set(this.authHeaderName, this.authHeaderPrefix + " " + this.token);
        this.requestOptions = new http_1.RequestOptions({ headers: headers });
    }
    Object.defineProperty(ApiConfig.prototype, "token", {
        get: function () {
            return localStorage.getItem(this.tokenName);
        },
        set: function (token) {
            this.requestOptions.headers.set(this.authHeaderName, this.authHeaderPrefix + " " + token);
            localStorage.setItem(this.tokenName, token);
        },
        enumerable: true,
        configurable: true
    });
    ApiConfig = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [Object])
    ], ApiConfig);
    return ApiConfig;
}());
exports.ApiConfig = ApiConfig;
//# sourceMappingURL=api-config.js.map