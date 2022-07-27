import { Utils, Operation, OperationParameter, IOperationParameter, ConsoleLogger } from 'webpack-hook-attacher-plugin';

export interface IMustBeTrueParameter extends IOperationParameter {
    condition: Function;
}

export class MustBeTrueParameter extends OperationParameter implements IMustBeTrueParameter {
    public condition: Function = null;
}

export class MustBeTrue extends Operation {

    constructor(userParams: IMustBeTrueParameter) {
        super();
        this.params = Utils.mergeUserSettingsToDeafultSetting(userParams, new MustBeTrueParameter());
        super.setParams(this.params);
    }

    public name: string = 'MustBeTrue';

    public params: MustBeTrueParameter;

    public run(): void {
        super.runWrapper(this, async (): Promise<void> => {
            let conditionResult: boolean = this.params.condition();
            if (!conditionResult) {
                let errorMessage: string = `${this.name} - Condition result is false`;
                ConsoleLogger.consoleError(errorMessage);
                throw new Error(errorMessage);
            }
        });
    }
}

