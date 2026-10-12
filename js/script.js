// Energy Bowl Builder - main script

// get all the values the user picked in the form
function getFormData() {

    let base = document.getElementById("base").value;
    let protein = document.getElementById("protein").value;
    let sweetener = document.getElementById("sweetener").value;
    let instructions = document.getElementById("instructions").value.trim();

    // checkboxes - loop through and keep only the checked ones
    let fruits = [];
    let fruitBoxes = document.querySelectorAll('input[name="fruits"]:checked');
    for (let i = 0; i < fruitBoxes.length; i++) {
        fruits.push(fruitBoxes[i].value);
    }

    let toppings = [];
    let toppingBoxes = document.querySelectorAll('input[name="toppings"]:checked');
    for(let i = 0; i < toppingBoxes.length; i++) {
        toppings.push(toppingBoxes[i].value);
    }

    //size radio
    let sizeChoice = document.querySelector('input[name="size"]:checked');
    let size = sizeChoice ? sizeChoice.value : "";

    return {
        base: base,
        fruits: fruits,
        toppings: toppings,
        protein: protein,
        sweetener: sweetener,
        size: size,
        instructions: instructions
    };
}


/* check the form data before making the bowl
   returns a list of error messages (empty list = all good) */
function validateForm(data) {
    let errors = [];

    if (data.base === "") {
        errors.push("Please choose a base for your bowl.");
    }

    if (data.fruits.length == 0) {
        errors.push("Pick at least one fruit.");
    }

    // dont want people piling on everything
    if (data.toppings.length > 3) {
        errors.push("You can only pick up to 3 toppings.");
    }

    if (data.size === "") {
        errors.push("Please select a size.");
    }

    if(data.instructions.length > 150) {
        errors.push("Special instructions must be 150 characters or less.");
    }

    return errors;
}


// ---- connect the form ----
const form = document.getElementById("bowlForm");
const output = document.getElementById("output");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    let data = getFormData();
    let errors = validateForm(data);
    console.log("data: ", data, "\nerrors: ", errors);

    // show errors if there are any
    if (errors.length > 0) {
        let html = "<ul class='error'>";
        for (let i = 0; i < errors.length; i++) {
            html += "<li>" + errors[i] + "</li>";
        }
        html += "</ul>";
        output.innerHTML = html;
        return;
    }

    // everything is valid
    console.log(data);
    output.innerHTML = "<p>Order received! Building your bowl...</p>";
});
