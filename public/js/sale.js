const info = document.querySelector('#info');
localStorage.setItem('info',info.value);

const disminuir = document.querySelectorAll('.disminuir');
const aumentar = document.querySelectorAll('.aumentar');
const games = JSON.parse(info.value);

const getTotal = () => {
    const total = document.querySelector('.shoppingCard__total--price');
    let getTotal = 0;
    games.forEach(game => {
        getTotal += game.amount * game.price;
    });
    total.innerText = `$ ${getTotal}`;
    document.querySelector('input[name=data]').value = getTotal;
    document.querySelector('input[name=data]').setAttribute('value',getTotal);
    document.querySelector('.nav__shopping').innerHTML = `$ ${getTotal} <i class="fas fa-shopping-cart"></i>`;
}

getTotal();

const actionButton = e => {
    const el = e.target.parentElement.parentElement;
    const id = el.querySelector('input');
    if(e.target.classList.contains('disminuir') && games[id.name].amount > 1){
        games[id.name].amount -= 1;
    } else if(e.target.classList.contains('aumentar') && games[id.name].stock > games[id.name].amount){
        games[id.name].amount += 1;
    }
    id.value = games[id.name].amount;
    id.setAttribute('value',games[id.name].amount);
    el.querySelector('.product__header--price').innerText = `$ ${games[id.name].amount * games[id.name].price}`;
    info.setAttribute('value',JSON.stringify(games));
    getTotal();
}

disminuir.forEach(dis => {
    dis.addEventListener('click',actionButton);
});

aumentar.forEach(aum => {
    aum.addEventListener('click',actionButton);
});