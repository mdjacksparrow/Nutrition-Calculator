var items = [];
var nutrientValue = [];
var query;
const URL = 'https://api.nal.usda.gov/fdc/v1';
const API_KEY = 'qYKhyiu7Sz8sYsCixDcz0Xy9X9UaKxiOqq1OBg3k';

let iron = 0,
  dietartyFiber = 0,
  totalSugar = 0,
  sodium = 0,
  carbs = 0,
  calcium = 0,
  protein = 0,
  cholestral = 0,
  totalFat = 0,
  vitaminA = 0,
  vitaminC = 0,
  saturatedFat = 0,
  vitaminD = 0;

$(document).ready(() => {
  $('#main-form').on('submit', async (e) => {
    e.preventDefault();

    console.log(query);

    await fetchData(query);
    // Set animation when fetching the data
    $('#nutrient-calc').waitMe({
      effect: 'bounce',
      text: 'Analyze your Recipe',
      bg: 'rgba(255,255,255,0.7)',
      color: '#000',
      maxSize: '',
      waitTime: -1,
      textPos: 'vertical',
      fontSize: '',
      source: '',
      onClose: function () {},
    });
  });

  // Set sample recipe
  $('#set-sample').click(() => {
    $('#ingredients').html(
      '3 medium carrots\n1 medium sweet potato\n1 tablespoon olive oil\n1/8 teaspoon salt\n2 tablespoons pure maple syrup'
    );
  });

  // Add Items
  $('#add').click(() => {
    const amount = $('#amount').find(':selected').val();
    const size = $('#size').find(':selected').val();
    const ingredientName = $('#ingredientName').val();
    console.log(ingredientName);

    if (amount !== 'null' && size !== 'null' && ingredientName != '') {
      // remove warning
      $('.fa-warning').removeClass('show');

      console.log(createObject(amount, size, ingredientName));

      items.push(createObject(amount, size, ingredientName));
      $('.noOfItems').html(items.length);

      // Clear input
      $('#amount').val('null');
      $('#size').val('null');
      $('#ingredientName').val('');

      // Add item to showcase
      $('#items').append(
        `<div class="item">
            <p>${amount}<p>
            <p>${size}<p>
            <p>${ingredientName}<p>
        </div>`
      );

      //   contstruct a query
      query = items.map((item) => {
        return item.ingredientName;
      });

      console.log(query);
    } else {
      $('.fa-warning').addClass('show');
    }
  });
});

const createObject = (amount, size, ingredientName) => {
  return {
    amount,
    size,
    ingredientName,
  };
};

const fetchData = (query) => {
  query.forEach(async (q) => {
    const option = {
      query: q,
      requireAllWords: true,
      exactPhrase: true,
    };

    await fetch(`${URL}/foods/search?api_key=${API_KEY}`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(option),
    })
      .then((response) => response.json())
      .then((option) => {
        console.log(option.foods[0].foodNutrients);

        // manipulate those data
        option.foods[0].foodNutrients.forEach(async (nutrient) => {
          switch (nutrient.nutrientId) {
            case 1089:
              if (nutrient.unitName === 'MG') {
                iron += parseFloat((nutrient.value / 1000).toFixed(3));
                console.log(iron);
              } else {
                iron += nutrient.value;
              }
              break;
            case 1079:
              if (nutrient.unitName === 'MG') {
                dietartyFiber += parseFloat((nutrient.value / 1000).toFixed(3));
                //     console.log(dietartyFiber);
              } else {
                dietartyFiber += nutrient.value;
              }
              break;
            case 2000:
              if (nutrient.unitName === 'MG') {
                totalSugar += parseFloat((nutrient.value / 1000).toFixed(3));
                //     console.log(totalSugar);
              } else {
                totalSugar += nutrient.value;
              }
              break;
            case 1093:
              if (nutrient.unitName === 'MG') {
                sodium += parseFloat((nutrient.value / 1000).toFixed(3));
              } else {
                sodium += nutrient.value;
              }
              break;
            case 1005:
              if (nutrient.unitName === 'MG') {
                carbs += parseFloat((nutrient.value / 1000).toFixed(3));
              } else {
                carbs += nutrient.value;
              }
              break;
            case 1087:
              if (nutrient.unitName === 'MG') {
                calcium += parseFloat((nutrient.value / 1000).toFixed(3));
              } else {
                calcium += nutrient.value;
              }
              break;

            case 1003:
              if (nutrient.unitName === 'MG') {
                protein += parseFloat((nutrient.value / 1000).toFixed(3));
              } else {
                protein += nutrient.value;
              }
              break;
            case 1253:
              if (nutrient.unitName === 'MG') {
                cholestral += parseFloat((nutrient.value / 1000).toFixed(3));
              } else {
                cholestral += nutrient.value;
              }
              break;
            case 1104:
              if (nutrient.unitName === 'MG') {
                vitaminA += parseFloat((nutrient.value / 1000).toFixed(3));
              } else {
                vitaminA += nutrient.value;
              }
              break;
            case 1162:
              if (nutrient.unitName === 'MG') {
                vitaminC += parseFloat((nutrient.value / 1000).toFixed(3));
              } else {
                vitaminC += nutrient.value;
              }
              break;
            case 1258:
              if (nutrient.unitName === 'MG') {
                saturatedFat += parseFloat((nutrient.value / 1000).toFixed(3));
              } else {
                saturatedFat += nutrient.value;
              }
              break;
            case 1104:
              if (nutrient.unitName === 'MG') {
                vitaminD += parseFloat((nutrient.value / 1000).toFixed(3));
              } else {
                vitaminD += nutrient.value;
              }
              break;
            case 1004:
              if (nutrient.unitName === 'MG') {
                totalFat += parseFloat((nutrient.value / 1000).toFixed(3));
              } else {
                totalFat += nutrient.value;
              }
              break;
            default:
              break;
          }
        });

        console.log(
          'iron = ' + iron,
          'df = ' + dietartyFiber,
          'tS = ' + totalSugar,
          'Na = ' + sodium,
          'carbs = ' + carbs
        );

        // set total no.of grams
        $('#tf').html(totalFat + 'g');
        $('#sf').html(saturatedFat + 'g');
        $('#ch').html(cholestral + 'g');
        $('#na').html(sodium + 'g');
        $('#carbs').html(carbs + 'g');
        $('#df').html(dietartyFiber + 'g');
        $('#ts').html(totalSugar + 'g');
        $('#pro').html(protein + 'g');
        $('#vD').html(vitaminD + 'g');
        $('#ca').html(calcium + 'g');
        $('#fe').html(iron + 'g');
        $('#pd').html(0 + 'g');

        //  Set daily value %
        $('#tfp').html(getDV(totalFat, 65) + '%');
        $('#sfp').html(getDV(saturatedFat, 20) + '%');
        $('#chp').html(getDV(cholestral , 0.3) + '%');
        $('#nap').html(getDV(sodium, 1) + '%');
        $('#carbsp').html(getDV(carbs, 300) + '%');
        $('#dfp').html(getDV(dietartyFiber, 25) + '%');
        $('#tsp').html(getDV(totalSugar, 1) + '%');
        $('#prop').html(getDV(protein, 50) + '%');
        $('#vDp').html(getDV(vitaminD, 400) + '%');
        $('#cap').html(getDV(calcium, 1) + '%');
        $('#fep').html(getDV(iron, 0.018) + '%');
        $('#pdp').html(0 + '%');

        $('#nutrient-calc').waitMe('hide');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
};

const getDV = (ingredient, multivalue) => {
  if (multivalue === 1) {
    return parseFloat(((ingredient / multivalue) * 1).toFixed(3));
  } else {
    return parseFloat(((ingredient / multivalue) * 100).toFixed(3));
  }
};
