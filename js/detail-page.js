const carDetail = document.getElementById("carDetail");

// Here i get the value associated with the 'index' from urlParams.
const urlParams = new URLSearchParams(window.location.search);
const carIndex = urlParams.get("index");

// This is another async function that essentialy loads the same list of cars from the list of objects from the remote json file and display the details of a specific car. The difference is that here we check if carmodels is not null and if the carIndex exsist in the carModel array. I store the car object in a car variable in the if statement with its index and pass it as an arguemnt to the displayCarDetail function that will display it in the detail-page.html
let loadCarDetail = async () => {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/joaofs/6a4eb62499572a29485ac5924a0c9e64/raw/97ac2191e65fb6d84f6f336dc8867efbc97410a3/cars.json"
    );
    const carModels = await response.json();

    if (carModels && carModels[carIndex]) {
      const car = carModels[carIndex];
      displayCarDetail(car);
    }
  } catch (error) {
    console.error(error);
  }
};
loadCarDetail();

// This is a function that takes 'car' as paramter and generates a string that gets set to the carDetail element in from the detail-page.html
const displayCarDetail = (car) => {
  const htmlString = `
        <h2>${car.make} ${car.model}</h2>
        <img src="./assets/images/tesla_model_s.jpg"/>
        <p>${car.description}</p>
        <p>${car.features}</p>
        <p>Miles: ${car.mileage}</p>
        <p>Price: $${car.price}</p>
        
    `;
  carDetail.innerHTML = htmlString;
};
