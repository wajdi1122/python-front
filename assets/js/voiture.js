document.addEventListener('DOMContentLoaded', function () {
  fetchAndDisplayCars();
     });
     
     function fetchAndDisplayCars() {
       fetch('http://127.0.0.1:5000/afficher_tout_voiture')
         .then(response => response.json())
         .then(data => {
           displayCarsTable(data);
         })
         .catch(error => console.error('Error fetching data:', error));
     }
     function displayCarsTable(cars) {
     const tableBody = document.getElementById('carsBody');
   
     cars.forEach(car => {
       const row = tableBody.insertRow();
   
       // Create the first cell
       const cell1 = row.insertCell(0);
       cell1.innerHTML = `
         <div class="d-flex px-2 py-1">
           <div class="d-flex flex-column justify-content-center">
             <h6 class="mb-0 text-sm">${car.marque}</h6>
           </div>
         </div>
       `;
       const cell5 = row.insertCell(1);
       cell5.innerHTML = `
         <div class="d-flex px-2 py-1">
           <div class="d-flex flex-column justify-content-center">
             <h6 class="mb-0 text-sm">${car.modele}</h6>
           </div>
         </div>
       `;
       // Create the second cell
       const cell2 = row.insertCell(2);
       cell2.innerHTML = `
       <div class="d-flex flex-column justify-content-center">
             <h6 class="mb-0 text-sm">${car.kilometrage}</h6>
           </div>
         </div>
       `;
   
       // Create the third cell
       const cell3 = row.insertCell(3);
       cell3.innerHTML = `
         <div class="d-flex flex-column justify-content-center">
             <h6 class="mb-0 text-sm">${car.etat}</h6>
           </div>
         </div>
       `;
   
       // Create the fourth cell
       const cell4 = row.insertCell(4);
       cell4.innerHTML =`
       <div class="d-flex flex-column justify-content-center">
             <h6 class="mb-0 text-sm">${car.prix_location}</h6>
           </div>
         </div>
       `;

       const cell6 = row.insertCell(5);
       cell6.innerHTML =`
       <button type="button"  class="btn btn-success" onClick="updateVoiture(${car.num})" >Edit</button>
      <button type="button" onClick="deleteCarById(${car.num})" class="btn btn-danger">Delete</button>
       `
     });

     
   }


function deleteCarById(carId) {
    console.log(carId)
  // Assuming the server endpoint for deleting a car is /delete_car
  fetch('http://127.0.0.1:5000/delete_voiture', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ num: carId }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to delete car with ID ${carId}`);
      }
      // Refresh the table after successful deletion
      location.reload();

    })
    .catch(error => console.error('Error deleting car:', error));
}
function updateVoiture(carId){
  const newMarque = prompt("Marque de voiture:");
  const newModel = prompt("Modele de voiture:");
  const newKilo = prompt("kilometrage de voiture:");
  const newEtat = prompt("Etat de voiture(0 non reserver, 1 reserver):");
  const newprix = prompt("Prix de voiture:");




  if (!newMarque || !newModel || !newKilo || !newEtat || !newprix) {
      alert("Veuillez remplir tous les champs.");
      return;
  }

  // Préparer les données pour la requête POST
  const data = {
      "num":carId,
      "marque": newMarque,
      "modele": newModel,
      "etat": newEtat,
      "kilometrage": newKilo,
      "prix": newprix,
  };

  fetch('http://127.0.0.1:5000/UpdateVoiture', {
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