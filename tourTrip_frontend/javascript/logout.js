const logoutBtn = document.getElementById('admin-logout-btn');

logoutBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    window.localStorage.removeItem('admin');
    window.location.replace('../html/index.html');
})