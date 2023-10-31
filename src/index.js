const btnLogin = document.getElementById('loginButton')

btnLogin.addEventListener("click", authLogin, false)

function authLogin(e) {
    
    var login = document.getElementById("username").value;
    var senha = document.getElementById("password").value;
    var title = document.getElementsByClassName('title')

    axios.post('http://localhost:8081/authenticate', { 
         login, 
         senha 
     }).then(response => {
         if(response.data.autenticado == true){
            window.location.href = '../views/home.html'
         } else {
            e.preventDefault()
            var small = document.querySelector('#error-msg')

            small.style.display = 'block'
         }
     }).catch(err => {
        console.log(err.message)
     })
}

// function login() {
//     axios.post('http://localhost:8081/authenticate').then(response => {
//     if(response.status == 200) {
//         console.log('Login realizado')
//         window.location.href = '../views/home.html';
//     }
//     }).catch(err => {
//         console.log(err)
//         console.log("User não autenticado")
//     })
// }

