/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */
import { Operation, OperationParameter, IOperationParameter } from '@wecdev/webpack-hook-attacher-plugin';
export interface IMustBeTrueParameter extends IOperationParameter {
    condition: Function;
}
export declare class MustBeTrueParameter extends OperationParameter implements IMustBeTrueParameter {
    condition: Function;
}
export declare class MustBeTrue extends Operation {
    constructor(userParams: IMustBeTrueParameter);
    name: string;
    params: MustBeTrueParameter;
    run(): void;
}
