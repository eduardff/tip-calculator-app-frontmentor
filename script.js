const $inputBill = document.getElementById('bill');
const $inputPeople = document.getElementById('number-people');
const $inputCustomNumber = document.getElementById('custom-number');

const $buttons = document.getElementById('buttons-number');
const $resultAmount = document.getElementById('amount');
const $resultTotal = document.getElementById('total');

const $buttonReset = document.getElementById('btn-reset');

const validateNumbersInput = (value) => {
  // const pattern = /^[0-9]+$/;
  const pattern = /^[0-9]+(\.[0-9]+)?$/;
  return pattern.test(value);
};
const showError = (input) => {
  input.classList.add('input-error');
};
const removeError = (input) => {
  input.classList.remove('input-error');
};

const checkInputBill = () => {
  const billValue = $inputBill.value.trim();
  if (billValue === '' || !validateNumbersInput(billValue)) {
    showError($inputBill);
  } else {
    removeError($inputBill);
    return true;
  }
  return false;
};
const checkInputCustom = () => {
  // TODO: añadir validacion para que no se permita cero,hacerlo luego al final para ver que pasa
  const customValue = $inputCustomNumber.value.trim();
  if (customValue === '' || !validateNumbersInput(customValue)) {
    showError($inputCustomNumber);
  } else {
    removeError($inputCustomNumber);
    return true;
  }
  return false;
};
const checkInputPeople = () => {
  const peopleValue = $inputPeople.value.trim();
  if (peopleValue === '0') {
    showError($inputPeople);
    document
      .getElementById('error-message')
      .classList.add('show-message-error');
  } else if (peopleValue === '' || !validateNumbersInput(peopleValue)) {
    showError($inputPeople);
    document
      .getElementById('error-message')
      .classList.remove('show-message-error');
  } else {
    removeError($inputPeople);
    document
      .getElementById('error-message')
      .classList.remove('show-message-error');
    return true;
  }
  return false;
};
const calculateAndShowResult = (billValue, peopleValue, tipPercentage) => {
  const result = billValue * tipPercentage;
  $resultAmount.textContent = `$${(result / peopleValue).toFixed(2)}`;
  $resultTotal.textContent = `$${((result + +billValue) / peopleValue).toFixed(
    2
  )}`;
};

const showBill = (bill, people, custom) => {
  const removeAtiveStyle = () => {
    Array.from(document.querySelectorAll('button')).map((tab) =>
      tab.classList.remove('btn-active')
    );
  };
  $buttons.addEventListener('click', (event) => {
    if (checkInputBill() && checkInputPeople()) {
      if (event.target.classList.contains('btn')) {
        const tipPercentage = parseFloat(event.target.textContent) / 100;
        calculateAndShowResult(bill.value, people.value, tipPercentage);
        removeAtiveStyle();
        event.target.classList.add('btn-active');
      }
    }
  });
  const calculateInput = () => {
    if (checkInputBill() && checkInputPeople() && checkInputCustom()) {
      const customValue = parseFloat(custom.value);
      const tipPercentage = customValue / 100;
      calculateAndShowResult(bill.value, people.value, tipPercentage);
    }
  };
  $inputCustomNumber.addEventListener('input', calculateInput);
  $inputCustomNumber.addEventListener('click', removeAtiveStyle);
  $inputBill.addEventListener('input', calculateInput);
  $inputPeople.addEventListener('input', calculateInput);

  $buttonReset.addEventListener('click', () => {
    bill.value = '';
    people.value = '';
    custom.value = '';
    $resultAmount.textContent = '$0.00';
    $resultTotal.textContent = '$0.00';
    removeAtiveStyle();
  });
};

const showCalculator = () => {
  showBill($inputBill, $inputPeople, $inputCustomNumber);
};
export { showCalculator };
