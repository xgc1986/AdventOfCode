import {Context, init} from "z3-solver";

type Z3Info = {
    em: {
        PThread: {
            terminateAllThreads(): void;
        }
    },
    Z3: Context
};

export default abstract class Puzzle<T> {

    public SINGLE_INPUT_PARSE = true;

    private z3Info: Z3Info|undefined = undefined;

    constructor(public readonly mode: string) {
    }

    public async onStart(): Promise<void> {}

    public async onEnd(): Promise<void> {}

    public test(): void {
        console.log('test');
    }

    protected async loadZ3(): Promise<Z3Info> {
        if (this.z3Info === undefined) {
            const {Context, em, setParam} = await init();
            setParam('pp.decimal', true);
            setParam('pp.decimal_precision', 3);
            this.z3Info = {em, Z3: Context('main')};
        }
        return this.z3Info;
    }

    public abstract parseInput(input: string): T;
    public abstract run1(input: T): Promise<string|number|undefined>;
    public abstract run2(input: T): Promise<string|number|undefined>;
}