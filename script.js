// hello, I am the pull request
const functions = document.querySelectorAll(".button.function");
let buttons = document.querySelectorAll(".button");
let operators = document.querySelectorAll(".button.operator");

let displayInput = document.querySelector(".display__input");
let displayOutput = document.querySelector(".display__output");

let input = document.querySelector('div[type="text"].text__input');
let output = document.querySelector('div[type="text"].text__output');

let equalPressed = false;
let operatorPressed = false;
let delPressed = false;
let acPressed = false;

//The preInput variable is used to keep track of the current input value that the user has entered before an operator button is clicked.
let preInput = "";

//The equals() function is responsible for calculating the result of an arithmetic operation. It takes the current value of the input and uses the eval() function to evaluate the expression. If an error occurs during the evaluation of the expression, an "Invalid input" message is displayed on the calculator screen.
function equals() {
  try {
    currentValue = preInput;
    input.innerHTML = clearInput(preInput);
    result = eval(currentValue);
    if (
      result === undefined ||
      currentValue === "" ||
      preInput === "invalid input"
    ) {
      input.style.color = "rgb(235, 96, 86)";
      input.style.transitionDuration = "0s";
      output.style.transitionDuration = "0s";
      preInput = "Invalid input";
      output.innerHTML = "";
      input.innerHTML = clearInput(preInput);
    } else {
      input.style.transitionDuration = "0.5s";
      output.style.transitionDuration = "0.5s";

      output.innerHTML = eval(preInput);
      input.style.fontSize = "25px";
      input.style.color = "rgb(107, 107, 107)";
      input.style.marginBottom = "10px";

      output.style.fontSize = "50px";
      output.style.color = "rgb(215, 216, 216)";
      output.style.marginBottom = "15px";
      output.style.top = "-15px";
      displayOutput.style.marginTop = "5px";
      output.style.paddingTop = "0px";
    }
  } catch (e) {
    input.style.color = "rgb(235, 96, 86)";
    input.style.transitionDuration = "0s";
    output.style.transitionDuration = "0s";
    preInput = "Invalid input";
    output.innerHTML = "";
    input.innerHTML = clearInput(preInput);
  }
}

//The reset() function is used to reset the input and output values of the calculator.
function reset() {
  preInput = "";
  output.innerHTML = "";
  input.style.fontSize = "50px";
  output.style.fontSize = "25px";
}

//The continueInput() function is used to continue an arithmetic operation by taking the result of the previous calculation and using it as the input for the next calculation.
function continueInput() {
  preInput = output.innerHTML;
  output.innerHTML = "";
  input.style.fontSize = "50px";
  input.style.color = "rgb(215, 216, 216)";
  output.style.fontSize = "25px";
}

//This loop adds a click event listener to each element in the functions array. When the element is clicked, the function checks if the inner HTML of the element is 'AC' or 'del' and performs certain actions based on that.
for (let func of functions) {
  func.addEventListener("click", () => {
    if (func.innerHTML == "AC") {
      preInput = "";
      input.innerHTML = clearInput(preInput);
      output.innerHTML = "";
      output.style.top = "0px";
      displayOutput.style.marginTop = "5px";
      delPressed = false;
      operatorPressed = false;
      acPressed = true;
      if (output.innerHTML === "undefined") {
        output.innerHTML = "";
      }
    }

    if (func.innerHTML.toLowerCase() == "del") {
      if (
        (preInput.length < 2 && input.innerHTML.length < 2) ||
        (preInput === "" &&
          input.innerHTML === "" &&
          output.innerHTML == undefined)
      ) {
        output.innerText = "";
      }

      if (preInput === "Invalid input") {
        preInput = "";
        input.innerHTML = "";
      } else {
        delPressed = true;
        let inputValue = preInput.split("");
        inputValue.splice(-1, 1);
        preInput = inputValue.join("");
        input.innerHTML = clearInput(preInput);

        input.style.fontSize = "50px";
        input.style.color = "rgb(215, 216, 216)";
        input.style.marginBottom = "22px";

        output.style.fontSize = "25px";
        output.style.color = "rgb(107, 107, 107)";
        output.style.marginBottom = "15px";
        output.style.top = "0px";
        output.style.paddingTop = "10px";
        displayOutput.style.marginTop = "5px";
      }
    }
  });
}

//For each button element, it checks the text content of the button and performs a specific action based on its value.
for (let button of buttons) {
  button.addEventListener("click", () => {
    if (button.innerText == "0") {
      zero();
    }
    if (button.innerText == "00") {
      doubleZero();
    }
    if (button.innerText == "X") {
      letOperator("*");
      operatorPressed = true;
      if (equalPressed && !delPressed) {
        equalPressed = false;
        continueInput();
        letOperator("*");
      }
    }
    if (button.innerText == "-") {
      letOperator("-");
      operatorPressed = true;
      if (equalPressed && !delPressed) {
        equalPressed = false;
        continueInput();
        letOperator("-");
      }
    }
    if (button.innerText == "+") {
      letOperator("+");
      operatorPressed = true;
      if (equalPressed && !delPressed) {
        equalPressed = false;
        continueInput();
        letOperator("+");
      }
    }
    if (button.innerText == "÷") {
      letOperator("/");
      operatorPressed = true;
      if (equalPressed && !delPressed) {
        equalPressed = false;
        continueInput();
        letOperator("/");
      }
    }
    if (button.innerText == "%") {
      letOperator("%");
      operatorPressed = true;
      if (equalPressed && !delPressed) {
        equalPressed = false;
        continueInput();
        letOperator("%");
      }
    }
    if (button.innerText == ".") {
      if (!dot()) letOperator(".");
      if (equalPressed && !delPressed) {
        equalPressed = false;
        continueInput();
        letOperator("*");
      }
    }
    if (button.innerText == "=") {
      equals();
      equalPressed = true;
      operatorPressed = false;
      delPressed = false;
    }
  });
}

//The checkOperators() function checks whether the last character of a given string (preInput) is an operator symbol that is contained in the operatorsArr array. The function first extracts the last character of preInput using the bracket notation to access the last element of the string. Then, it checks whether this character is included in the operatorsArr array using the includes() method. If the last character of the string is an operator symbol, the function returns true, otherwise it returns false.
let operatorsArr = ["/", "%", "-", "+", "*", "."];
function checkOperators(arr) {
  const currentValue = preInput;
  const lastLetter = currentValue[currentValue.length - 1];
  const hasOperators = arr.includes(lastLetter);

  if (hasOperators) {
    return true;
  } else return false;
}

//The letOperator() function adds an operator symbol to the input field. The function first checks whether the last character of preInput is not an operator symbol by calling the checkOperators() function. If the last character is not an operator symbol, the function appends the operator symbol to the preInput string and updates the value of the input field. However, if the last character of preInput is an operator symbol, the function removes the last character from preInput and appends the new operator symbol to the modified string, then updates the value of the input field. The function also has a special case when the operator symbol is a "-" sign, in which case it checks that preInput is not already "-".
function letOperator(operator) {
  if (!checkOperators(operatorsArr)) {
    if ((preInput !== "" && preInput !== "Invalid input") || operator == "-") {
      preInput += operator;
      input.innerHTML = clearInput(preInput);
    }
  } else if (preInput !== "-") {
    updatedValue = preInput.split("");
    updatedValue.pop();
    updatedValue = updatedValue.join("");
    preInput = updatedValue;
    preInput += operator;
    input.innerHTML = clearInput(preInput);
  }
}

//The checkNumbers function checks whether the last character of the preInput is '0' and the second to last character is either '+', '-', '*', '/', or '%'. It also checks whether the preInput value is equal to '0'.
let checkNumbers = function () {
  let currentValue = preInput;
  let lastCharacter = currentValue.slice(-1);
  let secondLastCharacter = currentValue.slice(-2, -1);
  if (
    (lastCharacter === "0" && secondLastCharacter === "-") ||
    (lastCharacter === "0" && secondLastCharacter === "+") ||
    (lastCharacter === "0" && secondLastCharacter === "*") ||
    (lastCharacter === "0" && secondLastCharacter === "/") ||
    (lastCharacter === "0" && secondLastCharacter === "%")
  ) {
    return true;
  } else if (currentValue == "0") {
    return true;
  } else {
    return false;
  }
};

//The numbers function sets up event listeners on number buttons of the calculator interface. When a number button is clicked, it first checks whether a valid number can be inputted by calling the checkNumbers function. If the check passes and the button clicked corresponds to a valid number, the number is appended to the preInput and then displayed in the input.
function numbers() {
  let numArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (let button of buttons) {
    button.addEventListener("click", () => {
      if (!checkNumbers() && button.innerHTML == numArr[button.innerHTML - 1]) {
        preInput += numArr[button.innerHTML - 1];
        input.innerHTML = clearInput(preInput);
        acPressed = false;
        if (equalPressed && !delPressed) {
          equalPressed = false;
          reset();
          input.style.color = "rgb(215, 216, 216)";
          preInput += numArr[button.innerHTML - 1];
          input.innerHTML = clearInput(preInput);
        }
      }
    });
  }
}
numbers();

// Zero function allows to add up to 14 zeros in a number or after a dot. It also checks if the last character of the input is a zero.
function zero() {
  let currentValue = preInput;
  let lastCharacter = currentValue.slice(-1);
  let secondLastCharacter = currentValue.slice(-2, -1);
  let thirdLastCharacter = currentValue.slice(-3, -2);
  let fourthLastCharacter = currentValue.slice(-4, -3);
  let fifthLastCharacter = currentValue.slice(-5, -4);
  let sixthLastCharacter = currentValue.slice(-6, -5);
  let seventhLastCharacter = currentValue.slice(-7, -6);
  let eigthLastCharacter = currentValue.slice(-8, -7);
  let ninthLastCharacter = currentValue.slice(-9, -8);
  let tenthLastCharacter = currentValue.slice(-10, -9);
  let eleventhLastCharacter = currentValue.slice(-11, -10);
  let twelveththLastCharacter = currentValue.slice(-12, -11);
  let thirteenththLastCharacter = currentValue.slice(-13, -12);
  let fourteenthLastCharacter = currentValue.slice(-14, -13);
  let hasDot = currentValue.indexOf(".") !== -1;

  if (!hasDot && currentValue === "0") {
    return;
  } else if (
    (lastCharacter === "0" && secondLastCharacter === "-") ||
    (lastCharacter === "0" && secondLastCharacter === "*") ||
    (lastCharacter === "0" && secondLastCharacter === "+") ||
    (lastCharacter === "0" && secondLastCharacter === "/") ||
    (lastCharacter === "0" && secondLastCharacter === "%") ||
    (lastCharacter === "0" && secondLastCharacter === "*")
  ) {
    return;
  } else if (currentValue === "Invalid input") {
    return;
  } else if (hasDot && lastCharacter !== "0") {
    preInput += "0";
  } else if (!hasDot && lastCharacter !== "0") {
    preInput += "0";
  } else if (lastCharacter === "." || hasDot) {
    preInput += "0";
  } else if (
    (lastCharacter !== "." &&
      lastCharacter === "0" &&
      secondLastCharacter !== "0") ||
    (lastCharacter === "0" && thirdLastCharacter !== "0") ||
    (lastCharacter === "0" && fourthLastCharacter !== "0") ||
    (lastCharacter === "0" && fifthLastCharacter !== "0") ||
    (lastCharacter === "0" && sixthLastCharacter !== "0") ||
    (lastCharacter === "0" && seventhLastCharacter !== "0") ||
    (lastCharacter === "0" && eigthLastCharacter !== "0") ||
    (lastCharacter === "0" && ninthLastCharacter !== "0") ||
    (lastCharacter === "0" && tenthLastCharacter !== "0") ||
    (lastCharacter === "0" && eleventhLastCharacter !== "0") ||
    (lastCharacter === "0" && twelveththLastCharacter !== "0") ||
    (lastCharacter === "0" && thirteenththLastCharacter !== "0") ||
    (lastCharacter === "0" && fourteenthLastCharacter !== "0")
  ) {
    preInput += "0";
  }
  input.innerHTML = clearInput(preInput);
}

// doubleZero function behaves like zero function but also checks if the last character is an operator and if preInput is empty.
function doubleZero() {
  let currentValue = preInput;
  let lastCharacter = currentValue.slice(-1);
  let secondLastCharacter = currentValue.slice(-2, -1);
  let thirdLastCharacter = currentValue.slice(-3, -2);
  let fourthLastCharacter = currentValue.slice(-4, -3);
  let fifthLastCharacter = currentValue.slice(-5, -4);
  let sixthLastCharacter = currentValue.slice(-6, -5);
  let seventhLastCharacter = currentValue.slice(-7, -6);
  let eigthLastCharacter = currentValue.slice(-8, -7);
  let ninthLastCharacter = currentValue.slice(-9, -8);
  let tenthLastCharacter = currentValue.slice(-10, -9);
  let eleventhLastCharacter = currentValue.slice(-11, -10);
  let twelveththLastCharacter = currentValue.slice(-12, -11);
  let thirteenththLastCharacter = currentValue.slice(-13, -12);
  let fourteenthLastCharacter = currentValue.slice(-14, -13);
  let hasDot = currentValue.indexOf(".") !== -1;
  if (!hasDot && currentValue === "0") {
    return;
  } else if (currentValue === "0" || currentValue == "") {
    return;
  } else if (
    lastCharacter == "*" ||
    lastCharacter === "+" ||
    lastCharacter === "/" ||
    lastCharacter === "%" ||
    lastCharacter === "*" ||
    lastCharacter === "-"
  ) {
    return;
  } else if (
    (lastCharacter === "0" && secondLastCharacter === "-") ||
    (lastCharacter === "0" && secondLastCharacter === "*") ||
    (lastCharacter === "0" && secondLastCharacter === "+") ||
    (lastCharacter === "0" && secondLastCharacter === "/") ||
    (lastCharacter === "0" && secondLastCharacter === "%") ||
    (lastCharacter === "0" && secondLastCharacter === "*")
  ) {
    return;
  } else if (hasDot && lastCharacter !== "0") {
    preInput += "00";
  } else if (!hasDot && lastCharacter !== "0") {
    preInput += "00";
  } else if (lastCharacter === "." || hasDot) {
    preInput += "00";
  } else if (
    (lastCharacter !== "." &&
      lastCharacter === "0" &&
      secondLastCharacter !== "0") ||
    (lastCharacter === "0" && thirdLastCharacter !== "0") ||
    (lastCharacter === "0" && fourthLastCharacter !== "0") ||
    (lastCharacter === "0" && fifthLastCharacter !== "0") ||
    (lastCharacter === "0" && sixthLastCharacter !== "0") ||
    (lastCharacter === "0" && seventhLastCharacter !== "0") ||
    (lastCharacter === "0" && eigthLastCharacter !== "0") ||
    (lastCharacter === "0" && ninthLastCharacter !== "0") ||
    (lastCharacter === "0" && tenthLastCharacter !== "0") ||
    (lastCharacter === "0" && eleventhLastCharacter !== "0") ||
    (lastCharacter === "0" && twelveththLastCharacter !== "0") ||
    (lastCharacter === "0" && thirteenththLastCharacter !== "0") ||
    (lastCharacter === "0" && fourteenthLastCharacter !== "0")
  ) {
    preInput += "00";
  }
  input.innerHTML = clearInput(preInput);
}

//the dot function checks if the last character isn't a dot, or if the preinput is empty. It also doesn't allow to add a second dot in the number if it has two digits or less after the dot.
let dot = function () {
  let currentValue = preInput;
  let lastCharacter = currentValue.slice(-1);
  let secondLastCharacter = currentValue.slice(-2, -1);
  let thirdLastCharacter = currentValue.slice(-3, -2);
  let fourthLastCharacter = currentValue.slice(-4, -3);
  let fifthLastCharacter = currentValue.slice(-5, -4);
  let hasDot = currentValue.indexOf(".") !== -1;
  let operators = ["-", "+", "*", "/", "%"];

  if (
    (hasDot && lastCharacter === ".") ||
    (lastCharacter !== "." &&
      secondLastCharacter === "." &&
      operators.includes(fourthLastCharacter)) ||
    (lastCharacter !== "." &&
      thirdLastCharacter === "." &&
      operators.includes(fifthLastCharacter)) ||
    (hasDot &&
      lastCharacter !== "." &&
      secondLastCharacter === "." &&
      !operators.includes(fourthLastCharacter)) ||
    (hasDot &&
      lastCharacter !== "." &&
      thirdLastCharacter === "." &&
      !operators.includes(fifthLastCharacter))
  ) {
    return true;
  } else {
    return false;
  }
};

//If these conditions are satisfied, the function evaluates the value of preInput using the eval() function, and displays the result in the output element
for (elem of buttons) {
  elem.addEventListener("click", () => {
    try {
      if (
        (!equalPressed && operatorPressed && eval(preInput) !== undefined) ||
        (delPressed && eval(preInput) !== undefined)
      ) {
        output.innerHTML = eval(preInput);
        output.style.fontSize = "25px";
        output.style.marginBottom = "15px";
        output.style.color = "rgb(107, 107, 107)";

        output.style.paddingTop = "10px";
        output.style.top = "0px";
        displayOutput.style.marginTop = "5px";
        console.log("cock");
      }

      if (elem.innerText !== "=" && preInput === "Invalid input") {
        preInput = "";
        input.innerHTML = "";
      }
    } catch {}
  });
}

// clearInput function adds CSS class to the operators before displaying the input
function clearInput(input) {
  let inputArr = input.split("");
  let inputArrLength = inputArr.length;

  for (i = 0; i < inputArrLength; i++) {
    if (inputArr[i] === "-") {
      inputArr[i] = `<span class="operator">-</span>`;
    } else if (inputArr[i] === "+") {
      inputArr[i] = `<span class="operator">+</span>`;
    } else if (inputArr[i] === "/") {
      inputArr[i] = `<span class="operator">÷</span>`;
    } else if (inputArr[i] === "*") {
      inputArr[i] = `<span class="operator">x</span>`;
    } else if (inputArr[i] === "%") {
      inputArr[i] = `<span class="operator">%</span>`;
    }
  }
  return inputArr.join("");
}
