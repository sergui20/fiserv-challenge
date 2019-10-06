"use strict";
exports.__esModule = true;
var express_1 = require("express");
var morgan_1 = require("morgan");
var apiRoutes_1 = require("./routes/apiRoutes");
var App = /** @class */ (function () {
    function App() {
        this.app = express_1["default"]();
        this.config();
        this.routes();
    }
    App.prototype.config = function () {
        this.app.set('port', 3000);
        // Middlewares
        this.app.use(morgan_1["default"]('dev'));
        this.app.use(express_1["default"].urlencoded({ extended: false }));
        this.app.use(express_1["default"].json());
    };
    App.prototype.routes = function () {
        this.app.use('/api', apiRoutes_1["default"]);
    };
    App.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log("Server listening en on port " + _this.app.get('port'));
        });
    };
    return App;
}());
var app = new App;
app.start();
