async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,subregion,cca3"
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

async function displayCountries() {
  const contries = await getCountries();

  let finalString = ``;

  contries.forEach((country) => {
    // console.log(country);
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

displayCountries();

document.querySelector(".countries").addEventListener("click", (e) => {
  let country = e.target.closest(".country");
  let countryId = country.id;
  console.log(countryId);

  window.location.href = `details.html?id=${countryId}`;
});
