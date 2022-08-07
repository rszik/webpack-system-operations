/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { Operation, OperationParameter, IOperationParameter } from '@wecdev/webpack-hook-attacher-plugin';
export declare enum ProcessCreationType {
    exec = "exec",
    execFile = "execFile",
    fork = "fork",
    spawn = "spawn",
    execSync = "execSync",
    execFileSync = "execFileSync",
    spawnSync = "spawnSync"
}
export declare class Command {
    processCreationType: ProcessCreationType;
    execute: string;
    args?: string[];
    options?: any;
    callback?: any;
}
export interface IRunProcessParameter extends IOperationParameter {
    commands?: Command[];
}
export declare class RunProcessParameter extends OperationParameter implements IRunProcessParameter {
    commands?: Command[];
}
export declare class RunProcess extends Operation {
    constructor(userParams: IRunProcessParameter);
    name: string;
    params: RunProcessParameter;
    run(): void;
    runCommand(command: Command): void;
    onError(error: string): void;
}
