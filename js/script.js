// Energy Bowl Builder - form handling and output

const form = document.getElementById("bowlForm");
const output = document.getElementById("orderOutput");


// values of all checked boxes/radios with this name
function getCheckedValues(name) {
    let checked = document.querySelectorAll('input[name="' + name + '"]:checked');
    return Array.from(checked, function (input) {
        return input.value;
    });
}

// collect everything the user picked
function getFormData() {
    return {
        size: getCheckedValues("size")[0] || "",
        base: document.getElementById("base").value,
        fruits: getCheckedValues("fruits"),
        toppings: getCheckedValues("toppings"),
        protein: document.getElementById("protein").value,
        sweetener: getCheckedValues("sweetener")[0] || "None",
        instructions: document.getElementById("instructions").value.trim()
    };
}

// returns a list of error messages (empty list = all good)
function validateForm(data) {
    let errors = [];

    if (data.size === "") {
        errors.push("Please select a size.");
    }
    if (data.base === "") {
        errors.push("Please choose a base for your bowl.");
    }
    if (data.fruits.length === 0) {
        errors.push("Pick at least one fruit.");
    }
    if (data.toppings.length > 3) {
        errors.push("You can only pick up to 3 toppings.");
    }
    if (data.instructions.length > 150) {
        errors.push("Special instructions must be 150 characters or less.");
    }

    return errors;
}


// small helper so every element is built the same way
function makeElement(tag, className, text) {
    let el = document.createElement(tag);
    el.className = className;
    el.textContent = text; // textContent so user text can't inject html
    return el;
}

function showErrors(errors) {
    let list = makeElement("ul", "error", "");
    errors.forEach(function (message) {
        list.appendChild(makeElement("li", "", message));
    });
    output.replaceChildren(list);
}

function showOrder(bowl) {
    let card = makeElement("div", "summary", "");
    card.appendChild(makeElement("h2", "", "Order placed! Your bowl is on its way."));
    card.appendChild(makeElement("p", "description", bowl.getDescription()));
    card.appendChild(makeElement("p", "total", "Total: $" + bowl.calculatePrice().toFixed(2)));
    output.replaceChildren(card);
}


form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    let data = getFormData();
    let errors = validateForm(data);

    if (errors.length > 0) {
        showErrors(errors);
    } else {
        showOrder(new EnergyBowl(data));
    }

    output.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
