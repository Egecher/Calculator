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
    const input = display.value.trim();

    if (input === "") return;

    if (!/^[0-9+\-*/().\s]+$/.test(input)) {
        showError("Geçersiz karakter!");
        return;
    }

    try {
        const result = Function('"use strict"; return (' + input + ')')();

        if (isNaN(result) || !isFinite(result)) {
            showError("Geçersiz işlem!");
        } else {
            display.value = result;
        }
    } catch {
        showError("İşlemi tamamlayamadım, denklemi kontrol et.");
    }
}

function showError(message) {
    display.value = message;
    display.classList.add("error");

    setTimeout(() => {
        display.value = "";
        display.classList.remove("error");
    }, 2000);
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

    if (key === "Escape") {
        allClear();
    }
});