"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/http");
var api_helpers_1 = require("./api-helpers");
var ApiService = /** @class */ (function () {
    function ApiService(http, path, config) {
        if (config === void 0) { config = {}; }
        this.http = http;
        this.path = path;
        this.config = config;
    }
    ApiService.prototype.serialize = function (model) {
        var _a;
        if (this.config.objectRoot) {
            return JSON.stringify((_a = {}, _a[this.config.objectRoot] = model, _a));
        }
        else {
            return JSON.stringify(model);
        }
    };
    ApiService.prototype.deserialize = function (data) {
        return (this.config.objectRoot ? data[this.config.objectRoot] || data : data);
    };
    ApiService.prototype.extractArray = function (data) {
        return (this.config.arrayRoot ? data[this.config.arrayRoot] : data);
    };
    ApiService.prototype.find = function (id) {
        var _this = this;
        var requestOptions = new http_1.RequestOptions({ body: '' });
        return this.http.get(api_helpers_1.ApiHelpers.interpolate(this.path + "/:id", { id: id }), requestOptions).pipe(operators_1.map(function (res) { return _this.deserialize(res.json()); }));
    };
    ApiService.prototype.findAll = function (search) {
        var _this = this;
        var interpolatedPath = api_helpers_1.ApiHelpers.interpolate(this.path, search, true);
        var requestOptions = new http_1.RequestOptions({
            body: '',
            search: api_helpers_1.ApiHelpers.toSearch(search)
        });
        return this.http.get(interpolatedPath, requestOptions).pipe(operators_1.map(function (res) {
            return _this.extractArray(res.json()).map(function (item) {
                return _this.deserialize(item);
            });
        }));
    };
    ApiService.prototype.create = function (model) {
        var _this = this;
        return this.http.post(this.path, this.serialize(model)).pipe(operators_1.map(function (res) { return _this.deserialize(res.json()); }));
    };
    ApiService.prototype.update = function (model) {
        var _this = this;
        return this.http.put(api_helpers_1.ApiHelpers.interpolate(this.path + "/:id", model), this.serialize(model)).pipe(operators_1.map(function (res) { return _this.deserialize(res.json()); }));
    };
    ApiService.prototype.delete = function (model) {
        var requestOptions = new http_1.RequestOptions({ body: '' });
        return this.http.delete(api_helpers_1.ApiHelpers.interpolate(this.path + "/:id", model), requestOptions).pipe(operators_1.map(function (res) { return res.ok; }));
    };
    return ApiService;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=api-service.js.map