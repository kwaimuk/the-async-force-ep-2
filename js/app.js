/*jshint esversion: 6 */
const lookUp = () =>{
  var type = document.getElementById("resourceType").value;
  var resourceId =document.getElementById("resourceId").value;
  console.log(`http://swapi.co/api/${type}/${resourceId}/`);
  return `http://swapi.co/api/${type}/${resourceId}/`;

};

function throwError(){
  document.querySelector("#label").innerHTML = ``;
  document.querySelector("#p1").innerHTML = ``;
  document.querySelector("#p2").innerHTML = ``;
  document.querySelector("#contentContainer").innerHTML = ``;

  const display = document.querySelector("#contentContainer");
  const errorMessage = document.createElement('h2');
  errorMessage.style.backgroundColor = "pink";
  errorMessage.innerHTML = `Error 404 File not found`;
  display.appendChild(errorMessage);
  // the bottom a terrible code line,
  // document.querySelector("#eerror").style.backgroundColor = "pink";
  }

function inquiry() {
 const requestData = JSON.parse(this.responseText);
 var type = document.getElementById("resourceType").value;
 console.log("type",type);

 if(type === 'people'){
   const name = requestData.name;
   const gender = requestData.gender;
   const species = requestData.species;

   const getSpecies = new XMLHttpRequest();

   getSpecies.addEventListener('load', function() {
    // console.log("thisone",url);

    if(this.status === 404){ throwError();
    }
    else{
     const requestData = JSON.parse(this.responseText);
     const speciesName = requestData.name;
     document.querySelector("#p2").innerHTML = `Species: ${speciesName}`;

   document.querySelector("#label").innerHTML = `Name: ${name}`;
   document.querySelector("#p1").innerHTML = `Gender: ${gender}`;
    }
   });

   getSpecies.open('GET' , species);
   getSpecies.send();



 } else if (type === 'planets'){
        if(this.status === 404){ throwError()};
      const name = requestData.name;
      const terrain = requestData.terrain;
      const population = requestData.population;
      const films = requestData.films;

        for (var i = 0; i <films.length; i++) {


         const getFilms = new XMLHttpRequest();
         getFilms.addEventListener('load', function() {
         const requestData = JSON.parse(this.responseText);
         const filmName = requestData.title;

            const ul = document.querySelector("#filmList");
            const li2 = document.createElement("li");
            const filmNameTextNode = document.createTextNode(filmName);
            li2.appendChild(filmNameTextNode);
            ul.appendChild(li2);
         });
         // console.log("this",f);
         getFilms.open('GET' , films[i]);
         getFilms.send();
        }



      document.querySelector("#label").innerHTML = `Planet: ${name}`;
      document.querySelector("#p1").innerHTML = `Terrain: ${terrain}`;
      document.querySelector("#p2").innerHTML = `Population: ${population}`;

} else if (type === 'starships'){
      if(this.status === 404){ throwError()};
         console.log("starships",requestData);
      const name = requestData.name;
      const manufacturer = requestData.manufacturer;
      const starshipClass = requestData.starship_class;
      const films = requestData.films;
      console.log("filmes",films);
        for (var j = 0; j <films.length; j++) {


         const getFilms = new XMLHttpRequest();
         getFilms.addEventListener('load', function() {
         const requestData = JSON.parse(this.responseText);
         const filmName = requestData.title;
            const ul = document.querySelector("#filmList");
            const li2 = document.createElement("li");
            const filmNameTextNode = document.createTextNode(filmName);
            li2.appendChild(filmNameTextNode);
            ul.appendChild(li2);
         });

         getFilms.open('GET' , films[j]);
         getFilms.send();
        }



      document.querySelector("#label").innerHTML = `Ship name: ${name}`;
      document.querySelector("#p1").innerHTML = `Manufacturer: ${manufacturer}`;
      document.querySelector("#p2").innerHTML = `Starship Class: ${starshipClass}`;
}

}


const requestResourceButton = document.querySelector("#requestResourceButton");


requestResourceButton.addEventListener("click",function(){
  const url = lookUp();

  const getName = new XMLHttpRequest();
  getName.addEventListener('load', inquiry);

  getName.open('GET' , url);
  getName.send();
});

