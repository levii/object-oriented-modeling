class Plate {
    // 1つの Plate は、複数個の Dish を持つ
    public readonly dishes: Dish[];

    constructor(dishes: Dish[]) {
        this.dishes = dishes;
    }
}

class Dish {
    public readonly price: Price;
    public readonly nutrition: Nutrition;

    constructor(price: Price, nutrition: Nutrition) {
        this.price = price;
        this.nutrition = nutrition;
    }

    toString(): string {
        return `Dish(${this.nutrition}, ${this.price})`;
    }
}

class Nutrition {
    public readonly red: number;
    public readonly green: number;
    public readonly yellow: number;

    constructor(red: number, green: number, yellow: number) {
        this.red = red;
        this.green = green;
        this.yellow = yellow;
    }

    toString(): string {
        return `Nutrition(赤:${this.red}, 緑:${this.green}, 黄:${this.yellow})`;
    }
}

class Price {
    public readonly value: number;
    constructor(value: number) {
        this.value = value;
    }

    toString(): string {
        return `Price(${this.value}円)`;
    }
}

export { Plate, Dish, Nutrition, Price };
