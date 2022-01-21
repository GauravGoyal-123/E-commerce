const likebtn = document.querySelectorAll(".like-button");

async function likefun(id,btn){
    try{
        const response = await axios({
            method: 'post',
            url: `/product/${id}/like`,
            headers: {'X-Requested-With': 'XMLHttpRequest'},       
        });
    
        console.log(response);
        if(btn.children[0].classList.contains('fas')){
            btn.children[0].classList.remove('fas');
            btn.children[0].classList.add('far');
        }
        else{
            btn.children[0].classList.add('fas');
            btn.children[0].classList.remove('far');
            
        }
    }
    
    catch(e){
        window.location.replace('/login');
        console.log(e.message);
    }
    
}


for(let btn of likebtn){
    btn.addEventListener('click',()=>{
        const id = btn.getAttribute('product-id');
        likefun(id,btn);
    })
}
