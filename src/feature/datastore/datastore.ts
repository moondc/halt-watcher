// Takes a name, you store a value and then compare a new value to see if they're equal
const datastoreGenerator = (ticker: string): Store => function () {
    let storedVal: any = null;
    let name: string = ticker;

    function store(val: any): void {
        storedVal = val;
    }

    function isEqual(newObj: any): boolean {
        if (!storedVal) return false
        return JSON.stringify(newObj) === JSON.stringify(storedVal);
    }

    function getName(): string {
        return name
    }

    return {
        store,
        isEqual,
        getName
    };
}();

export interface Store {
    store: (a: any) => void;
    isEqual: (a: any) => boolean;
    getName: () => string;
}


export default datastoreGenerator;