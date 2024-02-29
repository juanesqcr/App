const container = document.getElementById("container");
var LoginBtn = document.getElementById("login");
var SignInBtn = document.getElementById("sign-in");

LoginBtn.addEventListener('click', () => {
    container.classList.add("active");
});

SignInBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });
  