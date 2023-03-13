function calculateOptionPrice() {

    // Obtener valores de entrada del formulario
    let stockPrice = document.getElementById("actual_price").value;
    let strikePrice = document.getElementById("strike_price").value;
    let interestRate = document.getElementById("free_risk_rate").value;
    let timeToMaturity = document.getElementById("time_to_maturity").value;
    let frecuency = document.getElementById("temporality").value;
    let volatility = document.getElementById("volatility").value;

    // Convertir la fecha de madurez a años
    if (frecuency == "días"){
        timeToMaturity = timeToMaturity/360
    }
    else if (frecuency == "meses"){
        timeToMaturity = timeToMaturity/12
    }

    // Convertir tasas a float
    interestRate = interestRate/100
    volatility = volatility/100

    let d1 = (Math.log(stockPrice / strikePrice) + (interestRate + volatility * volatility / 2) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));
    let d2 = d1 - volatility * Math.sqrt(timeToMaturity);
    
    let callPrice = stockPrice * cumulativeDistribution(d1) - strikePrice * Math.exp(-interestRate * timeToMaturity) * cumulativeDistribution(d2);
    let putPrice = strikePrice * Math.exp(-interestRate * timeToMaturity) * cumulativeDistribution(-d2) - stockPrice * cumulativeDistribution(-d1);

    callPrice = callPrice.toFixed(2)
    putPrice = putPrice.toFixed(2)

    precios = `El precio de una Call es de $${callPrice} \n El precio de una Put es de $${putPrice}`

    alert(precios)
    
}

function cumulativeDistribution(x) {
    // Función auxiliar para calcular la función de distribución acumulativa de una distribución normal
    let t = 1 / (1 + 0.2316419 * Math.abs(x));
    let d = 0.3989423 * Math.exp(-x * x / 2);
    let p = d * ((0.3193815 * t) + (-0.3565638 * t ** 2) + (1.7814780 * t ** 3) + (-1.8212560 * t ** 4) + (1.3302744 * t ** 5));
    if (x > 0) {
        p = 1 - p;
    }
    return p;
}  
