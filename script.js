const c = (element) => document.querySelector(element)
const cs = (element) => document.querySelectorAll(element)


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
        c(".pizzaBig img").src = pizzaJson[key].img;
        c(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
        c(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;

        c(".pizzaWindowArea").style.opacity = 0;
        c(".pizzaWindowArea").style.display = "flex";
        setTimeout(() =>{
            c(".pizzaWindowArea").style.opacity = 1;
        }, 200)
    });

    c(".pizza-area").append(pizzaItem)
})