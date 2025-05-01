"use strict";
/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sleep = exports.SleepParameter = void 0;
const webpack_hook_attacher_1 = require("@wecdev/webpack-hook-attacher");
class SleepParameter extends webpack_hook_attacher_1.OperationParameter {
    constructor() {
        super(...arguments);
        this.miliseconds = 1000;
    }
}
exports.SleepParameter = SleepParameter;
class Sleep extends webpack_hook_attacher_1.Operation {
    constructor(userParams) {
        super();
        this.name = 'Sleep';
        this.params = webpack_hook_attacher_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new SleepParameter());
        super.setParams(this.params);
    }
    run() {
        super.runWrapper(this, () => __awaiter(this, void 0, void 0, function* () {
            webpack_hook_attacher_1.Utils.Sleep(this.params.miliseconds);
        }));
    }
}
exports.Sleep = Sleep;
