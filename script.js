document.addEventListener("DOMContentLoaded", function() {
    // Charger les données météo depuis le fichier JSON
    fetch("config.json")
        .then(response => response.json())
        .then(data => {
            const city = data.city;

            // Appele l'API météo avec la ville spécifiée dans le fichier JSON
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=fe5daf49b6fe74dbfd716d394d7ce581`) // ma clef API
                .then(response => response.json())
                .then(weatherData => {
                    // Affiche les données météo
                    displayWeather(weatherData);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des données météo :", error);
                });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données de configuration :", error);
        });

    function displayWeather(data) {
        const weatherInfoElement = document.getElementById("weather-info");

        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convertir de Kelvin à Celsius
        const weatherDescription = data.weather[0].description;
        const weatherIcon = getWeatherIcon(data.weather[0].icon);

        const weatherHTML = `
            <p>Ville: ${cityName}</p>
            <p>Température: ${temperature}°C</p>
            <p>Description: ${weatherDescription}</p>
            <img src="${weatherIcon}" alt="Weather Icon">
        `;

        weatherInfoElement.innerHTML = weatherHTML;
    }

    function getWeatherIcon(iconCode) {
        // Détermine le nom de fichier SVG à charger en fonction du code d'icône météo
        let iconName;
        switch (iconCode) {
            case "01d":
            case "01n":
                iconName = "sunny.svg";
                break;
            case "02d":
            case "02n":
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                iconName = "cloudy.svg";
                break;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                iconName = "rainy.svg";
                break;
            case "11d":
            case "11n":
                iconName = "stormy.svg";
                break;
            case "13d":
            case "13n":
                iconName = "snow.svg";
                break;
            case "50d":
            case "50n":
                iconName = "foggy.svg";
                break;
            default:
                iconName = "default.svg"; // Icône par défaut si aucune correspondance n'est trouvée
        }
        
        // Retourne le chemin vers le fichier SVG correspondant
        return `weather-icons/${iconName}`;
    }
});
