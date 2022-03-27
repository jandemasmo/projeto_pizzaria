let cart = [];
let modalQt = 1;
let modalKey = 0;
const c = (element) => document.querySelector(element)
const cs = (element) => document.querySelectorAll(element)

//Eventos relacionadas a listagem de pizza e itens do modal
pizzaJson.map((item, index)=>{
    let pizzaItem = c(".models .pizza-item").cloneNode(true);

    pizzaItem.setAttribute("data-key", index);
    pizzaItem.querySelector(".pizza-item--img img").src = item.img;
    pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

    pizzaItem.querySelector(".pizza-item a").addEventListener("click", (event) =>{
        event.preventDefault()
        let key = event.target.closest(".pizza-item").getAttribute("data-key"); //atrvés do closest pegamos o elemento mais proximo do pizza-item
        modalQt = 1;
        modalKey = key; //salvando a key da pizza que foi selecionada

        c(".pizzaBig img").src = pizzaJson[key].img;
        c(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
        c(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;
        c(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c(".pizzaInfo--size.selected").classList.remove("selected");
        cs(".pizzaInfo--size").forEach(function(size, sizeIndex){
            if(sizeIndex == "2"){
                size.classList.add("selected")
            }
            size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
        })

        c(".pizzaInfo--qt").innerHTML = modalQt;
        c(".pizzaWindowArea").style.opacity = 0;
        c(".pizzaWindowArea").style.display = "flex";
        setTimeout(() =>{
            c(".pizzaWindowArea").style.opacity = 1;
        }, 200)
    });

    c(".pizza-area").append(pizzaItem)
})

//----------eventos do modal------------
//fechando modal
function closeModal(){
    c(".pizzaWindowArea").style.opacity = 0;
    setTimeout(() =>{
        c(".pizzaWindowArea").style.display = "none";
    }, 200)
}
cs(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach(function(item){
    item.addEventListener("click", closeModal)
})
//diminuindo e aumentando quantidades
c(".pizzaInfo--qtmenos").addEventListener("click", function(){
    if(modalQt > 1){
        modalQt--
        c(".pizzaInfo--qt").innerHTML = modalQt;
    }  
})

c(".pizzaInfo--qtmais").addEventListener("click", function(){
    modalQt++
    c(".pizzaInfo--qt").innerHTML = modalQt;
})
//variando tamanhos
cs(".pizzaInfo--size").forEach(function(size){
    size.addEventListener("click", function(){
        c(".pizzaInfo--size.selected").classList.remove("selected");
        size.classList.add("selected")
    })
})


//adicionando ao carrinho--------------
    /*
    qual a pizza ???
    qual o tamanho que está selecionado???
    quantas pizzas serão adicionadas???++++++
    */
c(".pizzaInfo--addButton").addEventListener("click", function(){
    let size = parseInt(c(".pizzaInfo--size.selected").getAttribute("data-key"))
    let identifier = pizzaJson[modalKey].id + "@" + size
    let key = cart.findIndex(item => item.identifier == identifier); //buscando identificador no array cart
    if(key > -1){
        cart[key].qt += modalQt
    }else{
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        })
    }
    updateCart()
    closeModal()
})

//carrinho mobile
c(".menu-openner").addEventListener("click", function(){
    if(cart.length > 0){
        c("aside").style.left = "0";
    }
})
c(".menu-closer").addEventListener("click", function(){
    c("aside").style.left = "100vw";
})

//atualizando carrinho --------------
function updateCart(){
    c(".menu-openner span").innerHTML = cart.length;
    if(cart.length > 0){
        c("aside").classList.add("show");
        c(".cart").innerHTML = "";

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find( item => item.id == cart[i].id)
            subtotal += pizzaItem.price * cart[i].qt    
            let cartItem = c(".models .cart--item").cloneNode("true");
            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = "P"
                    break
                case 1:
                    pizzaSizeName = "M"
                    break
                case 2:
                    pizzaSizeName = "G"
                    break
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector("img").src = pizzaItem.img;
            cartItem.querySelector(".cart--item-nome").innerHTML = pizzaName;
            cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].qt;
            cartItem.querySelector(".cart--item-qtmenos").addEventListener("click", function(item){
                if(cart[i].qt > 1){
                    cart[i].qt--
                }else{
                    cart.splice(i, 1) //caso o item seja menos que 1 automáticamente será removido do carrinho
                }
                updateCart()
            })
            cartItem.querySelector(".cart--item-qtmais").addEventListener("click", function(item){
                cart[i].qt++
                updateCart()
            })
            c(".cart").append(cartItem);
        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        c(".subtotal span:last-child").innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c(".desconto span:last-child").innerHTML = `R$ ${desconto.toFixed(2)}`;
        c(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`;
    }else{
        c("aside").classList.remove("show");
        c("aside").style.left = "100vw";
    }
}