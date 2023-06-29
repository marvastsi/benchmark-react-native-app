import { Config } from "../../models/Config";

export type Scenario = string;

interface IExecution {
    hasNext(): boolean;

    next(): Scenario;

    isRunning(): boolean;

    start(): void;

    stop(): void;
}

const scenarios: Map<number, Scenario> = new Map([
    [1, "Login"],
    [2, "Account"],
    [3, "Download"],
    [4, "Upload"],
    [5, "Media"],
]);

const _createRandomList = (lentgth: number): Array<Scenario> => {
    const first = 1;
    const last = 5;
    let list = new Array<string>();
    for (let i = 0; i < lentgth; i++) {
        const key = _rand(first, last);
        list.push(scenarios.get(key));
    }
    return list;
};

const _rand = (first: number, last: number): number => {
    const min = Math.ceil(first);
    const max = Math.floor(last);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export class TestExecution implements IExecution {
    private config: Config;
    private _executions: Array<Scenario>;
    private _index: number = 0;
    private _running: boolean = false;

    private static _instance?: IExecution;

    private constructor(config: Config, executions: Array<Scenario>) {
        this.config = config;
    }

    getIstance(config: Config): IExecution {
        if (!TestExecution._instance) {
            TestExecution._instance = new TestExecution(config, this.generateExecutions(
                config
            )
            );
        }
        return TestExecution._instance;
    }

    hasNext(): boolean {
        return this._index < this.config.testLoad;
    }
    next(): Scenario {
        return this._executions[this._index++];
    }
    isRunning(): boolean {
        return this._running;
    }
    start(): void {
        this._running = true;
    }
    stop(): void {
        this._running = false;
        TestExecution._instance = null;
    }

    private generateExecutions(config: Config): Array<Scenario> {
        if (config.specificScenario > 0) {
            let list = new Array<Scenario>();
            const scenario = scenarios.get(config.specificScenario);
            if (scenario) {
                for (let i = 0; i < config.testLoad; i++) {
                    list.push(scenario);
                }
            }
            return list;
        } else {
            return _createRandomList(config.testLoad);
        }
    }
}