
const authModeInput = document.getElementById('auth-mode');
const authTitle = document.getElementById('auth-title');
const authSubtitle = document.getElementById('auth-subtitle');
const btnAuthSubmit = document.getElementById('btn-auth-submit');
const toggleText = document.getElementById('toggle-text');

const registerFields = document.getElementById('register-fields');
const confirmPasswordField = document.getElementById('confirmar-contrasena-field');
const errorMsg = document.getElementById('error-msg');

const usuarioInput = document.getElementById('mail-usuario');
const nombreInput = document.getElementById('txt-nombre');
const apellidoInput = document.getElementById('txt-apellido');
const generoInput = document.querySelectorAll('input[name="genero"]');
const passwordInput = document.getElementById('contrasena-usuario');
const birthdateInput = document.getElementById('date-nacimiento');
const confirmPasswordInput = document.getElementById('confirmar-contrasena');

// ==========================================
//  NUEVO: DETECTAR REGISTRO TRAS RECARGAR
// ==========================================
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('registrado') === 'true') {
    const correoRegistrado = urlParams.get('correo');
    if (correoRegistrado) {
        usuarioInput.value = decodeURIComponent(correoRegistrado);
    }
    // Asegurar que inicie en modo login con los campos ocultos
    authModeInput.value = 'login';
    registerFields.style.display = 'none';
    confirmPasswordField.style.display = 'none';
    
    // Limpiar los parámetros de la URL para que no se quede ahí el correo si vuelven a recargar
    window.history.replaceState({}, document.title, window.location.pathname);
}

// 1. ALTERNAR MODOS (LOGIN / REGISTRO)
document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'btn-toggle-auth') {
        e.preventDefault();
        errorMsg.style.display = 'none';

        if (authModeInput.value === 'login') {
            authModeInput.value = 'registro';
            authTitle.textContent = 'Crear Cuenta';
            authSubtitle.textContent = 'Completa tus datos de registro';
            btnAuthSubmit.textContent = 'Registrarse';

            registerFields.style.display = 'block';
            confirmPasswordField.style.display = 'block';
            nombreInput.required = true;
            apellidoInput.required = true;
            generoInput.forEach(radio => radio.required = true);
            birthdateInput.required = true;
            confirmPasswordInput.required = true;

            toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="btn-toggle-auth">Inicia sesión aquí</a>';
        } else {
            authModeInput.value = 'login';
            authTitle.textContent = 'Street Side';
            authSubtitle.textContent = 'Ingresa tus credenciales de acceso';
            btnAuthSubmit.textContent = 'Iniciar sesión';

            registerFields.style.display = 'none';
            confirmPasswordField.style.display = 'none';
            nombreInput.required = false;
            apellidoInput.required = false;
            generoInput.forEach(radio => radio.required = false);
            birthdateInput.required = false;
            confirmPasswordInput.required = false;

            toggleText.innerHTML = '¿No tienes una cuenta? <a href="#" id="btn-toggle-auth">Regístrate aquí</a>';
        }
    }
});

// 2. SUBMIT DEL FORMULARIO
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    errorMsg.style.display = 'none';

    const userVal = usuarioInput.value.trim(); 
    const passVal = passwordInput.value;
    const modoActual = authModeInput.value;

    if (modoActual === 'login') {
        const loginDTO = {
            Correo: userVal,
            Contrasena: passVal
        };

        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDTO)
        })
        .then(async function(respuesta) {
            if (!respuesta.ok) {
                const datosError = await respuesta.json();
                throw new Error(datosError.mensaje || 'Error desconocido.');
            }
            return respuesta.json();
        })
        .then(function (datosServidor) {
            alert("Sesión iniciada");
            document.getElementById('login-form').reset();

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', datosServidor.role);
            localStorage.setItem('userName', datosServidor.nombre);

            if (datosServidor.role === 'admin') {
                window.location.replace("admin.html");
            } else {
                window.location.replace("index.html");
            }
        })
        .catch(function(error) {
            errorMsg.textContent = error.message;
            errorMsg.style.display = 'block';
        });

    } else {
        const generoSeleccionado = document.querySelector('input[name="genero"]:checked')?.value || '';
        const fechaNacimientoVal = birthdateInput.value;
        const confirmPassVal = confirmPasswordInput.value;

        if (passVal !== confirmPassVal) {
            alert("Las contraseñas no coinciden.");
            passwordInput.value = "";
            confirmPasswordInput.value = "";
            return;
        }

        const nuevoUsuario = {
            Nombre: nombreInput.value.trim(),
            Apellido: apellidoInput.value.trim(),
            FechaNacimiento: fechaNacimientoVal,
            Correo: userVal, 
            Genero: generoSeleccionado,
            Contrasena: passVal
        };

        fetch('http://localhost:5000/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        })
        .then(async function (respuesta) {
            if (!respuesta.ok) {
                const datosError = await respuesta.json();
                throw new Error(datosError.mensaje || 'Error al registrar.');
            }
            return respuesta.json();
        })
        .then(function (datosServidor) {
            alert("Registro exitoso. Usuario guardado con el ID: " + datosServidor.id);
            
            // CORREGIDO: Recarga la página mandando el correo por la URL de manera limpia
            const correoCodificado = encodeURIComponent(userVal);
            window.location.href = `login.html?registrado=true&correo=${correoCodificado}`;
        })
        .catch(function (error) {
            alert(error.message);
        });
    }
});