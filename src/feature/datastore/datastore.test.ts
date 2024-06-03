import datastoreGenerator from "./datastore";

describe("datastoreGenerator tests", () => {
    it("should store a name on object creation", () => {
        const store = datastoreGenerator("A");
        expect(store.getName()).toBe("A");
    });

    it("should store a value and return true when compared with the same primitive", () => {
        const store = datastoreGenerator("A");
        store.store("B")
        expect(store.isEqual("B")).toBe(true);
    });

    it("should store a value and return false when compared with a different primitive", () => {
        const store = datastoreGenerator("A");
        store.store("B")
        expect(store.isEqual("C")).toBe(false);
    });

    it("should store a value and return true when compared with the same object", () => {
        const store = datastoreGenerator("A");
        const object = { a: "A" };
        store.store(object)
        expect(store.isEqual(object)).toBe(true);
    });

    it("should store a value and return false when compared with a different object", () => {
        const store = datastoreGenerator("A");
        const object = { a: "A" };
        const object2 = { b: "A" };
        store.store(object)
        expect(store.isEqual(object2)).toBe(false);
    });

    it("should store a value and return true when compared with the same complex object", () => {
        const store = datastoreGenerator("A");
        const object = {
            a: "A",
            b: {
                a: "1",
                b: [1, 2, 3]
            }
        };
        store.store(object)
        expect(store.isEqual(object)).toBe(true);
    });

    it("should store a value and return false when compared with a different object", () => {
        const store = datastoreGenerator("A");
        const object = {
            a: "A",
            b: {
                a: "1",
                b: [1, 2, 3]
            }
        };
        const object2 = {
            a: "A",
            b: {
                a: "1",
                b: [1, 2, 1]
            }
        };
        store.store(object)
        expect(store.isEqual(object2)).toBe(false);
    });

    it("should return true if stored value is null and compared", () => {
        const store = datastoreGenerator("A");
        const obj = 7
        expect(store.isEqual(obj)).toBe(true);
    });

    it("should return true if stored value is compared against null", () => {
        const store = datastoreGenerator("A");
        const obj = 7
        store.store(obj);
        expect(store.isEqual(null)).toBe(true);
    });
});

describe("datastoreGenerator concurrent tests", () => {
    it("should allow independent stores", () => {
        const storeA = datastoreGenerator("A");
        const storeB = datastoreGenerator("B");
        expect(storeA.getName()).toBe("A");
        expect(storeB.getName()).toBe("B");
    });

    it("should allow independent values", () => {
        const storeA = datastoreGenerator("A");
        const storeB = datastoreGenerator("B");
        storeA.store("A");
        storeB.store("B");
        expect(storeA.isEqual("A")).toBe(true);
        expect(storeB.isEqual("B")).toBe(true);
        expect(storeA.isEqual("B")).toBe(false);
        expect(storeB.isEqual("A")).toBe(false);
    });
});