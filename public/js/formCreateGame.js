const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const textarea = document.getElementById('description');
const selects = document.querySelectorAll('#formulario select');

const expresiones = {
    name: /^[a-zA-Z0-9À-ÿ\s]{5,40}$/,
    description: /^[a-zA-Z0-9À-ÿ\s]{20,500}$/,
    sku: /^[a-zA-Z0-9\_\-]{5,50}$/,
}

const validacion = {
    name: false,
    sku: false,
    description: false,
    price: false,
    discount: true,
    stock: false,
    platform: 0,
    genre: 0,
    country: false,
    sex: false
}

const validarCampos = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(campo).classList.remove('form--invalid');
        document.getElementById(campo).classList.add('form--valid');
        document.querySelector(`#group__${campo} .form__message`).classList.remove('form__message--visible');
        validacion[campo] = true;
    } else {
        document.getElementById(campo).classList.remove('form--valid');
        document.getElementById(campo).classList.add('form--invalid');
        document.querySelector(`#group__${campo} .form__message`).classList.add('form__message--visible');
        validacion[campo] = false;
    }
};

const validarRango = (input, campo, min = 0, max) => {
    if ((max !== undefined && input.value >= min && input.value <= max) || (!max && input.value >= min)) {
        document.getElementById(campo).classList.remove('form--invalid');
        document.getElementById(campo).classList.add('form--valid');
        document.querySelector(`#group__${campo} .form__message`).classList.remove('form__message--visible');
        validacion[campo] = true;
    } else {
        document.getElementById(campo).classList.remove('form--valid');
        document.getElementById(campo).classList.add('form--invalid');
        document.querySelector(`#group__${campo} .form__message`).classList.add('form__message--visible');
        validacion[campo] = false;
    }
}

const validarCheckbox = (input, campo) => {
    if (input.name === campo && input.checked) {
        validacion[campo] += 1;
    } else if (input.name === campo) {
        validacion[campo] -= 1;
    }
    if (validacion[campo] > 0) {
        document.querySelector(`#group__${campo} .form__message`).classList.remove('form__message--visible');
    } else {
        document.querySelector(`#group__${campo} .form__message`).classList.add('form__message--visible');
    }
};

const validarSelect = (select,campo) => {
    if(select.name === campo && select.value !== ''){
        document.querySelector(`#group__${campo} .form__message`).classList.remove('form__message--visible');
        validacion.country = true;
    } else {
        document.querySelector(`#group__${campo} .form__message`).classList.add('form__message--visible');
        validacion.country = false;
    }
}

const validarRadio = (radio,campo) => {
    if(radio.name === campo && radio.value){
        document.querySelector(`#group__${campo} .form__message`).classList.remove('form__message--visible');
        validacion.sex = true;
    } else {
        document.querySelector(`#group__${campo} .form__message`).classList.add('form__message--visible');
        validacion.country = false;
    }
}

const validarFormulario = e => {
    switch (e.target.name) {
        case 'name':
            validarCampos(expresiones.name, e.target, 'name');
            break;
        case 'sku':
            validarCampos(expresiones.sku, e.target, 'sku');
            break;
        case 'description':
            validarCampos(expresiones.description, textarea, 'description');
            break;
        case 'price':
            validarRango(e.target, 'price', 1);
            break;
        case 'discount':
            validarRango(e.target, 'discount', 0, 100);
            break;
        case 'stock':
            validarRango(e.target, 'stock', 0);
            break;
        case 'platform':
            validarCheckbox(e.target, 'platform');
            break;
        case 'genre':
            validarCheckbox(e.target, 'genre');
            break;
        case 'country':
            validarSelect(e.target,'country');
            break;
        case 'sex':
            validarRadio(e.target,'sex');
            break;
    }
}

inputs.forEach(input => {
    input.addEventListener('click', validarFormulario);
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('change', validarFormulario);
    // input.addEventListener('blur', validarFormulario);
});

selects.forEach(select => {
    select.addEventListener('click',validarFormulario);
    select.addEventListener('change',validarFormulario);
});

textarea.addEventListener('click', validarFormulario);
textarea.addEventListener('keyup', validarFormulario);
textarea.addEventListener('blur', validarFormulario);

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const { name, sku, description, price, discount, stock, platform, genre } = validacion;
    if (name && sku && description && price && discount && stock && platform > 0 && genre > 0) {
        document.querySelector('#formulario').submit();
    } else {
        for (const key in validacion) {
            if (isNaN(parseInt(validacion[key])) && validacion[key] === false) {
                document.querySelector(`#group__${key} .form__message`).classList.add('form__message--visible');
            } else if (!isNaN(parseInt(validacion[key])) && parseInt(validacion[key]) <= 0) {
                document.querySelector(`#group__${key} .form__message`).classList.add('form__message--visible');
            }
        }
    }
});