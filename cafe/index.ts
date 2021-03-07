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

    totalAmount(): Price {
        // TODO: Dish の値段を合計したものを返す
        return new Price(0);
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

class DishCollection {
    private readonly dishes: Dish[];
    constructor(dishes: Dish[]) {
        this.dishes = dishes;
    }

    greenDishes(): DishCollection {
        return new DishCollection(
            this.dishes.filter((dish) => dish.nutrition.green > 0)
        );
    }

    orderByPrice(): DishCollection {
        return new DishCollection(
            Array.from(this.dishes).sort(
                (a, b) => a.price.value - b.price.value
            )
        );
    }
}

class DiscountAmount {
    readonly value: number;
    constructor(value: number) {
        this.value = value;
    }

    add(other: DiscountAmount): DiscountAmount {
        return new DiscountAmount(this.value + other.value);
    }
}

/**
 * 割引を実装する
 *
 *  - 1つの割引クラスで実装する
 *  - 割引の種類に応じて実装する
 */

enum DiscountName {
    NutritionGoodBalance = 'NutritionGoodBalance',
    NiceCalorie = 'NiceCalorie',
    LowCarbon = 'LowCarbon',
}

// 1つの割引クラスで実装する

class Discount {
    private readonly name: DiscountName;
    private readonly plate: Plate;
    constructor(name: DiscountName, plate: Plate) {
        this.name = name;
        this.plate = plate;
    }

    calcDiscount(): DiscountAmount {
        switch (this.name) {
            case DiscountName.NutritionGoodBalance:
                return this.calcNutritionGoodBalanceDiscount();
            case DiscountName.LowCarbon:
                return this.calcLowCarbonDiscount();
            case DiscountName.NiceCalorie:
                return this.calcNiceCalorieDiscount();
        }
    }

    private calcNutritionGoodBalanceDiscount(): DiscountAmount {
        // バランス配慮セット割引の条件に適合したときに、その割引金額を返す
        // 適合しないときには、 0円割引として値を返す
        return new DiscountAmount(0);
    }

    private calcLowCarbonDiscount(): DiscountAmount {
        // 糖質配慮セット割引の条件に適合したときに、その割引金額を返す
        // 適合しないときには、 0円割引として値を返す
        return new DiscountAmount(0);
    }

    private calcNiceCalorieDiscount(): DiscountAmount {
        // ナイスカロリーセット割引の条件に適合したときに、その割引金額を返す
        // 適合しないときには、 0円割引として値を返す
        return new DiscountAmount(0);
    }
}

// 割引の種類に応じてクラスを分ける

interface IDiscount {
    available(): boolean;
    calcDiscount(): DiscountAmount;
}

class NutritionBalanceDiscount implements IDiscount {
    private readonly plate: Plate;
    public constructor(plate: Plate) {
        this.plate = plate;
    }
    // 条件: 赤の合計が 3点以上のとき
    public available(): boolean {
        return false; // ここは一旦モックで実装
    }
    // 割引: 緑を含む料理が 20% 割引（一番安いもの1点）
    public calcDiscount(): DiscountAmount {
        if (this.available()) {
            // 緑を含む料理を探す
            const greenDishes = [] as Dish[];
            this.plate.dishes.forEach((dish) => {
                if (dish.nutrition.green > 0) {
                    greenDishes.push(dish);
                }
            });
            // その中で一番安い料理を探す
            let lowestPriceDish: Dish | null = null;
            greenDishes.forEach((dish) => {
                if (!lowestPriceDish) {
                    lowestPriceDish = dish;
                }

                if (lowestPriceDish.price.value > dish.price.value) {
                    lowestPriceDish = dish;
                }
            });
            // その料理の 20% が割引金額
            return new DiscountAmount(lowestPriceDish.price.value * 0.2);
        }
        // 適用条件を満たさないときは 0円割引として返す
        return new DiscountAmount(0);
    }
}

class NiceCalorieDiscount implements IDiscount {
    private readonly plate: Plate;
    public constructor(plate: Plate) {
        this.plate = plate;
    }
    // 条件: 三色の合計点数が 6点〜8点 の間
    public available(): boolean {
        return false; // ここは一旦モックで実装
    }
    // 割引: 50円引
    public calcDiscount(): DiscountAmount {
        if (this.available()) {
            return new DiscountAmount(50);
        }
        return new DiscountAmount(0);
    }
}

class LowCarbonDiscount implements IDiscount {
    private readonly plate: Plate;
    public constructor(plate: Plate) {
        this.plate = plate;
    }
    // 条件: 黄の合計が 5点以下
    public available(): boolean {
        return false; // ここは一旦モックで実装
    }
    // 割引: 30円引
    public calcDiscount(): DiscountAmount {
        if (this.available()) {
            return new DiscountAmount(30);
        }
        return new DiscountAmount(0);
    }
}

export {
    DiscountName,
    DiscountAmount,
    Discount,
    IDiscount,
    LowCarbonDiscount,
    NiceCalorieDiscount,
    NutritionBalanceDiscount,
};
