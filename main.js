// Read lang parameter from URL
const searchParams = new URLSearchParams(window.location.search);
const queryLanguage = searchParams.get("lang");

// Detect system language
const systemLanguage = navigator.language.substring(0, 2);

// Select query or system language by priority
const selectedLanguage = queryLanguage || systemLanguage;

// Languages array with inspection 
const languagesList = ['de', 'en', 'es', 'fr', 'ja', 'pt'];
const wrongLanguage = !languagesList.includes(selectedLanguage);

// Set final language to project
const finalLanguage = wrongLanguage ? languagesList[1] : selectedLanguage;
const htmlTag = document.documentElement.setAttribute('lang', finalLanguage);

// Fetch language data
async function fetchLanguageData(lang) {
  const response = await fetch(`i18n/${lang}.json`);
  return response.json();
}

// Update content based on selected language
function updateContent(langData) {
  document.querySelectorAll('[i18n]').forEach(element => {
    const key = element.getAttribute('i18n');
    const jsonString = JSON.stringify(langData); 
    const jsonFinal = JSON.parse(jsonString.replaceAll("{{price}}", "price"));
    element.innerHTML = jsonFinal[key];
  });
}

// Change language
async function changeLanguage(lang) {
  const langData = await fetchLanguageData(lang);
  updateContent(langData);
}

// Offer choice link
const offerLink = document.getElementById('offerChoice');
const offerInputs = document.querySelectorAll('.banner-actions-offers-item__input');
const offerWeeklyAccess = document.getElementById('WEEKLY ACCESS');

offerInputs.forEach(input => {
  input.addEventListener('change', () => {
    offerWeeklyAccess.checked ? offerLink.setAttribute('href', 'https://google.com') : offerLink.setAttribute('href', 'https://apple.com');
  });
});

const priceList = ['39.99$', '0.48$', '6.99$'];
let pricePerYear = document.getElementById('pricePerYear');
let pricePerWeekSpecial = document.getElementById('pricePerWeekSpecial');
let pricePerWeek = document.getElementById('pricePerWeek');

window.addEventListener('DOMContentLoaded', async () => {
  const langData = await fetchLanguageData(finalLanguage);
  updateContent(langData);
  pricePerYear.innerHTML = pricePerYear.innerHTML.replace('price', priceList[0]);
  pricePerWeekSpecial.innerHTML = pricePerWeekSpecial.innerHTML.replace('price', priceList[1]);
  pricePerWeek.innerHTML = pricePerWeek.innerHTML.replace('price', priceList[2]);
});