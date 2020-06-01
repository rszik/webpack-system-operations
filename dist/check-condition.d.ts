import { Operation, OperationParameter, IOperationParameter } from 'webpack-hook-attacher-plugin';
export interface ICheckConditionParameter extends IOperationParameter {
    condition: Function;
}
export declare class CheckConditionParameter extends OperationParameter implements ICheckConditionParameter {
    condition: Function;
}
export declare class CheckCondition extends Operation {
    constructor(userParams: ICheckConditionParameter);
    name: string;
    params: CheckConditionParameter;
    run(): void;
}
