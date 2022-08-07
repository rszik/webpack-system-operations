/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import { Utils, Operation, OperationParameter, IOperationParameter } from '@wecdev/webpack-hook-attacher-plugin';

const exec: any = require('child_process').exec;
const execFile: any = require('child_process').execFile;
const fork: any = require('child_process').fork;
const spawn: any = require('child_process').spawn;
const execSync: any = require('child_process').execSync;
const execFileSync: any = require('child_process').execFileSync;
const spawnSync: any = require('child_process').spawnSync;

export enum ProcessCreationType {
    exec = 'exec',
    execFile = 'execFile',
    fork = 'fork',
    spawn = 'spawn',
    execSync = 'execSync',
    execFileSync = 'execFileSync',
    spawnSync = 'spawnSync',
}

export class Command {
    public processCreationType: ProcessCreationType = ProcessCreationType.exec;
    public execute: string = '';
    public args?: string[] = null;
    public options?: any = null;
    public callback?: any = null;
}

export interface IRunProcessParameter extends IOperationParameter {
    commands?: Command[];
}

export class RunProcessParameter extends OperationParameter implements IRunProcessParameter {
    public commands?: Command[] = [];

}

/**
 * see options and usage:
 * https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
 */
export class RunProcess extends Operation {

    constructor(userParams: IRunProcessParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new RunProcessParameter());
        super.setParams(this.params);
    }

    public name: string = 'RunProcess';

    public params: RunProcessParameter;

    public run(): void {
        super.runWrapper(this, async (): Promise<void> => {
            this.params.commands.forEach((command: Command): void => {
                this.runCommand(command);
            });
        });
    }

    runCommand(command: Command): void {
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

    onError(error: string): void {
        if (error) {
            throw error;
        }
    }
}

