import { Utils, Operation, OperationParameter, IOperationParameter } from 'webpack-hook-attacher-plugin';


export interface ISleepParameter extends IOperationParameter {
    miliseconds: number;
}

export class SleepParameter extends OperationParameter implements ISleepParameter {
    public miliseconds: number = 1000;
}

export class Sleep extends Operation {

    constructor(userParams: ISleepParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new SleepParameter());
        super.setParams(this.params);
    }

    public name: string = 'Sleep';

    public params: SleepParameter;

    public run(): void {
        super.runWrapper(this, async (): Promise<void> => {
            Utils.Sleep(this.params.miliseconds);
        });
    }

}

