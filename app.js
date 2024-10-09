import {getAll,templateOne} from './js/product.js'
import {renderCart} from './js/cart.js'
const btnMenu = document.querySelector('#btn-menu')
const btnCart = document.querySelector('#btn-cart')
const menuMobile = document.querySelector('#mobile-menu')
const cart = document.querySelector('#cart')

btnMenu.addEventListener('click',() => {
    const isActive = menuMobile.classList.contains('active')
    if(isActive){
        menuMobile.classList.remove('active')
        cart.classList.remove('active')
    }else{
        cart.classList.remove('active')
        menuMobile.classList.add('active')
    }
})

btnCart.addEventListener('click',() => {
    const isActive = cart.classList.contains('active')
    if(isActive){
        menuMobile.classList.remove('active')
        cart.classList.remove('active')
    }else{
        menuMobile.classList.remove('active')
        cart.classList.add('active')
    }
})

const productList = document.querySelector("#products ul")
const categories = document.querySelectorAll("#products form label")

productList.innerHTML = ""
getAll().forEach((product) => productList.appendChild(templateOne(product)))

categories.forEach(category => category.addEventListener('click',(e) => {
    e.preventDefault();
    let target = e.target.getAttribute("for")
    const input = document.querySelector(`input[type="radio"]#${target}`)
    input.checked=true
    productList.innerHTML = ""
    if(target== 'category-0'){
       return getAll().forEach((product) => productList.appendChild(templateOne(product)))
    }
    let current = Number(target.split("-")[1])
    return getAll(current).forEach((product) => productList.appendChild(templateOne(product)))
}))

renderCart()


/* Formulario de Contact */

const formContact = document.querySelector("#contact form")
const inputName = document.querySelector("#name")
const inputLastName = document.querySelector("#last_name")
const inputAge = document.querySelector("#age")
const inputEmail = document.querySelector("#email")

const validateName = () => {
    let isValid = false
    let value = String(inputName.value).trim()
    if(value.length > 2 ){
        isValid = true
    }
    const errorCurrent = inputName.parentElement.querySelector('span')
    if(!isValid){
        errorCurrent.classList.remove('success')
        errorCurrent.classList.remove('error')
        errorCurrent.classList.add('error')
        errorCurrent.innerHTML = "completa la informacion"
    }else{
        errorCurrent.classList.remove('success')
        errorCurrent.classList.remove('error')
        errorCurrent.classList.add('success')
        errorCurrent.innerHTML = "Información Correcta"
    }
    return isValid
}

const validateLastName = () => {
    let isValid = false
    let value = String(inputLastName.value).trim()
    if(value.length > 2 ){
        isValid = true
    }
    const errorCurrent = inputLastName.parentElement.querySelector('span')
    
    if(!isValid){
        errorCurrent.classList.remove('success')
        errorCurrent.classList.remove('error')
        errorCurrent.classList.add('error')
        errorCurrent.innerHTML = "Completa la información"
    }else{
        errorCurrent.classList.remove('success')
        errorCurrent.classList.remove('error')
        errorCurrent.classList.add('success')
        errorCurrent.innerHTML = "Información Correcta"
    }
    return isValid
}

const validateAge = () => {
    let isValid = false
    let value = inputAge.value

    if(String(value).trim().length > 0 && Number(value) >= 18){
        isValid = true
    }

    const errorCurrent = inputAge.parentElement.querySelector('span')
 
    if(!isValid){
        errorCurrent.classList.remove('success')
        errorCurrent.classList.remove('error')
        errorCurrent.classList.add('error')
        errorCurrent.innerHTML = "Completa la información o tienes que ser mayor de edad"
    }else{
        errorCurrent.classList.remove('success')
        errorCurrent.classList.remove('error')
        errorCurrent.classList.add('success')
        errorCurrent.innerHTML = "Información Correcta"
    }
    return isValid
}

const validateEmail = () => {
    let isValid = false
    let value = String(inputEmail.value).trim()
    const regex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(value.length > 0  && regex.test(value) ){
        isValid = true
    }

    const errorCurrent = inputEmail.parentElement.querySelector('span')
  
    if(!isValid){
        errorCurrent.classList.remove('success')
        errorCurrent.classList.remove('error')
        errorCurrent.classList.add('error')
        errorCurrent.innerHTML = "Completa la información o verifica el formato de tu correo"
    }else{
        errorCurrent.classList.remove('success')
        errorCurrent.classList.remove('error')
        errorCurrent.classList.add('success')
        errorCurrent.innerHTML = "Información Correcta"
    }
    return isValid
}

formContact.addEventListener('submit',(e) => {
    e.preventDefault()
    let isValid = false
    validateName()
    validateLastName()
    validateAge() 
    validateEmail()
    if(validateName() && validateLastName() && validateAge() && validateEmail()){
        isValid = true
    };
    if(isValid){
        document.querySelectorAll('#contact form fieldset span').forEach((msg) => {
            msg.innerHTML = "";
            msg.classList.remove('success');
            msg.classList.remove('error');
        });
        formContact.reset();
        return alert('Formulario Enviado')
    }
    return alert('Formulario Incorrecto')
})

inputName.addEventListener('input',validateName)
inputLastName.addEventListener('input',validateLastName)
inputAge.addEventListener('input',validateAge)
inputEmail.addEventListener('input',validateEmail)

