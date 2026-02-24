async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,subregion,cca3",
    );
    if (!res.ok) {
      throw new Error("something went wrong");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
let countries = [];

let filteredCountries = [];

async function displayCountries() {
  countries = await getCountries();

  countriestoDisplay(countries);
}

displayCountries();

document.querySelector(".countries").addEventListener("click", (e) => {
  let country = e.target.closest(".country");
  let countryId = country.id;
  console.log(countryId);

  window.location.href = `details.html?id=${countryId}`;
  document.querySelector("#search").value = "";
});

document.querySelector("form").addEventListener("input", (e) => {
  e.preventDefault();

  let input = document.querySelector("#search").value.toLocaleLowerCase();

  filteredCountries = countries.filter((c) => {
    return c.name.common.toLocaleLowerCase().includes(input);
  });

  countriestoDisplay(filteredCountries);
});

function countriestoDisplay(data) {
  let finalString = ``;

  data.forEach((country) => {
    const template = `
 <div class="country" id="${country.cca3}">
          <img src="${country.flags.svg}" alt="flag" />
          <div class="card-info">
            <h2>${country.name.common}</h2>
            <p>Population: <span>${country.population}</span></p>
            <p>Region: <span>${country.region}</span></p>
            <p>Capital: <span>${country.capital}</span></p>
          </div>
        </div>


`;

    finalString += template;
  });

  document.querySelector(".countries").innerHTML = finalString;
}

const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.firstElementChild.classList.toggle("hidden");
  themeToggle.lastElementChild.classList.toggle("hidden");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("isDark", true);
  } else {
    localStorage.setItem("isDark", false);
  }
});

let isdarkTheme = localStorage.getItem("isDark");
console.log(isdarkTheme);

if (isdarkTheme === "true") {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}
