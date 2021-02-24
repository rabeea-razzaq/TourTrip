//references 
const loginForm = document.getElementById('login-form');
const errorMessage = document.querySelector('.error-message');


document.addEventListener('DOMContentLoaded',()=>{
    const token = window.localStorage.getItem('admin');
    if(token){
        window.location.replace('../html/dashboard.html')
    }
})



loginForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const username = loginForm['username'].value;
    const password = loginForm['password'].value
   const response = await fetch('http://localhost:3000/auth/admin-login',{
       method:'POST',
       body: JSON.stringify({
           username:username,
           password:password
       }) ,
       headers:{
           "Content-Type":"application/json"
       }
   });

   console.log(response);
   if(response.status===401){
       errorMessage.style.color = 'red'
     errorMessage.textContent = 'Please Provide Valid Email Or Password';
   }
   else{
    errorMessage.textContent = '';
    const parsed = await response.json()
      window.localStorage.setItem('admin',parsed.token);
      window.location.href='../html/dashboard.html'
      
   }

    
    
})