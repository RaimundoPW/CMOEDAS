const apiKey = "b32b2d808d4c055de48b0a9b";
const apiUrl = ` https://v6.exchangerate-api.com/v6/ ${apiKey}/latest/`;


const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const exchangeRateText = document.getElementById("exchangeRate");
const convertBnt = document.getElementById("convertBnt");
const swaBnt = document.getElementById("swap");

let exchangeRates = {};

//Carregar moedas na lista
async function loadCurrencies() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/b32b2d808d4c055de48b0a9b/latest/`);
            const data = await response.json();
            exchangeRates = data.conversion_rates;

            for (let currency in exchangeRates) {
                let option1 = document.createElement("option");
                let option2 = document.createElement("option");
                
                option1.value = currency;
                option1.textContent = currency;
                option2.value = currency;
                option2.textContent = currency;

                fromCurrency.appendChild(option1);
                fromCurrency.appendChild(option2);
            }
            
            fromCurrency.value = "USD";
            toCurrency.value = "BRL";
        } catch (error) {
                console.error("Error ao carregar moedas:", error);
            }
    }

    // Converter moeda
function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const value = parseFloat(amount.value);

    if (isNaN(value) || value <= 0) {
        alert("Digite um valor válido.");
        return;
    }

    const rate = exchangeRates[to] / exchangeRates[from];
    const convertedAmount = (value * rate).toFixed(2);
    result.value = convertedAmount;
    exchangeRateText.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
}

// Inverter moedas
swapBtn.addEventListener("click", () => {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
    convertCurrency();
});

// Converter ao clicar no botão
convertBtn.addEventListener("click", convertCurrency);

// Carrega moedas na inicialização
loadCurrencies();

