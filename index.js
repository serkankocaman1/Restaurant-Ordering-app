import { menuArray } from "./data.js"

const menuEl = document.querySelector(".menu")
const cartEl = document.querySelector(".cart__container")
const cartTotalEl = document.querySelector(".cart-total .price span")

localStorage.clear()

menuList()

let totalPrice = [0]



const setCartProduct = e => {
    let cart = ""
    const keys = Object.keys(localStorage)
    const productArr = keys.map(key => JSON.parse(localStorage.getItem(key)))
    productArr.forEach(product => {
        cart += `<div class="cart-text">
        <h3 class="food-name">${product.name}</h3>
        <p class="amount">x${product.amount}</p>
        <button class="cart-remove" data-id="${product.id}">remove</button>
        <p class="price">$${product.price}</p>
        </div>`
        console.log(product.name + " : " +product.amount)
    })
    cartTotalEl.textContent =`${e}`
    cartEl.innerHTML = cart
}


addEventListener("click", e => {
    const elementId = e.target.dataset.id
    if (elementId) {
        let price = 0
        let amount = 1
            if(e.target.classList.contains('cart-remove')){
                const currentAmount = JSON.parse(localStorage.getItem(elementId)).amount - 1
                amount = currentAmount    
                const item = JSON.parse(localStorage.getItem(elementId))
                price += 0 - item.price
            }else if(e.target.classList.contains('cart__add-button')){
                if(localStorage.getItem(elementId)){
                    const currentAmount = JSON.parse(localStorage.getItem(elementId)).amount + 1
                    amount = currentAmount
                    const item = JSON.parse(localStorage.getItem(elementId))
                    price += item.price
                }else{
                    const currentAmount = 1
                    amount = currentAmount
                    const myProduct = { ...menuArray[elementId], amount: amount }
                    localStorage.setItem(elementId, JSON.stringify(myProduct))
                    const item = JSON.parse(localStorage.getItem(elementId))
                    price += item.price
                }
                
            }
        const myProduct = { ...menuArray[elementId], amount: amount }
        localStorage.setItem(elementId, JSON.stringify(myProduct))
        totalPrice.push(price)
        const currentTotalPrice = totalPrice.reduce((total, currentItem) =>{
            console.log(total)
            return total + currentItem
        })
        setCartProduct(currentTotalPrice)
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