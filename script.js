//select the elements of the form:
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Catch the input event to form the value:
amount.oninput = () => {
  //catch the real amount and remove the caracters that is not a  number:
  let value = amount.value.replace(/\D/g, "");

  //transform the amount in cents(exemple: 150/100 = 1.50 that is the same to R$ 1,50):
  value = Number(value) / 100;

  //update the value of the input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  //form the amount in the standart BRL(Brazilian real):
  value = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  //return the amount formated:
  return value;
}

//Form event, // catch the events of the submit to obtain the values:
form.onsubmit = (event) => {
  //prevent the standart behavior to reload the page
  event.preventDefault();

  //creat an object with the details of the new expense:
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  //calling the fuction that will add the item to the list:
  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
  } catch (error) {
    alert("it was not possible to update the expense list");
    console.log(error);
  }
}
