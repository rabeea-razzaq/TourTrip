const loginForm = document.getElementById('login-form');
const errorHeading = document.querySelector('.error-message');

loginForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const data = {
        email:loginForm['email'].value,
        password:loginForm['password'].value
    }
    console.log(data);
    const response = await fetch('http://localhost:3000/auth/login',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    });
    const jsonParsed = await response.json();
    if(response.status === 200){
        window.localStorage.setItem('user',jsonParsed.token);
        window.location.replace('../html/index.html');
    }
    else{
        loginForm.reset();
        errorHeading.style.color = 'red'
        errorHeading.textContent = jsonParsed.message;
    }
})