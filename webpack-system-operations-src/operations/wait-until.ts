/*!
 * Copyright (c) 2022, Roland Szikora.
 * You can support this package at https://www.patreon.com/rolandszik
 */

import { Utils, Operation, OperationParameter, IOperationParameter } from '@wecdev/webpack-hook-attacher-plugin';


export interface IWaitUntilParameter extends IOperationParameter {
    repeatCheckMiliseconds?: number;
    tryCount?: number;
    throwErrorIfTryCountReached?: boolean;
    condition: Function;
}

export class WaitUntilParameter extends OperationParameter implements IWaitUntilParameter {
    public repeatCheckMiliseconds?: number = 1000;
    public tryCount?: number = 10;
    throwErrorIfTryCountReached?: boolean = true;
    public condition: Function = null;
}

export class WaitUntil extends Operation {

    constructor(userParams: IWaitUntilParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new WaitUntilParameter());
        super.setParams(this.params);
    }

    public name: string = 'WaitUntil';

    public params: WaitUntilParameter;

    public run(): void {
        super.runWrapper(this, async (): Promise<void> => {
            let actualTryCount: number = 0;
            let conditionResult: boolean = this.params.condition();
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
        });
    }
}

