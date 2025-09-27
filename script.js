const display = document.getElementById("display");

function backSpace() {
    display.value = display.value.slice(0, -1);
};

function allClear() {
    display.value = "";
}

function appendSymbol(Symbol) {
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
        display.value = eval(display.value);
    } catch {
        display.value = "Hata!"
    }
}