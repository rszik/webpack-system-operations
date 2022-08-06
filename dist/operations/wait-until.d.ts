import { Operation, OperationParameter, IOperationParameter } from '@wecdev/webpack-hook-attacher-plugin';
export interface IWaitUntilParameter extends IOperationParameter {
    repeatCheckMiliseconds?: number;
    tryCount?: number;
    throwErrorIfTryCountReached?: boolean;
    condition: Function;
}
export declare class WaitUntilParameter extends OperationParameter implements IWaitUntilParameter {
    repeatCheckMiliseconds?: number;
    tryCount?: number;
    throwErrorIfTryCountReached?: boolean;
    condition: Function;
}
export declare class WaitUntil extends Operation {
    constructor(userParams: IWaitUntilParameter);
    name: string;
    params: WaitUntilParameter;
    run(): void;
}
