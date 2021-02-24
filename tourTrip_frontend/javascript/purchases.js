const token = window.localStorage.getItem('user');

window.addEventListener('load',async (e)=>{
    if(token){
     const response= fetch('http://localhost:3000/auth/user-verify?pr=check',{
        headers:{
          'Authorization':token
        }
      });
      if(!(response.status===200)){
        window.location.replace('../html/index.html');
      }
    }
    else{
      window.location.replace('../html/index.html');
    }
  })
