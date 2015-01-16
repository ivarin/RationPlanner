function Meal(title) {
    var self = this;

    self.title = title;
    self.dishes = ko.observableArray();

    self.nutrientsLimit = {
        kcalories: ko.observable('').extend({ isNumber: null }),
        protein: ko.observable('').extend({ isNumber: null }),
        carbs: ko.observable('').extend({ isNumber: null }),
        fat: ko.observable('').extend({ isNumber: null })
    };
    self.nutrientsTotal = {
        kcalories: ko.computed(function () {
            return calculateTotal('kcalories');
        }),
        protein: ko.computed(function () {
            return calculateTotal('protein');
        }),
        carbs: ko.computed(function () {
            return calculateTotal('carbs');
        }),
        fat: ko.computed(function () {
            return calculateTotal('fat');
        })
    };
    self.nutrientsLeft = {
        kcalories: ko.computed(function () {
            return calculateBalance('kcalories');
        }),
        protein: ko.computed(function () {
            return calculateBalance('protein');
        }),
        carbs: ko.computed(function () {
            return calculateBalance('carbs');
        }),
        fat: ko.computed(function () {
            return calculateBalance('fat');
        })
    };
    self.addDish = function (dish) {
        if (self.nutrientsLimit.kcalories() && dish.kcalories > (self.nutrientsLimit.kcalories() - self.nutrientsTotal.kcalories())) {
            alert("You can\'t add this dish. Kcalories limit was exceeded.");
            return;
        }
        if (self.nutrientsLimit.protein() && dish.protein > (self.nutrientsLimit.protein() - self.nutrientsTotal.protein())) {
            alert("You can\'t add this dish. Protein limit was exceeded.");
            return;
        }
        if (self.nutrientsLimit.protein() && dish.protein > (self.nutrientsLimit.protein() - self.nutrientsTotal.protein())) {
            alert("You can\'t add this dish. Carbohydrates limit was exceeded.");
            return;
        }
        if (self.nutrientsLimit.fat() && dish.fat > (self.nutrientsLimit.fat() - self.nutrientsTotal.fat())) {
            alert("You can\'t add this dish. Fat limit was exceeded.");
            return;
        }
        self.dishes.push(dish);
    };
    self.removeDish = function (dish) {
        self.dishes.remove(dish);
    }

    function calculateTotal(nutrient) {
        var nutrientTotal = 0,
			i
        ;
        for (i = 0; i < self.dishes().length; i++) {
            nutrientTotal += +self.dishes()[i][nutrient];
        }
        return nutrientTotal;
    }
    function calculateBalance(nutrient) {
        if (self.nutrientsLimit[nutrient]() === '') {
            return '\u221E';
        } else {
            return +self.nutrientsLimit[nutrient]() - +self.nutrientsTotal[nutrient]();
        }
    }
}