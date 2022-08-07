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
exports.MustBeTrue = exports.MustBeTrueParameter = void 0;
const webpack_hook_attacher_plugin_1 = require("@wecdev/webpack-hook-attacher-plugin");
class MustBeTrueParameter extends webpack_hook_attacher_plugin_1.OperationParameter {
    constructor() {
        super(...arguments);
        this.condition = null;
    }
}
exports.MustBeTrueParameter = MustBeTrueParameter;
class MustBeTrue extends webpack_hook_attacher_plugin_1.Operation {
    constructor(userParams) {
        super();
        this.name = 'MustBeTrue';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new MustBeTrueParameter());
        super.setParams(this.params);
    }
    run() {
        super.runWrapper(this, () => __awaiter(this, void 0, void 0, function* () {
            let conditionResult = this.params.condition();
            if (!conditionResult) {
                let errorMessage = `${this.name} - Condition result is false`;
                webpack_hook_attacher_plugin_1.ConsoleLogger.consoleError(errorMessage);
                throw new Error(errorMessage);
            }
        }));
    }
}
exports.MustBeTrue = MustBeTrue;
