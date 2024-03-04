const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector(".country-details img")
const countryNameElementh2 = document.querySelector(".country-details h2")
const nativeName = document.querySelector(".native-name")
const population = document.querySelector(".population")
const region = document.querySelector(".region")
const subRegion = document.querySelector(".sub-region")
const capital = document.querySelector(".capital")
const topLvlDomain = document.querySelector(".top-level-domain")
const currency = document.querySelector(".currencies")
const languages = document.querySelector(".languages")
const borderCountries = document.querySelector(".border-countries")
const backButton = document.querySelector(".back-btn")


backButton.addEventListener('click', () => {
    history.back()
})


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((resp) => resp.json())
    .then(([country]) => {
        // console.log(country)
        flagImage.src = country.flags.svg
        countryNameElementh2.innerText = country.name.common
        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        }
        else {
            nativeName.innerText = country.name.common
        }
        population.innerText = country.population.toLocaleString('en-IN')
        region.innerText = country.region
        if (country.subRegion) {
            subRegion.innerText = country.subregion
        }
        if (country.capital) {
            capital.innerText = country.capital.join(', ')
        }
        topLvlDomain.innerText = country.tld.join(', ')
        if (country.currencies) {
            currency.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ');
        }
        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(', ')
        }

        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((resp) =>
                    resp.json()).then(([borderData]) => {
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.innerText = borderData.name.common
                        borderCountryTag.href = `/country.html?name=${borderData.name.common}`
                        borderCountries.append(borderCountryTag)
                    })
            })
        }
    })