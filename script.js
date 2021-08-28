const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const toastContainerEl = document.querySelector('.toast-container');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password)
    return;
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove(textarea);
  notify()
});

function notify() {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerText = 'Copied to clipboard';
  toastContainerEl.appendChild(toast);
  setTimeout(() => toastContainerEl.removeChild(toast), 3000);
}

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolsEl.checked;
  
  const funcs = [ 'lower', 'upper', 'number', 'symbol' ];

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length) {
 let generatedPassword = '';
 const typesCount = hasLower + hasUpper + hasNumber + hasSymbol;
 const typesArray = [{lower: hasLower}, {upper: hasUpper}, {number: hasNumber}, {symbol: hasSymbol}]
 .filter(item => Object.values(item)[0]);
 if (typesCount > 0){
   for (let i = 0; i < length; i++) {
    const type = typesArray[Math.floor(Math.random() * typesArray.length)];
    const funcName = Object.keys(type)[0];
    generatedPassword += randomFunc[funcName]();
   }
 }
 
 return generatedPassword;
}

function getRandomLower() {
  // 97 - 122
  return String.fromCharCode(
    Math.floor(Math.random() * 26) + 97
  );
}

function getRandomUpper() {
  // 65 - 90
  return String.fromCharCode(
    Math.floor(Math.random() * 26) + 65
  );
}

function getRandomNumber() {
  return String.fromCharCode(
    Math.floor(Math.random() * 10) + 48
  );
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}