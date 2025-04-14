//select the elements of the form:
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Select the elements of the list:
const expenseList = document.querySelector("ul");

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
    //Create elements "li" to add to the list(ul):
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    //Create the icon category:
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    //create the info of the expense:
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    //create the name of the expense:
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    //create the category of the expense:
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    //add name and category in the expense info div:
    expenseInfo.append(expenseName, expenseCategory);

    //add infos in the item:
    expenseItem.append(expenseIcon, expenseInfo);

    //add the item in the list:
    expenseList.append(expenseItem);
  } catch (error) {
    alert("it was not possible to update the expense list");
    console.log(error);
  }
}
