function fetchAndDisplayCars() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    fetch('http://127.0.0.1:5000/voiturenonallouer', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({ date_debut: startDate, date_fin: endDate }),
})
.then(response => response.json())  // Parse the JSON content of the response
.then(data => {
  console.log(data)
  displayCarsnonReserve(data);  // Log the parsed data
})
.catch(error => console.error('Error fetching data:', error));
  }

  function displayCarsnonReserve(cars) {
    const tableBody = document.getElementById('carsTableBody');
    tableBody.innerHTML = '';
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

   const cell7 = row.insertCell(5);
   cell7.innerHTML =`
   <button type="button" class="btn btn-success" onclick="openDialog(${car.num})">Reserver</button>
   `;
    });
  
  }
  function openDialog(num) {
          var dialog = document.getElementById('myDialog');
          dialog.showModal();
      }

      // Fonction pour fermer le dialogue
      function closeDialog() {
          var dialog = document.getElementById('myDialog');
          dialog.close();
      }

      // Fonction pour soumettre le formulaire
      function submitForm() {
         
          closeDialog();
      }


      function Reserver(num,){
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