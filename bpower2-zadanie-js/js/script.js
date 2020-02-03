const peopleList = document.getElementById('js-peopleList');
let peopleDetails;
const data = {
  people: [],
};

async function getPeople() {
  const url = 'https://swapi.co/api/people/';
  let response = await fetch(url);
  const peopleData = await response.json();
  data.people = peopleData.results;
  return data.people.map((person, index) => {
    let item = document.createElement('div');
    item.setAttribute('class', 'flip-card');
    item.innerHTML = `<div class="flip-card-inner">
      <div class="flip-card-front"><h3>${person.name}</h3></div><div class="flip-card-back" id="back-${index}"></div></div>`;
    peopleList.appendChild(item);

    let itemObject = data.people[index];
    peopleDetails = document.getElementById(`back-${index}`);
    peopleDetails.innerHTML = '';

    // movies
    var movieList = document.createElement('p');
    if (itemObject.films.length > 0) {
      for (var e = 0; e < itemObject.films.length; e++) {
        (function(x) {
          var newURLhost = itemObject.films[x];
          fetch(newURLhost)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            var movie = document.createElement('span');
            movie.textContent = data.title + ', ';
            movieList.appendChild(movie);
          });
        })(e);
      }
    }
    // vehicles
    var vehiclesList = document.createElement('p');
    if (itemObject.vehicles.length > 0) {
      for (var e = 0; e < itemObject.vehicles.length; e++) {
        (function(x) {
          var newURLhost = itemObject.vehicles[x];
          fetch(newURLhost)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            var vehicles = document.createElement('span');
            vehicles.textContent = data.name + ', ';
            vehiclesList.appendChild(vehicles);
          });
        })(e);
      }
    }

    // starships
    var starshipsList = document.createElement('p');
    if (itemObject.starships.length > 0) {
      for (var e = 0; e < itemObject.starships.length; e++) {
        (function(x) {
          var newURLhost = itemObject.starships[x];
          fetch(newURLhost)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            var starships = document.createElement('span');
            starships.textContent = data.name + ', ';
            starshipsList.appendChild(starships);
          });
        })(e);
      }
    }
    
    for(var keys in itemObject) {
      let element = document.createElement('p');
      
      if (keys === 'homeworld' && itemObject[keys].length > 0) {
        let homeworld = keys;
        let planetURL = data.people[index].homeworld.toString();
        fetch(planetURL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          element.innerHTML = `<span class="element-key">${homeworld}:</span> <span>${data.name}</span>`;
        }); 
      }
      if (keys === 'species' && itemObject[keys].length > 0) {
        let species = keys;
        let speciesURL = data.people[index].species.toString();
        fetch(speciesURL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          element.innerHTML = `<span class="element-key">${species}:</span> <span>${data.name}</span>`;
        }); 
      }
      if (keys === 'films' && itemObject[keys].length > 0) {
        let films = keys;
        element = movieList;
        element.innerHTML = `<span class="element-key">${films}: </span>`;
        peopleDetails.appendChild(element);
      } else if (keys === 'vehicles' && itemObject[keys].length > 0) {
        let vehicles = keys;
        element = vehiclesList;
        element.innerHTML = `<span class="element-key">${vehicles}: </span>`;
        peopleDetails.appendChild(element);
      } else if (keys === 'starships' && itemObject[keys].length > 0) {
        let starships = keys;
        element = starshipsList;
        element.innerHTML = `<span class="element-key">${starships}: </span>`;
        peopleDetails.appendChild(element);
      } else if (keys === 'created' && itemObject[keys].length > 0) {
        let created = keys;
        let date = itemObject[keys].substring(0, 10);
        element.innerHTML = `<span class="element-key">${created}: </span>` + date;
        peopleDetails.appendChild(element);
      } else if (keys === 'edited' && itemObject[keys].length > 0) {
        let edited = keys;
        let date = itemObject[keys].substring(0, 10);
        element.innerHTML = `<span class="element-key">${edited}: </span>` + date;
        peopleDetails.appendChild(element);
      } else {
        if (itemObject[keys].length > 0) {
          element.innerHTML = `<span class="element-key">${keys}:</span> <span>${itemObject[keys]}</span>`;
          peopleDetails.appendChild(element);
        }
      }
    }
  });
}

getPeople();