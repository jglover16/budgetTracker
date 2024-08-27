const form = document.querySelector(".add"); //access to form input fields
const incomeList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");
const zeroError = document.querySelector(".zeroError");
//create transaction if we dont ahve value, otherwise we will get the value of our transaction and add info on it
let transactions = localStorage.getItem("transactions") !== null ?JSON.parse(localStorage.getItem("transactions")) : [] ; 

function generateTemplate(id, source, amount, time){
return `
        <li data-id="${id}">
        <p>
             <span>${source}</span>
              <span id="time">${time}</span>
         </p>
          $<span>${Math.abs(amount)}</span> 
          <i class="bi bi-trash delete"></i>
          </li>`;
}

function addTransDOM(id, source, amount, time){
    if(amount > 0){
        incomeList.innerHTML += generateTemplate(id, source, amount, time);
    } else {
        expenseList.innerHTML += generateTemplate(id, source, amount, time);
    }
};

function addTransaction(source, amount){
    const time = new Date();
    const transaction = {
        id: Math.floor(Math.random()*1000),
        source: source,
        amount: amount,
        time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`
    };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    addTransDOM(transaction.id, transaction.source, transaction.amount, transaction.time);
}

form.addEventListener("submit", event => {
    event.preventDefault();
    addTransaction(form.source.value, Number(form.amount.value));
    form.reset();
    
});

function getTransaction(){
    transactions.forEach(transaction => { //acceess transacitons list and then accessed each transaction
        if(transaction.amount > 0){
            incomeList.innerHTML += generateTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
        } else if(transaction.amount == 0){

        } else {
            expenseList.innerHTML +=  generateTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);;
        }
    })
}
getTransaction();

// delete from transaction list in storage
// filter the list of transactions to keep all the ones not equal to the id clicked below in addevent listener
function deleteTransaction(id){
    transactions = transactions.filter(transaction => {
        return transaction.id !== id;
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

incomeList.addEventListener("click", event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove(); //remove from html
        deleteTransaction(Number(event.target.parentElement.dataset.id)); //delete from transaction list
    }
});

expenseList.addEventListener("click", event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        deleteTransaction(Number(event.target.parentElement.dataset.id)); 
    }
});