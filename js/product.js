import {agregarProducto} from './cart.js'
const catalogo = [
    {
        id:1,
        name:"Del Perro Beach(Clubhouse)",
        description:"7 Del Perro Beach.",
        price:1000000,
        image:"./img/ClubHouse(Bar)/1.webp",
        category:1
    },
    {
        id:2,
        name:"Downtown Vinewood(Clubhouse)",
        description:"2214 Clinton Avenue.",
        price:1000000,
        image:"./img/ClubHouse(Bar)/2.webp",
        category:1
    },
    {
        id:3,
        name:"Grapeseed(Clubhouse)",
        description:"2111 East Joshua Road.",
        price:1000000,
        image:"./img/ClubHouse(Bar)/3.webp",
        category:1
    },

    {
        id:4,
        name:"Del Perro (Nightclub)",
        description:"2311 Red Desert Avenue.",
        price:1000000,
        image:"./img/logosueltomazebank.png",
        category:2
    },
    
    {
        id:5,
        name:" Vespucci Canals(Nightclub)",
        description:"2561 Vespucci Canals.",
        price:1000000,
        image:"./img/logosueltomazebank.png",
        category:2
    },
    
    {
        id:6,
        name:" Cypress Flats(Nightclub)",
        description:"312 El Rancho Blvd.",
        price:1000000,
        image:"./img/logosueltomazebank.png",
        category:2
    },

    {
        id:7,
        name:" Warehouse Davis(Arcade)",
        description:"712 Davis Avenue.",
        price:1000000,
        image:"./img/logosueltomazebank.png",
        category:3
    },

    {
        id:8,
        name:" Videogeddon La Mesa(Arcade)",
        description:" 984 Popular Street.",
        price:1000000,
        image:"./img/logosueltomazebank.png",
        category:3
    },

    {
        id:9,
        name:" Insert Coin - Rockford Hills(Arcade)",
        description:" 119 Morningwood Blvd.",
        price:1000000,
        image:"./img/logosueltomazebank.png",
        category:3
    },

]

const getAll = (category=null) => !category ? Array.from(catalogo) : Array.from(catalogo).filter((p) => p.category == category)

const getOne = (id=1) => Array.from(catalogo).find((p) => p.id == id)

const templateOne = (producto={}) => {
    const {id,name,description,price,image,category} = producto
    const element = document.createElement('li')
    element.setAttribute('data-category',category)
    element.setAttribute('data-id',id)
    const format = ({ currency, value}) =>  {
        const formatter = new Intl.NumberFormat('es-ES', {
          style: 'currency',
          minimumFractionDigits: 2,
          currency
        }) 
        return formatter.format(value)
      }
    const formatPrice = format({currency:"ARS",value:price})
    element.innerHTML = `
        <picture><img src="${image}" alt="Imagen del ${name}"></picture>
        <dl>
            <dt>${name}</dt>
            <dd>${description}</dd>
            <dd>${formatPrice}</dd>
        </dl>
    `
    element.addEventListener('click',(e) => {
        e.preventDefault()
        e.stopPropagation()
        const target = e.target.closest('li')
        const {id} = target.dataset
        return agregarProducto(getOne(Number(id)))
    })
    return element
}

export {getAll,getOne,templateOne}