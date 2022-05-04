import elements from "./elements.mjs";
let cart = []

const menuHandler = (e) => {
    const { mobileMenu, backdrop } = elements;
    renderCart()
    switch(e.target.id) {
        case('burger_menu'): {
            mobileMenu.classList.toggle('show_mobile_menu');
            backdrop.classList.add('showBackdrop');
            break;
        }
        case ('backdrop'): {
            mobileMenu.classList.remove('show_mobile_menu');
            backdrop.classList.remove('showBackdrop');
            break;
        }
        default: return 
    }
}

const fetchData = async () => {
    let isLoading = true;
    let fetchedData;
    try {
        let response = await fetch('https://fakestoreapi.com/products');
        fetchedData = await response.json();
        isLoading = false

    } catch(error) {
        console.log(error)
    }  
    console.log(fetchedData)
    return [ fetchedData, isLoading ] 
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
        return cart
    }
    return cart
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
        addToCartButtons.forEach(button => button.addEventListener('click', (e) => addToCart( e, fetchedData )))
    } else {
        renderLoading(container)
    }
    
}

const renderCart = () => {
    console.log(cart)
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