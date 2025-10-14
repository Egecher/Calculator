const display = document.getElementById("display");

function backSpace() {
    display.value = display.value.slice(0, -1);
};

function allClear() {
    display.value = "";
}

function appendSymbol(Symbol) {
    if (display.value == "Hata!") display.value = "";
    if (display.value == "undefined") display.value = "";
    const operators = ["+", "-", "*", "/", "%"];
    const lastChar = display.value[display.value.length - 1];

    if (Symbol === ".") {
        const numbers = display.value.split(/[\+\-\*\/\%]/);
        const lastNumber = numbers[numbers.length - 1];
        if (lastNumber.includes(".")) return;
    }

    if (operators.includes(Symbol)) {
        if (!display.value) return;
        if (operators.includes(lastChar)) {
            display.value = display.value.slice(0, -1) + Symbol;//son karakter operator ise değiştir
            return;
        }
    }

    display.value += Symbol;
}

function calculate() {
    try {
        if (display.value == "") return;
        display.value = eval(display.value);
    } catch {
        display.value = "Hata!"
    }
}

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || ["+", "-", "*", "/", "%", "."].includes(key)) {
        appendSymbol(key);
    }

    if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculate();
    }

    if (key === "Backspace") {
        backSpace();
    }
});