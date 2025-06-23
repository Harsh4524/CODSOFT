const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let input = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === null) return;

    if (value === "=") return; 
    input += value;
    display.value = input;
  });
});

document.getElementById("clear").addEventListener("click", () => {
  input = "";
  display.value = "";
});

document.getElementById("equals").addEventListener("click", () => {
  try {
    
    let result = calculateExpression(input);
    display.value = result;
    input = result.toString(); 
  } catch {
    display.value = "Error";
    input = "";
  }
});

function calculateExpression(expr) {
  
  let tokens = [];
  let number = "";

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];

    if ("0123456789.".includes(ch)) {
      number += ch;
    } else if ("+-*/".includes(ch)) {
      if (number === "") throw new Error("Invalid expression");
      tokens.push(parseFloat(number));
      tokens.push(ch);
      number = "";
    }
  }
  if (number !== "") tokens.push(parseFloat(number));

  
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === "*" || tokens[i] === "/") {
      const op = tokens[i];
      const left = tokens[i - 1];
      const right = tokens[i + 1];
      let temp = op === "*" ? left * right : left / right;
      tokens.splice(i - 1, 3, temp);
      i = 0;
    } else {
      i++;
    }
  }

  
  i = 0;
  while (i < tokens.length) {
    if (tokens[i] === "+" || tokens[i] === "-") {
      const op = tokens[i];
      const left = tokens[i - 1];
      const right = tokens[i + 1];
      let temp = op === "+" ? left + right : left - right;
      tokens.splice(i - 1, 3, temp);
      i = 0;
    } else {
      i++;
    }
  }

  return tokens[0];
}
