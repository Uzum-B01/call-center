document.addEventListener("DOMContentLoaded", function () {
  var inputFields = document.querySelectorAll(
    'input[type="number"], input[type="text"]'
  );
  inputFields.forEach(function (field) {
    field.addEventListener("input", calculate);
  });

  calculate(); // Инициализация расчета при загрузке страницы
});

function roundUpToNearestThousand(number) {
  return Math.ceil(number / 1000) * 1000;
}

function formatNumber(number) {
  return number.toLocaleString("ru-RU");
}

function toPercentage(number) {
  return (number * 100).toFixed(1) + "%"; // Форматирует число с двумя знаками после запятой и добавляет '%'
}

function calculate() {
  var normHours = parseFloat(document.getElementById("normHours").value) || 0;
  var workedHours = parseFloat(document.getElementById("workedHours").value) || 0;
  var medical = parseFloat(document.getElementById("medical").value) || 0;
  var KPI = parseFloat(document.getElementById("KPI").value) || 0;

  var oklad = 3308880
  var salary = 2202200; // Установите значение переменной salaryRate
  var okladCost = 0
  var salaryCost = 0;
  var bonus = 0;
  var medicalHours = 0;
  var medCompensatition = 0
  var perer = 0;

  if(workedHours >0 && normHours>0){
    okladCost = oklad/normHours*workedHours
  }

  if (workedHours > normHours){
    okladCost = oklad
perer = oklad/normHours*(workedHours-normHours)
  }

  if (medical > 0) {
    medicalHours = medical * 11;
  }

  if(workedHours > 0 ) {
        salaryCost = salary * KPI / 100;
  }

  if (normHours > workedHours) {
    salaryCost = roundUpToNearestThousand(
      salary * KPI/normHours*workedHours/ 100
    );
  }

  if (medical > 0){
   medCompensatition = oklad / normHours * medicalHours * 0.6
  }
var avans = okladCost/2
var zarplata = okladCost/2 + perer + medCompensatition + salaryCost
var salaryTotal = okladCost + perer + medCompensatition + salaryCost

  var resultsText = "Заполните все поля" +"<br>" + "Оклад: " + formatNumber(roundUpToNearestThousand(okladCost)) + 
  "<br> Переработки: " + formatNumber(roundUpToNearestThousand(perer));
  var resultsText2 = "Заполните поля"
  +"<br>" + "Больничные: " + formatNumber(roundUpToNearestThousand(medCompensatition))
   + "<br>" + "Выполнение KPI: " + toPercentage(KPI/100) 
  +"<br>" + "Сумма бонусов: " + formatNumber(roundUpToNearestThousand(salaryCost));
  var totalText = "Оклад: " + formatNumber(roundUpToNearestThousand(okladCost)) +
  "<br> Переработки: " + formatNumber(roundUpToNearestThousand(perer)) +
  "<br> KPI: " + formatNumber(roundUpToNearestThousand(salaryCost)) +
  "<br> Больничные: " + formatNumber(roundUpToNearestThousand(medCompensatition)) +
  "<br> Всего аванс (25-ое число): " +
  formatNumber(roundUpToNearestThousand(avans)) +
  "<br>" +
  "Заработная плата 10-ое число: " +
  formatNumber(roundUpToNearestThousand(zarplata)) +
  "<br>" +
  "Всего заработная плата сотрдника включая аванс: " +
  formatNumber(roundUpToNearestThousand(salaryTotal))
   ;

  updateResults(resultsText);
  updateResults2(resultsText2);
  updateTotalText(totalText);
}

function updateResults(text) {
  document.getElementById("results").innerHTML = text;
}

function updateResults2(text) {
  document.getElementById("results2").innerHTML = text;
}

function updateTotalText(text) {
  // Убедитесь, что элемент с id totalText существует в HTML
  // Если нет, добавьте его или удалите эту функцию
  var totalTextElement = document.getElementById("totalText");
  if (totalTextElement) {
    totalTextElement.innerHTML = text;
  }
}
