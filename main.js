/* ATTENTION: THIS IS CODE FROM THE YOUTUBE CRASH COURSE. IT IS NOT MEANT TO RUN, IT IS JUST FOR LEARNING PURPOSES 

Video by Brad Traversy
JavaScript Crash Course For Beginners
https://youtu.be/hdI2bqOjy3c?t=4228 

Start at 1:10:29
 */

/* //single element
console.log(document.getElementById("my-form"));
console.log(document.querySelector(".container"));

//multiple element
console.log(document.querySelectorAll(".item"));
console.log(document.getElementsByClassName("item"));
console.log(document.getElementsByTagName('li')); */

/* //iterate through nodelist
const items = document.querySelectorAll(".item");
items.forEach((item) => console.log(item)); */

/* const ul = document.querySelector(".items");
// ul.remove();
// ul.lastElementChild.remove();
ul.firstElementChild.textContent = "Hello";
ul.children[1].innerText = "Brad";
ul.lastElementChild.innerHTML = "<h1>Hello</h1>";

const btn = document.querySelector(".btn");
btn.style.background = "red"; */

/* const btn = document.querySelector(".btn");
btn.addEventListener("mouseout", (e) => {
  e.preventDefault();
  document.querySelector("#my-form").style.background = "#ccc";
  document.querySelector("body").classList.add("bg-dark");
  document.querySelector(".items").lastElementChild.innerHTML =
    "<h1>Hello</h1>";
}); */

const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
let msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

let fieldIsEmpty = () => {
  if (nameInput.value === "" || emailInput.value === "") {
    msg.classList.add("error");
    msg.innerText = "Please fill out both fields";
    setTimeout(() => {
      msg.classList.remove("error");
      msg.innerText = "";
    }, 3000);

    return true;
  }
  return false;
};

let emailIsInvalid = () => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    return false;
  } else {
    msg.classList.add("error");
    msg.innerText = "Please enter a valid email";
    setTimeout(() => {
      msg.classList.remove("error");
      msg.innerText = "";
    }, 3000);
    return true;
  }
};

let handleSubmit = () => {
  let formData = new FormData(myForm);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => console.log("Form successfully submitted"))
    .catch((error) => alert(error));
};

let onSubmit = (e) => {
  e.preventDefault();

  if (!fieldIsEmpty() && !emailIsInvalid()) {
    const li = document.createElement("li");
    li.appendChild(
      document.createTextNode(`${nameInput.value} : ${emailInput.value}`)
    );

    userList.appendChild(li);

    handleSubmit();
    //clear fields
    nameInput.value = "";
    emailInput.value = "";
  }
};

myForm.addEventListener("submit", onSubmit);
