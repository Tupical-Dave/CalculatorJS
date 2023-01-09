class Calculator {
  constructor(previousValueTextElement, currentValueTextElement) {
    this.previousValueTextElement = previousValueTextElement;
    this.currentValueTextElement = currentValueTextElement;
    this.allClear();
  }

  allClear() {
    this.previousValue = "";
    this.currentValue = "";
    this.operation = undefined;
  }

  delete() {
    this.currentValue = this.currentValue.toString().slice(0, -1);
  }

  addNumber(number) {
    if (this.currentValue.toString().includes(".") && number === ".") return;
    this.currentValue = this.currentValue.toString() + number.toString();
  }

  choooseOperation(operation) {
    this.operation = operation;
  }

  calculate() {
    if (this.operation === "+") {
      this.currentValue =
        Number(this.previousValueTextElement.innerText.slice(0, -2)) +
        Number(this.currentValueTextElement.innerText);
      previousValueTextElement.innerText = "";
    }

    if (this.operation === "-") {
      this.currentValue =
        Number(this.previousValueTextElement.innerText.slice(0, -2)) -
        Number(this.currentValueTextElement.innerText);
      previousValueTextElement.innerText = "";
    }

    if (this.operation === "X") {
      this.currentValue =
        Number(this.previousValueTextElement.innerText.slice(0, -2)) *
        Number(this.currentValueTextElement.innerText);
      previousValueTextElement.innerText = "";
    }

    if (this.operation === "÷") {
      this.currentValue =
        Number(this.previousValueTextElement.innerText.slice(0, -2)) /
        Number(this.currentValueTextElement.innerText);
      previousValueTextElement.innerText = "";
    }

    if (this.operation === "%") {
      this.currentValue =
        Number(this.previousValueTextElement.innerText.slice(0, -2)) / 100;
      previousValueTextElement.innerText = "";
    }
  }

  updateValue() {
    this.currentValueTextElement.innerText = this.currentValue;
    this.previousValueTextElement.innerText = this.previousValue;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-allclear]");
const previousValueTextElement = document.querySelector(
  "[data-previous-value]"
);
const currentValueTextElement = document.querySelector("[data-current-value]");

const operations = ["÷", "X", "-", "+"];

const calculator = new Calculator(
  previousValueTextElement,
  currentValueTextElement
);

allClearButton.addEventListener("click", () => {
  calculator.allClear();
  calculator.previousValue = "";
  calculator.updateValue();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateValue();
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.addNumber(button.innerText);
    calculator.updateValue();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (calculator.currentValue === "" && calculator.previousValue === "") {
      return;
    }

    if (
      operations.some((element) =>
        calculator.previousValueTextElement.innerText.includes(element)
      )
    ) {
      if (calculator.currentValue !== "") {
        calculator.calculate();
        calculator.previousValue = "";
        calculator.updateValue();
      } else {
        if (button.innerText === "%") {
          calculator.currentValue = `${calculator.previousValue.slice(0, -2)/100}`;
          calculator.previousValue = "";
          calculator.updateValue();
        } else {
          calculator.choooseOperation(button.innerText);
          calculator.previousValue = `${calculator.previousValue.slice(
            0,
            -2
          )} ${button.innerText}`;
          calculator.updateValue();
        }

        return;
      }
    }
    calculator.choooseOperation(button.innerText);
    if (button.innerText === "%") {
      calculator.currentValue = `${calculator.currentValue/100}`;
      calculator.updateValue();
    } else {
      calculator.previousValue = `${calculator.currentValue} ${button.innerText}`;
      calculator.currentValue = "";
      calculator.updateValue();
    }
  });
});

equalsButton.addEventListener("click", () => {
  if (calculator.currentValue === "" && calculator.previousValue === "") {
    return;
  }
  calculator.calculate();
  calculator.previousValue = "";
  calculator.updateValue();
});
