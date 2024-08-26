const form = document.querySelector(".add"); //access to form input fields

form.addEventListener("submit", event => {
    event.preventDefault();
    console.log(form.source.value, form.amount.value)
})