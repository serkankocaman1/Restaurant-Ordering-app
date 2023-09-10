import { menuArray } from "./data.js"

const menuEl = document.querySelector(".menu")
const cartContainerEl = document.querySelector(".cart__container")
const cartTotalEl = document.querySelector(".cart-total .price span")
const cartEl = document.querySelector(".cart")
const cardEl = document.querySelector(".card")
const completOrder = document.querySelector(".completed")


localStorage.clear()

menuList()


const setCartProduct = e => {
    let cart = ""
    let price = 0
    const keys = Object.keys(localStorage)
    const productArr = keys.map(key => JSON.parse(localStorage.getItem(key)))
    productArr.forEach(product => {
        cart += `<div class="cart-text">
        <h3 class="food-name">${product.name}</h3>
        <p class="amount">x${product.amount}</p>
        <button class="cart-remove" data-id="${product.id}">remove</button>
        <p class="price">$${product.price}</p>
        </div>`
        price += (product.price * product.amount)
    })
    if(localStorage.length == 0){
        cartEl.style.display = "none";
    }else{
        cartEl.style.display = "flex";
    }
    cartTotalEl.textContent =`${price}`
    cartContainerEl.innerHTML = cart
}


addEventListener("click", e => {
    const elementId = e.target.dataset.id
    if (elementId) {
        let amount = 1
        const item = JSON.parse(localStorage.getItem(elementId))
            if(e.target.classList.contains('cart-remove')){
                const currentAmount = item.amount - 1
                amount = currentAmount
                if(currentAmount < 1){
                    localStorage.removeItem(elementId)
                }else{
                    const myProduct = { ...menuArray[elementId], amount: amount }
                    localStorage.setItem(elementId, JSON.stringify(myProduct))
                }
            }else if(e.target.classList.contains('cart__add-button')){
                completOrder.classList.add("visible")
                if(localStorage.getItem(elementId)){
                    const currentAmount = item.amount + 1
                    amount = currentAmount
                }
                const myProduct = { ...menuArray[elementId], amount: amount }
                localStorage.setItem(elementId, JSON.stringify(myProduct))
            }
        setCartProduct()
    }
    if(e.target.classList.contains('cart-order')){
        cardEl.classList.remove("visible")
    }else if(e.target.classList.contains('pay-button')){
        const cardName = document.getElementById("card-name")
        cardEl.classList.add("visible")
        cartEl.style.display = "none";
        completOrder.classList.remove("visible")
        if (cardName) {
            localStorage.clear()
            completOrder.innerHTML = `
            <div class="completed__container">
            <h3>Thanks,${cardName.value}! Your order is on its way!</h3>
            </div>`
          } else {
            console.log('input is falsy');
          }
    }
})

function menuList() {
    let menu = ""

    menuArray.forEach(element => {
        menu += `
        <section class="menu__item">
            <div class="menu__container">
                <p class="food-emoji">${element.emoji}</p>
                <div class="food-text">
                    <h3 class="food-name">${element.name}</h3>
                    <p class="food-contents">${element.ingredients}</p>
                    <p class="price">$${element.price}</p>
                </div>
                <button data-id="${element.id}" class="cart__add-button">+</button>
            </div>
        </section>
        `
    });
    menuEl.innerHTML = menu
}