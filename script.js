const countriesContainer = document.querySelector(".countries-container");

fetch("https://restcountries.com/v3.1/all")
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach((country) => {
            // console.log(country.flags.svg);
            const countryCard = document.createElement("a");
            countryCard.classList.add("country-card");
            countryCard.innerHTML = `
<img src="${country.flags.svg}" alt="flag" />
<div class="card-text">
  <h3 class="card-title">Vatican City</h3>
  <p><b>Population: </b>81,770310</p>
  <p><b>Region: </b>Europe</p>
  <p><b>Capital: </b>Berlin</p>
</div>
`;
            countriesContainer.append(countryCard);
        });
    });
