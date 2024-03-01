const container = document.getElementById("container");
const loginToggleBtn = document.getElementById("login-toggle");
const signUpToggleBtn = document.getElementById("sign-up-toggle");

loginToggleBtn.addEventListener("click", () => {
  container.classList.add("active");
});

signUpToggleBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

const form = document.querySelector(".container-sign-in form");

form.addEventListener("submit", async (event) => {
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
  console.log(resJson);
  if (resJson.redirect) {
    window.location.href = resJson.redirect;
  }
});
