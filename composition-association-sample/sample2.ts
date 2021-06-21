class Dish {
    private readonly price: Price;
    public constructor(priceValue: number) {
        this.price = new Price(priceValue);
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
