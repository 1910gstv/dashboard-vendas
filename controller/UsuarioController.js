const btnLogin = document.getElementById("loginButton");
const baseURL = "http://localhost:8081";

btnLogin.addEventListener("click", authLogin, false);

async function authLogin(e) {
  var login = document.getElementById("username").value;
  var senha = document.getElementById("password").value;

  axios
    .post(`${baseURL}/authenticate`, {
      login,
      senha,
    })
    .then((response) => {
      console.log(response);

      var token = response.data.token;
      localStorage.setItem("token", token);

      window.location.href = "../view/home.html";
    })
    .catch((err) => {
      console.log(err.message);
      e.preventDefault();
      var small = document.querySelector("#error-msg");

      small.style.display = "block";
    });
}
