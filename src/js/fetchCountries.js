export const fetchCountries = function (name) {
  const URL = 'https://restcountries.eu/rest/v2/name/';

  return fetch(`${URL}${name}?fields=name;capital;population;flag;languages`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
