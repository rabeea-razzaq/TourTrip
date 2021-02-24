// references 
const searchForm = document.getElementById("searchbar");
const displayDiv = document.getElementById('card-content')
const dropdown = document.getElementById('dropdown1');
const heading = document.getElementById('heading');
const loginBtn = document.getElementById('login-btn');
const userSignup = document.getElementById('user-signup');
const userlogin = document.getElementById('user-login');
const logoutBtn = document.getElementById('logout-btn') 
const token = window.localStorage.getItem('user');
const buyPackage = document.getElementById('buy-package');
const purchase = document.getElementById('purchases');

window.addEventListener('load',async (e)=>{
  if(token){
   const response= await fetch('http://localhost:3000/auth/user-verify?pr=check',{
      headers:{
        'Authorization':token
      }
    });
    if(response.status===200){
       loginBtn.style.display = 'none';
       userSignup.style.display = 'none'
       userlogin.style.display = 'none';
       logoutBtn.style.display = 'inline-block';
       purchase.style.display = 'inline-block';
    }
    else{
      loginBtn.style.display = 'inline-block';
      userSignup.style.display = 'inline-block';
      userlogin.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
      purchase.style.display = 'none';

    }
  }
  else{
    loginBtn.style.display = 'inline-block';
    userSignup.style.display = 'inline-block';
    userlogin.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    purchase.style.display = 'none';
  }
})

heading.style.display = 'none';

// card displaying function
 function cardDisplay(data,targetDiv){
    if(!(data.length>0)){
        str = 'Nothing Found'
    }
    else{
        var str = '';
        data.forEach(each=>{
            html=`<div class="col s12 m5">
            <div class="card" >
              <div class="card-image">
                <img class="card-image" src="http://localhost:3000/${each.imageUrl}">
                <span class="card-title">${each.Title}</span>
              </div>
              <div class="card-content">
                <h5>Price</h5>
                <p class="price">${each.price}</p>
                <h5>Description</h5>
                <p>${each.description}</p>
                <h5>Destination</h5>
                <ul class="list-icon">
                ${each.destination.map(dest=>`<li>${dest}</li>`).join(" ")}
                </ul>
              </div>
              <div class="card-action" id="${each._id}">
              <a class="btn modal-trigger purchase purple darken-4" href="#purchase-modal">Purchase Now!</a>
              </div>
            </div>
          </div>`
          str +=html
        })
    }
    heading.style.display = 'block';
    targetDiv.innerHTML = str;
}

// for searching
searchForm.addEventListener('submit', async function(e){
    e.preventDefault();
    console.log('search m agaya');
    const searchItem = searchForm['first_name'].value;
   const response = await fetch(`http://localhost:3000/packages/getsearch/${searchItem}`);
   const parsedResponse = await response.json();
   cardDisplay(parsedResponse.result,displayDiv);
})
// for price filter
dropdown.addEventListener('click',async function(e){
  e.preventDefault();
  const range = e.target.innerHTML.split('-');
  range.forEach(each=>{
    each.trim();
  })
 const response= await fetch(`http://localhost:3000/packages/priceFilter?min=${range[0]}&max=${range[1]}`);
 const parsed = await response.json();
 console.log(parsed.result);
 cardDisplay(parsed.result,displayDiv);
})

// for login check
loginBtn.addEventListener('click',async(e)=>{
  e.preventDefault();
  console.log('Login m agaya hun');
  const token = window.localStorage.getItem('admin');
  console.log(token)
  if(token){
    console.log('if m to agaya hai')
      const response = await fetch('http://localhost:3000/auth/verify?pr=notproceed',{
        headers:{
          "Authorization": token
       }
      });
      console.log(response);
      if(response.status!== 200){
        console.log('response sahi hai')
        window.localStorage.removeItem('admin');
        window.location.replace('../html/AdminLogin.html');
      }
      else{
        window.location.replace('../html/dashboard.html');
      }
  }
  else{
    window.location.href = '../html/AdminLogin.html'
  }
})
logoutBtn.addEventListener('click',(e)=>{
  console.log("user")
  e.preventDefault();
  window.localStorage.removeItem('user');
 location.reload();
})
displayDiv.addEventListener('click',(e)=>{
  e.preventDefault();
  if(e.target.className.includes('purchase')){
    const package_id = e.target.parentElement.id;
    const price = e.target.parentElement.previousElementSibling.querySelector('.price').textContent;
     buyPackage['Price'].nextElementSibling.className = 'active';
     buyPackage['packageId'].value = package_id;
     buyPackage['Price'].value = price;
  }
})
buyPackage.addEventListener('submit',async(e)=>{
  e.preventDefault();
  console.log(typeof(buyPackage['ctNumber'].value));
 const data = {
    name:buyPackage['name'].value,
    ctNumber:buyPackage['ctNumber'].value,
    price:buyPackage['Price'].value,
    address:buyPackage['address'].value,
    package:buyPackage['packageId'].value,
    purchaseDate: new Date()
  };
  console.log(data);
  const response = await fetch('http://localhost:3000/purchase/add-purchase',{
    method:'POST',
    body:JSON.stringify(data),
    headers:{
      'Content-Type':'application/json',
      'Authorization':token
    }
  });
  console.log(response);
  if(response.status === 200){
    console.log('hogaya');
    window.location.replace('../html/purchased.html');
  }
  
})