"use strict";
exports.__esModule = true;
var express_1 = require("express");
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.router = express_1.Router();
        this.routes();
        this.newData = {
            firstName: '',
            lastName: '',
            clientId: ''
        };
    }
    ApiRoutes.prototype.routes = function () {
        this.router.post('/v1/parse', this.v1Parse);
        this.router.post('/v2/parse', this.v2Parse);
    };
    ApiRoutes.prototype.v1Parse = function (req, res) {
        var data = req.body.data;
        var keys = Object.keys(this.newData);
        var value = '';
        console.log(keys);
        // for(let i = 0, k = 0; i < data.length; i++) {
        //     if(data[i] === '0' && data[i+1] !== 0) {
        //         value += data[i];
        //         // push to the object
        //         const key: String = keys[k]
        //         this.newData['firstName'] = value
        //     }
        //     value += data[i];
        // }
    };
    ApiRoutes.prototype.v2Parse = function (req, res) {
    };
    return ApiRoutes;
}());
var apiRoutes = new ApiRoutes();
exports["default"] = apiRoutes.router;
