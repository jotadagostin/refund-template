//select the elements of the form:
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Select the elements of the list:
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expenseTotal = document.querySelector("aside header h2");

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

//add a new item in the list:
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

    //Create the Amount of the expense:
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    //create the remove icon:
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    //add infos in the item:
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    //add the item in the list:
    expenseList.append(expenseItem);

    //clear the form to add a new item:
    formClear();

    //add the total:
    updateTotals();
  } catch (error) {
    alert("it was not possible to update the expense list");
    console.log(error);
  }
}

//update the total of expense:

function updateTotals(params) {
  try {
    //recover all the (li) from the list:
    const items = expenseList.children;

    //update the quantity of the items in the list:
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "expenses" : "expense"
    }`;

    //var to update the total:

    let total = 0;
    //run every item(li) of the list(ul)
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      //remove caracters that is not number and replace for comma or dot:
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      value = parseFloat(value);

      //check if it is a valid number:
      if (isNaN(value)) {
        return alert(
          "It was not possible to calculate the amount, the amount does not like a number"
        );
      }

      //incremente the total amount:
      total += Number(value);
    }

    //creat the span to add the R$ formated:
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    //Format the value and remove the R$ that is showed by the small in the style:
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");
    //clean the content of the element
    expenseTotal.innerHTML = "";

    //add the symbol of the coin and value formated:
    expenseTotal.append(symbolBRL, total);
  } catch (error) {
    console.log(error);
    alert("it was not possible to show the total");
  }
}

//event the catch the click the item in the list:
expenseList.addEventListener("click", function (event) {
  //verify if the item click is the remove item:
  if (event.target.classList.contains("remove-icon")) {
    //get the li father of the item clicked:
    const item = event.target.closest(".expense");
    //remove the item from the list:
    item.remove();
  }

  //update the total:
  updateTotals();
});

//Function the clean the form:

function formClear() {
  expense.value = "";
  category.value = "";
  amount.value = "";

  //put the focus in the amount input:
  expense.focus();
}
