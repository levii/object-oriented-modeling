class Plate {
    public readonly name: string;
    // 1つの Plate は、複数個の Dish を持つ
    private readonly dishes: DishCollection;

    constructor(name: string, dishes: Dish[]) {
        this.name = name;
        this.dishes = new DishCollection(dishes);
    }

    toString(): string {
        const dishes = this.dishes.map((dish) => ` - ${dish.toString()}`);
        return `Plate ${this.name}\n${dishes.join('\n')}`;
    }

    totalAmount(): Price {
        // TODO: Dish の値段を合計したものを返す
        return new Price(0);
    }

    findLowestPriceGreenDish(): Dish | undefined {
        // 緑を含む料理を探す
        const greenDishes = [];
        this.dishItems().forEach((dish) => {
            if (dish.nutrition.green > 0) {
                greenDishes.push(dish);
            }
        });

        // 値段の安い順に並び替えて
        const sortedGreenDishes = greenDishes.sort(
            (a, b) => a.price.value - b.price.value
        );
        // 最初の要素を返す
        return sortedGreenDishes[0];
    }

    dishItems(): Dish[] {
        return this.dishes.all();
    }

    itemCount(): number {
        return this.dishes.count();
    }
}

class Plate2 {
    public readonly name: string;
    public readonly dishes: DishCollection;

    constructor(name: string, dishes: Dish[]) {
        this.name = name;
        this.dishes = new DishCollection(dishes);
    }

    toString(): string {
        const dishes = this.dishes.map((dish) => ` - ${dish.toString()}`);
        return `Plate ${this.name}\n${dishes.join('\n')}`;
    }

    totalAmount(): Price {
        // TODO: Dish の値段を合計したものを返す
        return new Price(0);
    }

    findLowestPriceGreenDish(): Dish | undefined {
        // 緑を含む料理を探す
        const greenDishes = this.dishes.greenDishes().orderByPrice();
        return greenDishes.first();
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

    compareByPrice(other: Dish): number {
        return this.price.compare(other.price);
    }

    static compareByPrice(a: Dish, b: Dish): number {
        return a.compareByPrice(b);
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

    add(other: Nutrition): Nutrition {
        return new Nutrition(
            this.red + other.red,
            this.green + other.green,
            this.yellow + other.yellow
        );
    }

    static ZERO = new Nutrition(0, 0, 0);
}

class Price {
    public readonly value: number;
    constructor(value: number) {
        this.value = value;
    }

    static ZERO = new Price(0);

    toString(): string {
        return `Price(${this.value}円)`;
    }

    compare(other: Price): number {
        return this.value - other.value;
    }

    add(other: Price): Price {
        return new Price(this.value + other.value);
    }
}

export { Plate, Dish, Nutrition, Price };

export class DishCollection {
    private readonly dishes: Dish[];
    constructor(dishes: Dish[]) {
        this.dishes = Array.from(dishes);
    }

    count(): number {
        return this.dishes.length;
    }

    all(): Dish[] {
        return Array.from(this.dishes);
    }

    map<T>(fn: (value: Dish, index: number) => T): T[] {
        return this.dishes.map(fn);
    }

    first(): Dish | undefined {
        return this.dishes[0];
    }

    greenDishes(): DishCollection {
        return new DishCollection(
            this.dishes.filter((dish) => dish.nutrition.green > 0)
        );
    }

    orderByPrice(): DishCollection {
        return new DishCollection(
            Array.from(this.dishes).sort(Dish.compareByPrice)
        );
    }

    totalAmount(): Price {
        return this.dishes.reduce<Price>((price, dish) => {
            return price.add(dish.price);
        }, Price.ZERO);
    }

    totalNutrition(): Nutrition {
        return this.dishes.reduce<Nutrition>((nutrition, dish) => {
            return nutrition.add(dish.nutrition);
        }, Nutrition.ZERO);
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

    static ZERO = new DiscountAmount(0);

    static buildFromPrice(price: Price, rate: number): DiscountAmount {
        // TODO: 端数処理が必要
        return new DiscountAmount(price.value * rate);
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

interface IDiscount {
    amount(): DiscountAmount;
}

interface IDiscountFactory {
    discountAvailable(plate: Plate): boolean;
    build(plate: Plate): IDiscount;
}

class NutritionBalanceDiscount implements IDiscount {
    private readonly targetDish: Dish;
    static DISCOUNT_RATE = 0.2;

    constructor(targetDish: Dish) {
        this.targetDish = targetDish;
    }

    amount(): DiscountAmount {
        return DiscountAmount.buildFromPrice(
            this.targetDish.price,
            NutritionBalanceDiscount.DISCOUNT_RATE
        );
    }
}

class NutritionBalanceDiscountFactory implements IDiscountFactory {
    discountAvailable(plate: Plate): boolean {
        // TODO: 赤と緑の合計が 3点以上のときに割引適用
        return false;
    }

    build(plate: Plate): NutritionBalanceDiscount {
        if (!this.discountAvailable(plate)) {
            throw new Error(
                `Cloud not build NutritionBalanceDiscount: ${plate}`
            );
        }

        // TODO: 割引対象となる料理(緑を含む一番安いもの)を取得する
        const targetDish = plate.dishItems()[0];
        return new NutritionBalanceDiscount(targetDish);
    }
}

class NiceCalorieDiscount implements IDiscount {
    amount(): DiscountAmount {
        return new DiscountAmount(50);
    }
}

class NiceCalorieDiscountFactory implements IDiscountFactory {
    discountAvailable(plate: Plate): boolean {
        // TODO: 三色の合計点数が 6点〜8点の間のときに割引適用
        return false;
    }

    build(plate: Plate): NiceCalorieDiscount {
        if (!this.discountAvailable(plate)) {
            throw new Error(`Cloud not build NiceCalorieDiscount: ${plate}`);
        }

        return new NiceCalorieDiscount();
    }
}

class LowCarbonDiscount implements IDiscount {
    amount(): DiscountAmount {
        return new DiscountAmount(30);
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

class LowCarbonDiscountFactory implements IDiscountFactory {
    discountAvailable(plate: Plate): boolean {
        // TODO: 黄色の合計が5点以下のときに割引適用
        return false;
    }

    build(plate: Plate): LowCarbonDiscount {
        if (!this.discountAvailable(plate)) {
            throw new Error(`Cloud not build LowCarbonDiscount: ${plate}`);
        }

        return new LowCarbonDiscount();
    }
}

class DiscountCollection {
    private readonly discounts: IDiscount[];

    constructor(discounts: IDiscount[]) {
        this.discounts = Array.from(discounts);
    }

    all(): IDiscount[] {
        return Array.from(this.discounts);
    }

    totalAmount(): DiscountAmount {
        return this.discounts.reduce<DiscountAmount>((amount, discount) => {
            return amount.add(discount.amount());
        }, DiscountAmount.ZERO);
    }
}

class DiscountCollectionFactory {
    private readonly factories: IDiscountFactory[] = [
        new NutritionBalanceDiscountFactory(),
        new NiceCalorieDiscountFactory(),
        new LowCarbonDiscountFactory(),
    ];

    build(plate: Plate): DiscountCollection {
        const discounts: IDiscount[] = [];

        this.factories.forEach((factory) => {
            if (factory.discountAvailable(plate)) {
                discounts.push(factory.build(plate));
            }
        });

        return new DiscountCollection(discounts);
    }
}

export {
    DiscountName,
    DiscountAmount,
    Discount,
    // IDiscount,
    // LowCarbonDiscount,
    // NiceCalorieDiscount,
    // NutritionBalanceDiscount,
};
