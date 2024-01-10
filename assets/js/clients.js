document.addEventListener('DOMContentLoaded', function () {
    fetchAndDisplayClients();
  });
  
  function fetchAndDisplayClients() {
    fetch('http://127.0.0.1:5000/afficher_locataire')
      .then(response => response.json())
      .then(data => {
        displayClientsTable(data);
        console.log(data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  
  function displayClientsTable(clients) {
  const tableBody = document.getElementById('clientsBody');

  clients.forEach(client => {
    const row = tableBody.insertRow();

    // Create the first cell
    const cell1 = row.insertCell(0);
    cell1.innerHTML = `
      <div class="d-flex px-2 py-1">
        <div></div>
        <div class="d-flex flex-column justify-content-center">
          <h6 class="mb-0 text-sm">${client.Nom} ${client.Prenom}</h6>
        </div>
      </div>
    `;

    // Create the second cell
    const cell2 = row.insertCell(1);
    cell2.innerHTML = `
      <p class="text-xs font-weight-bold mb-0">${client.Adresse}</p>
    `;

   
  
   

    // Create the fifth cell
    const cell3 = row.insertCell(2);
    cell3.innerHTML = `
    <button type="button" class="btn btn-success" onclick="updateClient(${client.Id_loc})">Edit</button>
    <button type="button" class="btn btn-danger" onclick="deleteCarById(${client.Id_loc})">Delete</button>
    `;
  });
}
function deleteCarById(carId) {
  // Assuming the server endpoint for deleting a car is /delete_car
  fetch('http://127.0.0.1:5000/delete_locataire', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },  
    body: JSON.stringify({ id_loc: carId }),
    
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to delete Client with ID ${carId}`);
      }
      // Refresh the table after successful deletion
      location.reload();

    })
    .catch(error => console.error('Error deleting Client:', error));
}
function updateClient(carId){
    const newName = prompt("Nom du client:");
    const newPrenom = prompt("Prenom du client:");
    const newAddresse = prompt("Adresse du client:");

    if (!newName || !newPrenom || !newAddresse) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Préparer les données pour la requête POST
    const data = {
        "id_loc":carId,
        "nom": newName,
        "prenom": newPrenom,
        "address": newAddresse
    };

    fetch('http://127.0.0.1:5000/UpdateLocataire', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
           location.reload();
        } else {
            location.reload();
        }
    })
    .catch(error => {
        console.error('Erreur de mise à jour:', error);
    });

}