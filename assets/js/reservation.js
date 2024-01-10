document.addEventListener('DOMContentLoaded', function () {
    fetchAndDisplayCars();
       });
       
       function fetchAndDisplayCars() {
         fetch('http://127.0.0.1:5000/afficher_reservation')
           .then(response => response.json())
           .then(data => {
             displayCarsTable(data);
           })
           .catch(error => console.error('Error fetching data:', error));
       }
       function displayCarsTable(cars) {
       const tableBody = document.getElementById('carsBody2');
       if (cars=="no data found") {
            tableBody.innerHTML='<p>no data found</p>'
       }else {
       cars.forEach(car => {
         const row = tableBody.insertRow();
         // Create the first cell
         const cell1 = row.insertCell(0);
         cell1.innerHTML = `
           <div class="d-flex px-2 py-1">
             <div class="d-flex flex-column justify-content-center">
               <h6 class="mb-0 text-sm">${car.Id_location}</h6>
             </div>
           </div>
         `;
         const cell5 = row.insertCell(1);
         cell5.innerHTML = `
           <div class="d-flex px-2 py-1">
             <div class="d-flex flex-column justify-content-center">
               <h6 class="mb-0 text-sm">${car.Id_voiture}</h6>
             </div>
           </div>
         `;
         // Create the second cell
         const cell2 = row.insertCell(2);
         cell2.innerHTML = `
         <div class="d-flex flex-column justify-content-center">
               <h6 class="mb-0 text-sm">${car.Id_locataire}</h6>
             </div>
           </div>
         `;
     
         // Create the third cell
         const cell3 = row.insertCell(3);
         cell3.innerHTML = `
           <div class="d-flex flex-column justify-content-center">
               <h6 class="mb-0 text-sm">${car.date_debut_location}</h6>
             </div>
           </div>
         `;
     
         // Create the fourth cell
         const cell4 = row.insertCell(4);
         cell4.innerHTML =`
         <div class="d-flex flex-column justify-content-center">
               <h6 class="mb-0 text-sm">${car.date_fin_location}</h6>
             </div>
           </div>
         `;
  
         const cell6 = row.insertCell(5);
         cell6.innerHTML =`
        <button type="button" onclick="rendre(${car.Id_voiture},${car.Id_locataire})"  class="btn btn-danger">Rendre</button>
         `
       });
    }
    
     }
     function rendre(voi,loc){
        fetch('http://127.0.0.1:5000/rendreVoiture', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ num: voi, id_loc: loc }),
            })
            .then(response => response.json())  // Parse the JSON content of the response
            .then(data => {
              location.reload()  // Log the parsed data
            })
            .catch(error => console.error('Error fetching data:', error));
       }