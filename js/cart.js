import {getOne} from './product.js'

let cart = JSON.parse(localStorage.getItem('carrito')) || []

const agregarProducto = (product={}) => {
    if(cart.length == 0){
        cart.push({product,quantity:1})
        localStorage.setItem('carrito',JSON.stringify(cart))
        return renderCart()
    }
    let exist = cart.some((item) => item.product.id == product.id)
    if(!exist){
        cart.push({product,quantity:1})
        localStorage.setItem('carrito',JSON.stringify(cart))
        return renderCart()
    }
    cart = cart.map((item) => {
        if(item.product.id == product.id){
            item.quantity += 1      
        }
        return item
    })
    localStorage.setItem('carrito',JSON.stringify(cart))
    return renderCart()
}

const templateItem = ({product,quantity}) => {
    const {id,name,description,price,image,category} = product
    const element = document.createElement('li')
    element.setAttribute('data-category',category)
    element.setAttribute('data-id',id)
    const format = ({ currency, value}) =>  {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          minimumFractionDigits: 2,
          currency
        }) 
        return formatter.format(value)
      }
      const priceFormat = format({currency:"USD",value:price * quantity})
    element.innerHTML = `
        <picture><img src="${image}" alt="Imagen del ${name}"></picture>
        <dl>
            <dt>${name}</dt>
            <dd>${description}</dd>
            <dd>${priceFormat}</dd>
        </dl>
    `
    const fieldset = document.createElement('fieldset')
    const btnAdd = document.createElement('button')
    const btnMin = document.createElement('button')
    const output = document.createElement('button')
    btnAdd.setAttribute('type','button');
    btnAdd.innerText = "+"
    btnMin.setAttribute('type','button');
    btnMin.innerText = "-"
    output.innerText = quantity
    btnAdd.addEventListener('click',(e) => {
        let cart = JSON.parse(localStorage.getItem('carrito'))
        const current = e.target.closest("li")
        const {id} =current.dataset 
        const product = getOne(Number(id)) 
        cart = cart.map((item) => {
            if(item.product.id == product.id){
                item.quantity += 1      
            }
            return item
        })
        localStorage.setItem('carrito',JSON.stringify(cart))
        return renderCart()
    })
    btnMin.addEventListener('click',(e) => {
        let cart = JSON.parse(localStorage.getItem('carrito'))
        const current = e.target.closest("li")
        const {id} =current.dataset 
        const product = getOne(Number(id)) 
        cart = cart.map((item) => {
            if(item.product.id == product.id){
                item.quantity -= 1      
            }
            return item
        }).filter(({quantity}) => quantity > 0)
        localStorage.setItem('carrito',JSON.stringify(cart))
        return renderCart()
    })
    fieldset.append(btnMin,output,btnAdd)
    element.appendChild(fieldset)
    return element
}

const renderCart = () => {
    const cart = JSON.parse(localStorage.getItem('carrito')) || []
    const cartElement = document.querySelector('#cart')
    cartElement.innerHTML=""
    if(cart.length == 0){
        cartElement.innerHTML = `<li class="empty">No hay productos</li>`
    }
    cart.sort((a,b) => a.id < b.id).forEach(item =>cartElement.appendChild(templateItem(item)));
}

export {agregarProducto,renderCart}