const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container input");
const themeSwitch = document.querySelector(".theme-changer")
const body = document.querySelector('body')
const icon = document.querySelector("#icon")
const mode = document.querySelector("#mode")
let allCountriesData
fetch("https://restcountries.com/v3.1/all")
    .then((resp) => resp.json())
    .then((data) => {
        renderCountries(data)
        allCountriesData = data
    });

filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        .then((resp) => resp.json())
        .then(renderCountries)
})

function renderCountries(data) {
    countriesContainer.innerHTML = ""
    data.forEach((country) => {
        const countryCard = document.createElement("a");
        countryCard.classList.add("country-card");
        countryCard.href = `/country.html?name=${country.name.common}`
        countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="flag" />
         <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
       <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
       <p><b>Region: </b>${country.region}</p>
        <p><b>Capital: </b>${country.capital}</p>
      </div>`
        countriesContainer.append(countryCard);
    });
}

searchInput.addEventListener('input', (e) => {
    // console.log(e.target.value);
    const filteredcountries = allCountriesData.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredcountries);
    // console.log(filteredcountries);
})

icon.addEventListener('click', () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        icon.src = "./images/sun.png"
        mode.innerText = "Light Mode"
    }
    else {
        icon.src = "./images/moon.png"
        mode.innerText = "Dark Mode"
    }
})
