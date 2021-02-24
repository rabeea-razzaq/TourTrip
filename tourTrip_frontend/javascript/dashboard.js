
const displayDiv = document.getElementById('actual-content');
const addForm = document.getElementById('add-package');
const updateBtn = document.getElementById('update-btn');
const deletebtn = document.getElementById('delete-btn');
const token = window.localStorage.getItem('admin');
const updateForm = document.getElementById('update-package')
const paginationDiv = document.querySelector('.pagination');
const searchBar = document.querySelector('.search-form');



document.addEventListener('DOMContentLoaded', async function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
  const response = await fetch('http://localhost:3000/auth/verify?pr=notproceed',{
    headers:{
      "Authorization": token
   }
  });
  if(response.status!== 200){
    window.localStorage.removeItem('admin');
    window.location.replace('../html/AdminLogin.html');
  }
});

async function preload (){
  const response = await fetch('http://localhost:3000/packages/all-packages');
  const parsedResponse = await response.json();
  cardDisplay(parsedResponse.packages);
  paginationDisplay(parsedResponse.paginationInfo);
   
}

// for pagination

function paginationDisplay(paginationData){
  if(paginationData.currentpage === 1){
    var html='<li id="left-arrow" class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>';
   }
   else{
    var html='<li class=""><a href="#!"><i class="material-icons">chevron_left</i></a></li>'
   }
  for(i=1;i<=paginationData.lastPage;i++){
    html+=`<li id="${((i===paginationData.lastPage)?"lastpage":"")}" class="${(i===paginationData.currentpage?"active":"")}"><a>${i}</a></li>`
  }
  html+= '<li id="right-arrow" class=""><a href="#!"><i class="material-icons">chevron_right</i></a></li>';
  paginationDiv.innerHTML = html;
}
// for displaaying cards
function cardDisplay(data){
   if(!(data.length>0)){
      str = '<h3>Nothing Found</h3>'
      paginationDiv.style.display = 'none';
  }
  else{
      var str = '';
      data.forEach(each=>{
          html=`<div class="col s12 m5 l4">
          <div class="card">
            <div class="card-image">
              <img class="card-image" src="http://localhost:3000/${each.imageUrl}">
              <span class="card-title black-text">${each.Title}</span>
            </div>
            <div class="card-content">
              <h5>Price</h5>
              <p>${each.price}</p>
              <h5>Description</h5>
              <p>${each.description}</p>
              <h5>Destination</h5>
              <ul class="list-icon">
              ${each.destination.map(dest=>`<li>${dest}</li>`).join(" ")}
              </ul>
            </div>
            <div class="card-action" id="${each._id}">
              <button  class="delete-btn  btn purple darken-4">Delete</button>
              <button data-target="modal2" class="update-btn btn modal-trigger purple darken-4">Update</button>
            </div>
          </div>
        </div>`
        str +=html
      })
      paginationDiv.style.display = 'block';
  }
//   heading.style.display = 'block';
  displayDiv.innerHTML = str;
}
// for preloading
preload();


// for ceating new package
addForm.addEventListener('submit',async (e)=>{
  e.preventDefault();
  const formValue = new FormData();
  const  title = addForm['title'].value;
 const tripImage = addForm.querySelector('input[type="file"]');
 const price = addForm['Price'].value;
 const  description=addForm['description'].value;
 const destination=addForm['destination'].value
  formValue.append("title",title);
  formValue.append("tripImage",tripImage.files[0]);
  formValue.append("price",price);
  formValue.append("destination",destination);
  formValue.append("description",description);
   
 const response = await fetch('http://localhost:3000/packages/add-package',{
     method:'POST',
     body: formValue,
     headers:{
        "Authorization": token
     }
     })
     if(response.status=== 201){
      location.reload();
     }
     else{
       console.log("add nhi hua");
     }
     
});
 
displayDiv.addEventListener('click',async (e)=>{
  e.preventDefault();
  if(e.target.className.includes('delete-btn')){
     const package_id = e.target.parentElement.id;
    const response = await fetch(`http://localhost:3000/packages/delete-package/${package_id}`,{
       method:'DELETE',
       headers:{
        "Authorization": token
       }
     });
     if(response.status=== 200){
       location.reload();
     }
     else{
       console.log('nhi hua');
     }
  }
  else{
    const package_id = e.target.parentElement.id;
    const resp = await fetch(`http://localhost:3000/packages/package/${package_id}`);
    const parsedresp = await resp.json();
    const array = parsedresp.package.destination.join(','); 
    updateForm['updatetitle'].value = parsedresp.package.Title;
    updateForm['updateprice'].value = parsedresp.package.price;
    updateForm['updatedestination'].value = array;
    updateForm['updatedescription'].value = parsedresp.package.description; 
    updateForm['hidden-field'].value = parsedresp.package._id;
  }
});
updateForm.addEventListener('submit',async (e)=>{
  e.preventDefault();
  const package_id = updateForm['hidden-field'].value;
  const formdata = new FormData();
  const file = updateForm.querySelector('input[type="file"]');
  // console.log(file.files[0]);
  formdata.append('title',updateForm['updatetitle'].value);
  formdata.append('price',updateForm['updateprice'].value);
  formdata.append('tripImage',file.files[0]);
  formdata.append('destination',updateForm['updatedestination'].value);
  formdata.append('description',updateForm['updatedescription'].value);
  const response = await fetch(`http://localhost:3000/packages/update-package/${package_id}`,{
    method:"PUT",
    body:formdata,
    headers:{
      "Authorization": token
     }
  });
  if(response.status=== 200 || response.status === 201){
    location.reload();
  }
  else{
    console.log('nhi hua');
  }
  
})
paginationDiv.addEventListener('click', async(e)=>{
  e.preventDefault();
  const leftArrow = paginationDiv.querySelector('#left-arrow');
  const RightArrow = paginationDiv.querySelector('#right-arrow');
  const lastPage = paginationDiv.querySelector('#lastpage').firstChild.textContent;
  paginationDiv.querySelector('.active').className = "";
  e.target.parentElement.className = "active";
  const page = parseInt(e.target.textContent);
  if(page>1 && page<lastPage){
    leftArrow.className="";
    RightArrow.className="";
  }
  else if(page=== 1){
    leftArrow.className = "disabled";
    RightArrow.className = "";
  }
  else if(page===parseInt(lastPage)){
    RightArrow.className = "disabled";
    leftArrow.className = ""
  }
 const response = await fetch(`http://localhost:3000/packages/all-packages?page=${page}`);
 const jsonResp = await response.json();
 cardDisplay(jsonResp.packages);
})
searchBar.addEventListener('submit', async function(e){
  e.preventDefault();
  
  const searchItem = searchBar['icon_prefix'].value;
  const selectPrice = searchBar['price-filter'].value;
  console.log(searchItem,selectPrice);
  if(selectPrice.includes('above')){
    console.log('above wale m agaya hai');
    const arr = selectPrice.split(' ');
    console.log(arr[1]);
    const response = await fetch('http://localhost:3000/packages/search-or-filter',{
      method:'POST',
      body:JSON.stringify({
        target:searchItem,
        min:Number(arr[1])
      }),
      headers:{
        'Content-Type':'application/json',
        'Authorization': token
      }
    });
    const parsedResponse = await response.json();
   cardDisplay(parsedResponse.result)
  }
  else{
    const arr = selectPrice.split('-');
    const data = {
      target:searchItem,
      min:Number(arr[0]),
       max:Number(arr[1])
    }
    const response = await fetch('http://localhost:3000/packages/search-or-filter',{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type':'application/json',
        'Authorization': token
      }
    });
    const parsedResponse = await response.json();
    console.log()
    cardDisplay(parsedResponse.result);
  }
  paginationDiv.style.display = "none";
//  const response = await fetch(`http://localhost:3000/packages/getsearch/${searchItem}`);
//  const parsedResponse = await response.json();
//  cardDisplay(parsedResponse.result);
//  paginationDiv.style.display = "none";
})

 







