document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  const cityInput = document.getElementById("cityInput");
  const cityNameDisplay = document.getElementById("cityNameDisplay");
  const temperatureDisplay = document.getElementById("temperatureDisplay");
  const currentLocationButton = document.getElementById("currentLocationButton");

  searchButton.addEventListener("click", function () {
    const city = cityInput.value.toLowerCase();
    if (city.trim() !== "") {
      getWeatherData(city);
      cityInput.value = "";
    }
  });

  currentLocationButton.addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getWeatherDataByCoordinates(latitude, longitude);
        },
        function (error) {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  });

  function getWeatherData(city) {
    cityNameDisplay.textContent = city;
    const apiKey = "e48ad3de98327d651f8bede62ed2eed2"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const temperature = data.main.temp;
        temperatureDisplay.textContent = `${temperature}°C`;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  function getWeatherDataByCoordinates(latitude, longitude) {
    const apiKey = "e48ad3de98327d651f8bede62ed2eed2"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const city = data.name;
        const temperature = data.main.temp;
        cityNameDisplay.textContent = city;
        temperatureDisplay.textContent = `${temperature}°C`;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }
});