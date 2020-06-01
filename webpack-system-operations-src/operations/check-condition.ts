import { Utils, Operation, OperationParameter, IOperationParameter } from 'webpack-hook-attacher-plugin';

export interface ICheckConditionParameter extends IOperationParameter {
    condition: Function;
}

export class CheckConditionParameter extends OperationParameter implements ICheckConditionParameter {
    public condition: Function = null;
}

export class CheckCondition extends Operation {

    constructor(userParams: ICheckConditionParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new CheckConditionParameter());
        super.setParams(this.params);
    }

    public name: string = 'CheckCondition';

    public params: CheckConditionParameter;

    public run(): void {
        super.runWrapper(this, async () => {
            let conditionResult: boolean = this.params.condition();
            if (!conditionResult) {
                throw Error(`${this.name} - Condition result is false`);
            }
        });
    }
}

