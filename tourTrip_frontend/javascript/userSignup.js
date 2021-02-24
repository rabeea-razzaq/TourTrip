//references
const signup = document.getElementById('user-signup-form');
const errorHeading = document.querySelector('.error-message');

signup.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = {
        firstName:signup['first-name'].value,
        lastName:signup['last-name'].value,
        email:signup['email'].value,
        password:signup['password'].value
    }
    const response = await fetch('http://localhost:3000/auth/signup',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    });
    if(response.status === 201){
        const jsonParsed = await response.json();
        window.localStorage.setItem('user',jsonParsed.token);
        window.location.replace('../html/index.html');
    }
    else{
        signup.reset();
        errorHeading.style.color = 'red'
        errorHeading.textContent = 'Something went wrong please enter again'
    }
})