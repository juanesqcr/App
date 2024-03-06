const container = document.getElementById("container");
const loginToggleBtn = document.getElementById("login-toggle");
const signUpToggleBtn = document.getElementById("sign-up-toggle");
const formLogin = document.querySelector(".container-sign-in form");
const formSignUp = document.querySelector(".container-sign-up form")

loginToggleBtn.addEventListener("click", () => {
  container.classList.add("active");
});

signUpToggleBtn.addEventListener("click", () => {
  container.classList.remove("active");
});


formLogin.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita que el formulario se envíe normalmente
  const email = event.target.children.email.value;
  const password = event.target.children.password.value;

  const res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const mensajeError = document.getElementsByClassName("escondidoLogin")[0];

  if (!res.ok) return mensajeError.classList.toggle("escondidoLogin", false);
  const resJson = await res.json();
  if (resJson.redirect) {
    setTimeout(() => {
      window.location.href = resJson.redirect;
    }, 300);
  }
});

formSignUp.addEventListener("submit", async (event) => {
  event.preventDefault();
  const firstName = event.target.children.name.value;
  const lastName = event.target.children.lastName.value;
  const phoneNumber = event.target.children.phoneNumber.value;
  const email = event.target.children.emailRegister.value;
  const address = event.target.children.address.value;
  const password = event.target.children.passwordRegister.value;

  console.log(firstName + lastName + phoneNumber + email + address + password)
  const res = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      password,
    }),
  });

  const mjsError = document.getElementsByClassName("escondidoSignUp")[0];
  const mjsSuccess = document.getElementsByClassName("escondidoSuccess")[0];

  if (!res.ok) {
    return mjsError.classList.toggle("escondidoSignUp", false);
  } else {
    mjsSuccess.classList.toggle("escondidoSignUp", false);
    container.classList.add("active");
  }
}
)



