/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { Operation, OperationParameter, IOperationParameter } from '@wecdev/webpack-hook-attacher-plugin';
export interface ISleepParameter extends IOperationParameter {
    miliseconds: number;
}
export declare class SleepParameter extends OperationParameter implements ISleepParameter {
    miliseconds: number;
}
export declare class Sleep extends Operation {
    constructor(userParams: ISleepParameter);
    name: string;
    params: SleepParameter;
    run(): void;
}
