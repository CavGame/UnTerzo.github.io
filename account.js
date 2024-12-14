// account.js

// Funzione per generare un'email unica basata sul nome utente
function generateEmail(username) {
    const domain = "unterzo.com";
    const sanitizedUsername = username.replace(/\s+/g, '').toLowerCase(); // Rimuove spazi e converte in minuscolo
    return `${sanitizedUsername}@${domain}`;
}

// Salvataggio dell'account
function saveAccount(username, email) {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Verifica se l'email è già registrata
    if (accounts.some(account => account.email === email)) {
        alert("Errore: l'email esiste già!");
        return false;
    }

    // Aggiunge il nuovo account
    accounts.push({ username, email });
    localStorage.setItem('accounts', JSON.stringify(accounts));
    return true;
}

// Event listener per il form
document.getElementById('account-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');

    const username = usernameInput.value.trim();
    const email = generateEmail(username);

    // Aggiorna il campo email con l'indirizzo generato
    emailInput.value = email;

    // Salva l'account e mostra un messaggio di conferma
    if (saveAccount(username, email)) {
        document.getElementById('confirmation-message').style.display = 'block';
        usernameInput.disabled = true;
        emailInput.disabled = true;
    }
});
