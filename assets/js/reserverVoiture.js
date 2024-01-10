function login() {
    var date_debut = document.getElementById("startDate").value;
    var date_fin = document.getElementById("endDate").value;

    // Effectuer une demande API avec Fetch
    fetch('http://127.0.0.1:5000/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adresse: email, passe: password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data==true) {
            displaySuccessMessage("Connexion réussie!");
            console.log("Connexion réussie!")
            window.location.href = '../index.html';
        } else {
            displayErrorMessage(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        displayErrorMessage(error)
    });
}