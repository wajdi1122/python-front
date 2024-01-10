document.addEventListener('DOMContentLoaded', function () {
  var currentDate = new Date();
  var formattedDate = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
  const h5Element = document.getElementById('Aujourd');
        h5Element.textContent = formattedDate;
  fetch('http://127.0.0.1:5000/nombre_voiturenonallouer', {
  method: 'POST',
  headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ date_debut: formattedDate, date_fin: formattedDate }),
})
.then(response => response.json())  // Parse the JSON content of the response
.then(data => {
console.log(data)
const h6Element = document.getElementById('Vehicule_Disponible');
        h6Element.textContent = data[2];
   const h5Element = document.getElementById('Aujourd');
       h5Element.textContent = formattedDate;
   const h6Element1 = document.getElementById('Moyenne');
       h6Element1.textContent = data[0];
   const h6Element2 = document.getElementById('nombre voiture');
        h6Element2.textContent = data[1]; // Log the parsed data
})
.catch(error => console.error('Error fetching data:', error));
}

);
