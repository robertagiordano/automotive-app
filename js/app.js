const carList = document.getElementById("carList");
const searchBar = document.getElementById("searchBar");
let carModels = [];

// This is a async function that loads a list of objects of an array from a remote json file, a bunch of cars. With the 'fetch' im sending a get request and waiting a response with 'await'. The 'response' contains the response from the server. Im parsing data from the json and assign it to carModels. After all this is done im passing the data from carModels inside the dispayCarsInfo in order to be displayed on the webpage. There is also a try-catch for eventual errors.
let loadCarsList = async () => {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/joaofs/6a4eb62499572a29485ac5924a0c9e64/raw/97ac2191e65fb6d84f6f336dc8867efbc97410a3/cars.json"
    );
    carModels = await response.json();
    displayCarsInfo(carModels);
  } catch (error) {
    console.error(error);
  }
};
// This function uses .map to iterate the cars array and for each car object it generates a <li> that contains the car info like the make, model and price. All the info is concatenated with the .join into a single string. Then i save all of it to a variable called htmlString and i set the ul of the index.html(carList) to it in order to display the info on the page.
const imagePath = "./assets/images/";
const displayCarsInfo = (cars) => {
  // Update: Im replacing the empty space between the make and the model and by getting a patch for each car.
  cars.forEach((car) => {
    car.image =
      imagePath +
      car.make.replace(/ /g, "_") +
      "_" +
      car.model.replace(/ /g, "_") +
      ".jpg";
  });

  const htmlString = cars
    .map((car, index) => {
      return `
                <li class="cars" onclick="openDetailPage(${index})">
                    <img src="${car.image}">
                    <h2>${car.make} ${car.model}</h2>
                    <p>$${car.price}</p>
                </li>`;
    })
    .join("");
  carList.innerHTML = htmlString;
};
loadCarsList();

// This function opens a new page in a new tab, it receives a index parameter in order to open the correct object with its info.
function openDetailPage(index) {
  const url = `detail-page.html?index=${index}`;
  window.open(url, "_blank");
}

// This is a searchbar that has an eventlistener attached to it that gets triggered by the user. The event listens to a 'keyup', it convers the text into lowercase to make it case-insensitive. I filter through the carModels array and use the .filter to create a new array that contains only the cars objects that match what the user typed.
searchBar.addEventListener("keyup", (key) => {
  const searchString = key.target.value.toLowerCase();

  const filteredCars = carModels.filter((cars) => {
    return (
      cars.make.toLowerCase().includes(searchString) ||
      cars.model.toLowerCase().includes(searchString)
    );
  });
  displayCarsInfo(filteredCars);
});
