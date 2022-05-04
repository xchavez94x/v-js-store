import elements from "./elements.mjs";
let cart = []

const menuHandler = (e) => {
    const { mobileMenu, backdrop, cartElement } = elements;
    switch(e.target.id) {
        case('burger_menu'): {
            mobileMenu.classList.toggle('show_mobile_menu');
            backdrop.classList.add('showBackdrop');
            break;
        }
        case ('backdrop'): {
            mobileMenu.classList.remove('show_mobile_menu');
            backdrop.classList.remove('showBackdrop');
            cartElement.classList.remove('cart')
            break;
        }
        default: return 
    }
}

const fetchData = async () => {
    let fetchedData;
    try {
        let response = await fetch('https://fakestoreapi.com/products');
        fetchedData = await response.json();

    } catch(error) {
        console.log(error)
    }  
    console.log(fetchedData)
    return [ fetchedData ] 
}

const addToCart = async (e, products) => {
    const prodId = +e.target.dataset.productid;
    const existingProductIndex = products.findIndex(product => product.id === prodId);
    const singleProduct = products[existingProductIndex];

    if(cart[existingProductIndex]) {
        console.log(cart)
        let newQuantity = cart[existingProductIndex].quantity;
        newQuantity++
        cart[existingProductIndex].quantity = newQuantity
    } else {
        const copiedCart = [...cart]
        copiedCart.push({
            title: singleProduct.title,
            price: singleProduct.price,
            quantity: 1,
        })

        cart = copiedCart
        console.log(cart)
    }
    const jsonedCart = JSON.stringify(cart)
    sessionStorage.setItem('cart', jsonedCart)
}

const renderLoading = (cont) => {
    cont.innerHTML = '<h2>Loading...</h2>'
}


const renderCards = async () => {
    let { container } = elements
    const [fetchedData ]= await fetchData();
    if(fetchedData !== null) {
        fetchedData.forEach( card => {
            let cardView =  `
                <div class="card">
                    <img class="card_image" src="${card.image}" alt="">
                    <h2 class="card_title">${card.title}</h2>
                    <p class="card_description">
                        ${card.description}
                    </p>
                    <h3 class="card_price">\$${card.price}</h3>
                    <div class="card_actions">
                        <a href="#">Check the product</a>
                        <button class="add_to_cart" data-productid="${card.id}">Add to Cart</button>
                    </div>
                </div>
            `
            container.innerHTML += cardView;
            
        })
        const addToCartButtons = document.querySelectorAll('.add_to_cart');
        addToCartButtons.forEach(button => button.addEventListener('click', (e) => {
            e.stopPropagation()
            addToCart( e, fetchedData )
        }))
    } else {
        renderLoading(container)
    }
    
}

const renderCart = (e) => {
    const { app, backdrop } = elements
    const cartElement = document.createElement('div');
    cartElement.classList.add('cart')
    cartElement.innerHTML += "<button class='hide_cart' >X</button>"
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    cart.forEach(item => {
        const itemEl = `
            <ul>
                <li>
                    ${item.title}
                </li>
                <li>
                    ${item.price}
                </li>
                <li>
                    ${item.quantity}
                </li>
            </ul>
        `
        cartElement.innerHTML += itemEl
    })
    backdrop.classList.add('showBackdrop')
    app.appendChild(cartElement)
    const cartButtonRem = document.querySelector('.hide_cart');
    cartButtonRem.addEventListener('click', () => {
        backdrop.classList.remove('showBackdrop')
        app.removeChild(cartElement)
    })
}


const checkPage = async () => {
    if(location.pathname === '/index.html')  {
        await renderCards();
    }
}

const functions = {
    menuHandler: menuHandler,
    checkPage: checkPage,
    renderLoading: renderLoading,
    renderCart: renderCart
};

export default functions