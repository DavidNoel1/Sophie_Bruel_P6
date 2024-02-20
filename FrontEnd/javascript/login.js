
document.querySelector('.login-bar').addEventListener('submit', function(event) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    // Validation de l'email
    if (email === '') {
        emailError.textContent = 'Veuillez saisir votre adresse e-mail';
        emailError.style.display = 'block';
        event.preventDefault();
    } else {
        emailError.style.display = 'none';
    }

    // Validation du mot de passe
    if (password === '') {
        passwordError.textContent = 'Veuillez saisir votre mot de passe';
        passwordError.style.display = 'block';
        event.preventDefault(); 
    } else {
        passwordError.style.display = 'none';
    }
});

