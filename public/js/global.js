// Header total de la compra
const sale = document.querySelector('.nav__shopping');
const totalPrecio = sessionStorage.getItem('total');
if(totalPrecio){
    sale.innerHTML = `${sessionStorage.getItem('total')} <i class="fas fa-shopping-cart"></i>`;
}