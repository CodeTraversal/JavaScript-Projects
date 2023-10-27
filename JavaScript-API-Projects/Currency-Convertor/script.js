const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container');

// Array of Objects to populate the Select options
const countries = [
    { code: "USD", name: "United States Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "INR", name: "Indian Rupeess" },
    { code: "CNY", name: "Chinese Yuan" },
];

// Showing Countries from the array in Select Tag
countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`;

    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    //Setting Default Value in Select Option
    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";

});


// Function to get Exchange Rates using an API with an Async function
const getExchangeRates = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent = "Fetching Exchange Rates...";

    try {
        // Fetch Data from API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const conversionRate = data.rates[toCurrency];
        const convertedAmount = (amount * conversionRate).toFixed(2);
        convertedAmountElement.value = convertedAmount;

        if (isNaN(conversionRate)) {
            resultElement.textContent = "Exchange Rates are not available for the selected country!!!";
            convertedAmountElement.textContent = "";
        } else {
            convertedAmountElement.textContent = convertedAmount;
            resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        }
    } catch (error) {
        converterContainer.innerHTML = `<h2>Error while Fetching Exchange Rates!!!</h2>`;
    }
};

// Add event listeners to trigger the exchange rate fetching
fromAmountElement.addEventListener('input', getExchangeRates);

// Add event listeners to trigger the currency change by user
fromCurrencyElement.addEventListener('change', getExchangeRates);
toCurrencyElement.addEventListener('change', getExchangeRates);

// Add event listeners on window load event
window.addEventListener('load', getExchangeRates);
