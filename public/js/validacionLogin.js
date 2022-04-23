const login = document.getElementById('login');
const inputs = document.querySelectorAll('#login input');

const validarCuenta = {
    correo: /^.{4,45}$/,
    password:/^.{4,12}$/,
}

const campos = {
    email: false,
    password: false,
}

const validacionCampo = (validar, input,campo) => {
    if(validar.test(input.value)){
        document.getElementById (`login-${campo}`).classList.remove('login__grupo-incorrecto');
        document.getElementById (`login-${campo}`).classList.add('login__grupo-correcto');
        document.querySelector(`#login-${campo} .form-control-error`).classList.remove('form-control-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById (`login-${campo}`).classList.add('login__grupo-incorrecto');
        document.getElementById (`login-${campo}`).classList.remove('login__grupo-correcto');
        document.querySelector(`#login-${campo} .form-control-error`).classList.add('form-control-error-activo');
        campos[campo] = false;
    }
}

const validarlogin = (e) =>{
    switch (e.target.name) {
        case "email":
            validacionCampo(validarCuenta.correo, e.target, 'email');
        break;
        case "password":
            validacionCampo(validarCuenta.password, e.target, 'password');
        break;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup',validarlogin );
    input.addEventListener('change',validarlogin );
    input.addEventListener('blur',validarlogin );
    input.addEventListener('click',validarlogin );
});

login.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos.email && campos.password) {
        document.querySelector('#login').submit();
        login.reset();
    } else {
        for (const key in campos) {
            if(campos[key] === false){
                document.querySelector(`#login-${key} .form-control-error`).classList.add('form-control-error-activo');
            }
        }
    }
});