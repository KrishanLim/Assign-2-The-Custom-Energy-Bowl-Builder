// EnergyBowl class - one customer's bowl, built from the form data

// prices in dollars
const SIZE_PRICES = { Small: 8, Medium: 10, Large: 12 };
const FRUIT_PRICE = 0.75;
const TOPPING_PRICE = 0.5;
const PROTEIN_PRICE = 2;

class EnergyBowl {
    constructor(data) {
        this.size = data.size;
        this.base = data.base;
        this.fruits = data.fruits;
        this.toppings = data.toppings;
        this.protein = data.protein;
        this.sweetener = data.sweetener;
        this.instructions = data.instructions;
    }

    // size sets the starting price, then each extra adds on
    calculatePrice() {
        let price = SIZE_PRICES[this.size];
        price += this.fruits.length * FRUIT_PRICE;
        price += this.toppings.length * TOPPING_PRICE;

        if (this.protein !== "None") {
            price += PROTEIN_PRICE;
        }

        return price;
    }

    // one line per option, used for the order summary
    getDescription() {
        let lines = [
            "Size: " + this.size,
            "Base: " + this.base,
            "Fruits: " + this.fruits.join(", "),
            "Toppings: " + (this.toppings.length > 0 ? this.toppings.join(", ") : "None"),
            "Protein: " + this.protein,
            "Sweetener: " + this.sweetener
        ];

        if (this.instructions !== "") {
            lines.push("Special instructions: " + this.instructions);
        }

        return lines.join("\n");
    }
}
