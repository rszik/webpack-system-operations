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
exports.WaitUntil = exports.WaitUntilParameter = void 0;
const webpack_hook_attacher_plugin_1 = require("webpack-hook-attacher-plugin");
class WaitUntilParameter extends webpack_hook_attacher_plugin_1.OperationParameter {
    constructor() {
        super(...arguments);
        this.repeatCheckMiliseconds = 1000;
        this.tryCount = 10;
        this.throwErrorIfTryCountReached = true;
        this.condition = null;
    }
}
exports.WaitUntilParameter = WaitUntilParameter;
class WaitUntil extends webpack_hook_attacher_plugin_1.Operation {
    constructor(userParams) {
        super();
        this.name = 'WaitUntil';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new WaitUntilParameter());
        super.setParams(this.params);
    }
    run() {
        super.runWrapper(this, () => __awaiter(this, void 0, void 0, function* () {
            let actualTryCount = 0;
            let conditionResult = this.params.condition();
            while (!conditionResult) {
                Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, this.params.repeatCheckMiliseconds);
                conditionResult = this.params.condition();
                actualTryCount++;
                if (actualTryCount === this.params.tryCount) {
                    if (this.params.throwErrorIfTryCountReached) {
                        throw Error(`${this.name} - Maximum try count reached`);
                    }
                    break;
                }
            }
        }));
    }
}
exports.WaitUntil = WaitUntil;
