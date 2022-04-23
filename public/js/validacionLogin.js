const login = document.getElementById('login');
const inputs = document.querySelectorAll('#login input');

const validarCuenta = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
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
        case "password":
        console.log('funciona');
        break;
    }
}


inputs.forEach((input) => {
    input.addEventListener('Keyup',validarlogin );
    input.addEventListener('blur',validarlogin );
    });
    
    


login.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const recordar = document.getElementById('login-recordar');

    if(campos.email && campos.password && recordar.checked ) {
        login.reset();
    }
});