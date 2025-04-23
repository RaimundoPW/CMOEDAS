const apiKey = 'b32b2d808d4c055de48b0a9b';
const apiUrl = `https://v6.exchangerate-api.com/v6/ ${apiKey}/latest/ `;

async function getExchangeRate(daMoeda, paraMoeda) {
    try{
        const response = await fetch(`${apiUrl}${daMoeda}`);
        const data     = await response.json();


        if(data.result === "success"){
            return data.conversion_rates[paraMoeda];
        
        }else{
            throw new Error("Erro ao buscar a taxa de cãmbio");
        }
            
    }catch(error){
        console.error("Erro:", error);
        return null;
    }
}

document.getElementById("currency-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    
    const valor = parseFloat(document.getElementById('amount').value);
    const daMoeda = document.getElementById('daMoeda').value;
    const paraMoeda = document.getElementById('paraMoeda').value;

    const exchangeRate = await getExchangeRate(daMoeda, paraMoeda); 
        if(exchangeRate){
            const convertedValue = valor * exchangeRate;

            const conversão = document.getElementById("conversão");
            conversão.textContent = `Resultado: ${convertedValue,toFixed(2)} $ { paraMoeda}`; 
        }else{
            alert("Erro ao buscar cotacão de câmbio, favor, tente novamente");
        }
    });
