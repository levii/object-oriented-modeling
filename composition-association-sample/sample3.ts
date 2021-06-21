class Dish {
    private readonly price: Price;
    public constructor(price: Price) {
        this.price = price;
    }

    public getPrice(): Price {
        return this.price;
    }
}

class Price {
    private readonly value: number;

    public constructor(value: number) {
        this.value = value;
    }

    public getValue(): number {
        return this.value;
    }
}
