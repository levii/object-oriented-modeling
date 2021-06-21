class Dish {
    private price: Price;
    public constructor(priceValue: number) {
        this.price = new Price();
        this.price.setValue(priceValue);
    }

    public getPrice(): Price {
        return this.price;
    }
}

class Price {
    private  value: number;

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number): void{
        this.value = value;
    }
}
