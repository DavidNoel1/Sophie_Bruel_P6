document.querySelector('.login-bar').addEventListener('submit', async function (event) {

    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const loginError = document.getElementById('login-error');

    // Réinitialisation des messages d'erreur
    emailError.textContent = '';
    passwordError.textContent = '';
    loginError.textContent = '';

    // Validation de l'email
    if (email === '') {
        emailError.textContent = 'Veuillez saisir votre adresse e-mail';
        emailError.style.display = 'block';
        return; // Arrêter l'exécution si l'email est vide
    } else {
        emailError.style.display = 'none';
    }

    // Validation du mot de passe
    if (password === '') {
        passwordError.textContent = 'Veuillez saisir votre mot de passe';
        passwordError.style.display = 'block';
        return; // Arrêter l'exécution si le mot de passe est vide
    } else {
        passwordError.style.display = 'none';
    }

    try {
        let response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) { // Identifiant valide
            const data = await response.json();
            sessionStorage.setItem("token", data.token);  // Enregistrement du token pour cette session
            window.location.href = "index.html"; // Redirection vers la page d'accueil
        } else if (response.status === 401) { // Erreur mauvais mot de passe
            loginError.textContent = 'Mot de passe incorrect';
            loginError.style.display = 'block';
        } else if (response.status === 404) { // Erreur mauvais utilisateur
            loginError.textContent = 'Utilisateur non trouvé';
            loginError.style.display = 'block';
        } else { // Erreur inattendue
            loginError.textContent = 'Une erreur inattendue s\'est produite, veuillez réessayer plus tard';
            loginError.style.display = 'block';
        }
    } catch (error) {
        loginError.textContent = 'Une erreur inattendue s\'est produite, veuillez réessayer plus tard';
        loginError.style.display = 'block';
    };
});



