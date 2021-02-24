const displayDiv = document.querySelector('.row');
const token = window.localStorage.getItem('user');

window.addEventListener('DOMContentLoaded',async (e)=>{
    console.log(token);
    if(token){
        const response= await fetch('http://localhost:3000/auth/user-verify?pr=check',{
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

async function load(){
    const response = await fetch('http://localhost:3000/purchase/all-purchases',{
        headers:{
            'Authorization':token
        }
    })
    const parsed = await response.json();
    displayCard(parsed.result);
}

load();

function displayCard(data){
    var str = '';
    var htnl = '';
    if(!(data.length>0)){
        str = 'No Purchases Yet!!'
    }
    else{
       data.forEach(each=>{
          html=`<div class="col s12 m12 ">
          <div class="card horizontal ">
            <div class="card-stacked">
              <div class="card-content card-style white-text">
                  <h5 class="center">${each.package_id.Title}</h5>
               <div class="textual-display">
                   <div class="div1" >
                      <span><span class="bold">Price: </span>${each.package_id.price} PKR</span>
                      <br>
                      <span>
                          <span class="bold">
                              destination:
                          </span>
                          ${each.package_id.destination.map(dest=>`<li>${dest}</li>`).join(" ")}
                         </span>
                   </div>
                   <div class="div2" >
                      <div > 
                          <span class="right "><span class="bold" >Customer Name:</span>${each.Name}</span>
                      <br>
                        <span class="right "><span class="bold"  >Customer Contact Number:</span>${each.ContactNumber}</span>
                      <br>
                        <span class="right "><span class="bold"  >Customer Address:</span>${each.Address}</span> 
                        <br> 
                        <span class="right "><span class="bold"  >Purchase Date: </span>${each.purchaseDate}</span> 
                        <br>   
                      </div> 
                   </div>
               </div>
              </div>
            </div>
          </div>
      </div>`;
      str+=html;
       })
       displayDiv.innerHTML = str
    }
}