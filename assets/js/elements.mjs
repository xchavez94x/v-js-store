const menuButton = document.querySelector('#burger_menu')
const mobileMenu = document.querySelector('.mobile_menu')
const backdrop = document.querySelector('.backdrop');
const app = document.querySelector('.app');
const container = document.querySelector('.container');
const addToCartButton = document.querySelector('.add_to_cart');
const checkCartButton = document.querySelector('#cart_button');
const cartElement = document.querySelector('.cart');

const elements =  {
    app: app,
    container: container,
    menuButton: menuButton,
    mobileMenu: mobileMenu,
    backdrop: backdrop,
    addToCartButton: addToCartButton,
    checkCartBtn: checkCartButton,
    cartElement: cartElement
}

export default elements