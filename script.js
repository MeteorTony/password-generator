const resultElem = document.getElementById("result");
const lengthElem = document.getElementById("length");
const uppercaseElem = document.getElementById("uppercase");
const lowercaseElem = document.getElementById("lowercase");
const numbersElem = document.getElementById("numbers");
const symbolsElem = document.getElementById("symbols");
const generateElem = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// copying generated password
clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultElem.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

generate.addEventListener("click", () => {
  const length = +lengthElem.value;                 // string -> number
  const hasLower = lowercaseElem.checked;
  const hasUpper = uppercaseElem.checked;
  const hasNumber = numbersElem.checked;
  const hasSymbol = symbolsElem.checked;

  resultElem.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(           // filter out if not checked
    (item) => Object.values(item)[0]
  );

  // Doesn't have a selected type
  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);                  // 97: a -> a-z
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);                  // 65: A -> A-Z
}

function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);                 // 48: 0 -> 0-9
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
