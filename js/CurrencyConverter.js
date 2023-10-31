
const api = "https://www.floatrates.com/daily/";
const monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// for selecting different controls
var amountField = document.querySelector(".amount");
var convert = document.querySelector(".convert");
var fromCurrencyField = document.querySelector(".from");
var toCurrencyField = document.querySelector(".to");
var finalValue = document.getElementById(".convertedAmount");
var finalAmount = document.getElementById("finalAmount");
var alertBox = document.getElementById("alert-box");
var slideSource = document.getElementById('slideSource');

var exchangeRateLabel = document.getElementById("exchangeRateLabel");
var lastUpdatedLabel = document.getElementById("lastUpdatedLabel");
var currentDateLabel = document.getElementById("currentDateLabel");

var fromCurrency;
var toCurrency;
var amount;


fromCurrencyField.addEventListener('change', (event) => {
	fromCurrency = `${event.target.value}`;
});

toCurrencyField.addEventListener('change', (event) => {
	toCurrency = `${event.target.value}`;
});

amountField.addEventListener('input', setAmount);


convert.addEventListener("click", callApi);

window.onload = defaultExchange();


//show default currency conversion
function defaultExchange() {
	selectElement("from", "GBP");
	selectElement("to", "INR");
	fromCurrency = "GBP"
	toCurrency = "INR"
	amountField.value = 1
	amount = 1
	callApi()
};

function selectElement(id, valueToSelect) {
	let element = document.getElementById(id);
	element.value = valueToSelect;
}

function setAmount(field) {
	amount = field.target.value;
}

function callApi() {

	if (amount < 1) {
		amountField.value = 1
		alert("Please enter a valid amount");
		return;
	} else if (amount > 10000000) {
		amountField.value = 1
		alert("Please enter an amount less than 100,00,000");
		return;
	}
	let fullApi = api + fromCurrency + '.json'
	console.log("api", fullApi)
	fetch(`${fullApi}`)
		.then(response => {
			return response.json();
		}).then(calculateExhangeRate);
}


function calculateExhangeRate(response) {
	let toCode = toCurrency.toLowerCase();
	console.log("lower case to", toCode);
	for (var code in response) {
		if (code == toCode) {
			console.log("to code found", code)
			console.log("currency name", response[toCode].name)
			let exchangeData = response[toCode];
			let date = exchangeData.date
			let rate = exchangeData.rate;
			console.log("exchangerate", rate);
			console.log("amount", amount);
			let convertedAmount = rate * amount;
			console.log("final value", (convertedAmount));
			document.getElementById("c1").innerHTML = getAmountWithSymbol(convertedAmount.toFixed(2), toCode);
			exchangeRateLabel.innerHTML = getAmountWithSymbol(1, fromCurrency) + " = " + getAmountWithSymbol(rate.toFixed(2), toCurrency)
			let currentDate = new Date()
			var day = ("0" + currentDate.getDate()).slice(-2);
			var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
			var year = currentDate.getFullYear();
			currentDateLabel.innerHTML = day + "/" + month + "/" + year
			let lastUpdated = new Date(date)
			day = ("0" + lastUpdated.getDate()).slice(-2);
			month = ("0" + (lastUpdated.getMonth() + 1)).slice(-2);
			year = lastUpdated.getFullYear();
			lastUpdatedLabel.innerHTML = day + " " +
				monthsName[(lastUpdated.getMonth())] +
				" " + year + ", " +
				("0" + lastUpdated.getHours()).slice(-2) +
				":" + ("0" + lastUpdated.getMinutes()).slice(-2) +
				":" + ("0" + lastUpdated.getSeconds()).slice(-2);

		}
	}

}
function getAmountWithSymbol(amount, currency) {
	let options = { style: 'currency', currency: currency };
	return new Intl.NumberFormat('en-GB', options).format(amount)
}
function reset() {
	window.location.reload();
	document.getElementsByClassName("finalValue").innerHTML = "";
};
