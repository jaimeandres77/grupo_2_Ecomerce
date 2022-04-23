const disminuir = document.querySelector('.disminuir');
const aumentar = document.querySelector('.aumentar');
const data = document.querySelector('#data');
const game = data.value.split('/');
let amount = Number(game[2]);

const changeButton = (e) => {
    const stock = Number(game[1]);
    const parent = e.target.parentElement;
    const input = parent.querySelector('input');
    if(e.target.classList.contains('disminuir') && amount > 1){
        amount -= 1
    } else if(e.target.classList.contains('aumentar') && amount < stock){
        amount += 1
    }
    input.value = amount;
    input.setAttribute('value',amount);
}

disminuir.addEventListener('click',changeButton);
aumentar.addEventListener('click',changeButton);