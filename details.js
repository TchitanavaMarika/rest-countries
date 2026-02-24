const urlObj = new URLSearchParams(window.location.search);

let countryId = urlObj.get("id");

async function getDetails() {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryId}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`,
    );

    if (!res.ok) {
      throw new Error("something get wrong");
    }

    const data = await res.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function displayDetales() {
  const data = await getDetails();

  let template = `


        <img src="${data.flags?.svg}" alt="flag" />

        <div class="details">
          <h2>${data.name.common}</h2>
          <div class="details-info">
            <div>
              <p>Native Name: <span>${
                data.name.nativeName?.[Object.keys(data.name.nativeName)[0]]
                  ?.common || "N/A"
              }</span></p>
              <p>Popu;lation: <span>${data.population}</span></p>
              <p>Region: <span>${data.region}</span></p>
              <p>Sub Region: <span>${data.subregion || "N/A"}</span></p>
              <p>Capital: <span>${data.capital?.[0] || "N/A"}</span></p>
            </div>
            <div>
              <p>Top Level Domain: <span>${data.tld?.[0] || "N/A"}</span></p>
              <p>Currencies <span>${
                Object.values(data.currencies || {})
                  .map((c) => c.name)
                  .join(", ") || "N/A"
              }</span></p>
              <p>Languages <span>${
                Object.values(data.languages || {}).join(", ") || "N/A"
              }</span></p>
            </div>
          </div>
          <div class="border-countries">
            <p>Border Countries:</p>
            <div>
             ${data.borders?.map((b) => `<span>${b}</span>`).join(" ") || "N/A"}
            </div>
          </div>
        </div>

`;

  document.querySelector("#datales-section").innerHTML = template;
}

displayDetales();

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
