
import elements from "./elements.mjs";
import functions from "./functions.mjs";

const { app, menuButton, backdrop , checkCartBtn} = elements;
const { menuHandler, checkPage, renderCart } = functions;

app.addEventListener('click', menuHandler);
window.addEventListener('DOMContentLoaded', () => {
    checkPage()
})

checkCartBtn.addEventListener('click', renderCart)