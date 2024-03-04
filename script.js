const countriesContainer = document.querySelector(".countries-container");

fetch("https://restcountries.com/v3.1/all")
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach((country) => {
            console.log(country.region);
            const countryCard = document.createElement("a");
            countryCard.classList.add("country-card");
            countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="flag" />
             <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
           <p><b>Population: </b>${country.population}</p>
           <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital}</p>
          </div>`
            countriesContainer.append(countryCard);
        });
    });
