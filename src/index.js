import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import countryTemplate from './templates/country.hbs';
import countriesTemplate from './templates/countries.hbs';
import { Notify } from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener(
  'input',
  debounce(() => {
    onNameCountryInput();
  }, DEBOUNCE_DELAY),
);

function onNameCountryInput() {
  if (!inputEl.value) {
    countryInfo.innerHTML = ' ';
    countryList.innerHTML = ' ';
    return;
  }
  fetchCountries(inputEl.value)
    .then(value => {
      countryInfo.innerHTML = ' ';
      countryList.innerHTML = ' ';

      if (value.length === 1) {
        countryInfo.innerHTML = countryTemplate(value);
      } else if (value.length >= 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (value.length > 1) {
        countryList.innerHTML = countriesTemplate(value);
      }
    })
    .catch(() => Notify.failure('Oops, there is no country with that name'));
}
