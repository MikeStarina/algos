interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => number;
    getSize: () => number;
   
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item)
    };

    pop = (): void => {
        this.container.pop()
    };

    clear = () => {
        this.container = [];
    }

    peak = (): number => {
        return this.getSize() - 1;
    };

    getSize = (): number => {
        return this.container.length;
    }


}