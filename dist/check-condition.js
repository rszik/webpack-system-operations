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
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_hook_attacher_plugin_1 = require("webpack-hook-attacher-plugin");
class CheckConditionParameter extends webpack_hook_attacher_plugin_1.OperationParameter {
    constructor() {
        super(...arguments);
        this.condition = null;
    }
}
exports.CheckConditionParameter = CheckConditionParameter;
class CheckCondition extends webpack_hook_attacher_plugin_1.Operation {
    constructor(userParams) {
        super();
        this.name = 'CheckCondition';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new CheckConditionParameter());
        super.setParams(this.params);
    }
    run() {
        super.runWrapper(this, () => __awaiter(this, void 0, void 0, function* () {
            let conditionResult = this.params.condition();
            if (!conditionResult) {
                throw Error(`${this.name} - Condition result is false`);
            }
        }));
    }
}
exports.CheckCondition = CheckCondition;
