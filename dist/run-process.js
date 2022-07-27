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
exports.RunProcess = exports.RunProcessParameter = exports.Command = exports.ProcessCreationType = void 0;
const webpack_hook_attacher_plugin_1 = require("webpack-hook-attacher-plugin");
const exec = require('child_process').exec;
const execFile = require('child_process').execFile;
const fork = require('child_process').fork;
const spawn = require('child_process').spawn;
const execSync = require('child_process').execSync;
const execFileSync = require('child_process').execFileSync;
const spawnSync = require('child_process').spawnSync;
var ProcessCreationType;
(function (ProcessCreationType) {
    ProcessCreationType["exec"] = "exec";
    ProcessCreationType["execFile"] = "execFile";
    ProcessCreationType["fork"] = "fork";
    ProcessCreationType["spawn"] = "spawn";
    ProcessCreationType["execSync"] = "execSync";
    ProcessCreationType["execFileSync"] = "execFileSync";
    ProcessCreationType["spawnSync"] = "spawnSync";
})(ProcessCreationType = exports.ProcessCreationType || (exports.ProcessCreationType = {}));
class Command {
    constructor() {
        this.processCreationType = ProcessCreationType.exec;
        this.execute = '';
        this.args = null;
        this.options = null;
        this.callback = null;
    }
}
exports.Command = Command;
class RunProcessParameter extends webpack_hook_attacher_plugin_1.OperationParameter {
    constructor() {
        super(...arguments);
        this.commands = [];
    }
}
exports.RunProcessParameter = RunProcessParameter;
class RunProcess extends webpack_hook_attacher_plugin_1.Operation {
    constructor(userParams) {
        super();
        this.name = 'RunProcess';
        this.params = webpack_hook_attacher_plugin_1.Utils.mergeUserSettingsToDeafultSetting(userParams, new RunProcessParameter());
        super.setParams(this.params);
    }
    run() {
        super.runWrapper(this, () => __awaiter(this, void 0, void 0, function* () {
            this.params.commands.forEach((command) => {
                this.runCommand(command);
            });
        }));
    }
    runCommand(command) {
        switch (command.processCreationType) {
            case ProcessCreationType.exec:
                exec(command.execute, command.options, command.callback);
                break;
            case ProcessCreationType.execFile:
                execFile(command.execute, command.args, command.options, command.callback);
                break;
            case ProcessCreationType.fork:
                fork(command.execute, command.args, command.options);
                break;
            case ProcessCreationType.spawn:
                spawn(command.execute, command.args, command.options);
                break;
            case ProcessCreationType.execFileSync:
                execFileSync(command.execute, command.args, command.options);
                break;
            case ProcessCreationType.execSync:
                execSync(command.execute, command.options);
                break;
            case ProcessCreationType.spawnSync:
                spawnSync(command.execute, command.args, command.options);
                break;
        }
    }
    onError(error) {
        if (error) {
            throw error;
        }
    }
}
exports.RunProcess = RunProcess;
