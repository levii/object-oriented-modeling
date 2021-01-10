class Plate {
    public readonly name: string;
    // 1つの Plate は、複数個の Dish を持つ
    public readonly dishes: Dish[];

    constructor(name: string, dishes: Dish[]) {
        this.name = name;
        this.dishes = dishes;
    }

    toString(): string {
        const dishes = this.dishes.map((dish) => ` - ${dish.toString()}`);
        return `Plate ${this.name}\n${dishes.join('\n')}`;
    }
}

class Dish {
    public readonly name: string;
    public readonly price: Price;
    public readonly nutrition: Nutrition;

    constructor(name: string, price: Price, nutrition: Nutrition) {
        this.name = name;
        this.price = price;
        this.nutrition = nutrition;
    }

    toString(): string {
        return `Dish(${this.name}, ${this.nutrition}, ${this.price})`;
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
