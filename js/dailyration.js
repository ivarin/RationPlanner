function DailyRation(date) {
    var self = this;

    self.date = date;
    self.meals = [new Meal('Breakfast'), new Meal('Lunch'), new Meal('Dinner')];

    self.nutrientsLimitPerDay = {
        kcalories: ko.computed(function () {
            return calculateLimitPerDay('kcalories');
        }),
        protein: ko.computed(function () {
            return calculateLimitPerDay('protein');
        }),
        carbs: ko.computed(function () {
            return calculateLimitPerDay('carbs');
        }),
        fat: ko.computed(function () {
            return calculateLimitPerDay('fat');
        })
    };

    self.resetAllLimits = function () {
        var i;
        for (i = 0; i < self.meals.length; i++) {
            for (nutrient in self.meals[i].nutrientsLimit) {
                self.meals[i].nutrientsLimit[nutrient]('');
            }
        }
    };
    function calculateLimitPerDay(nutrient) {
        var
            limitPerDay = 0,
			i
        ;
        for (i = 0; i < self.meals.length; i++) {
            if (self.meals[i].nutrientsLimit[nutrient]() === '') {
                self.meals[i].nutrientsLimit[nutrient]('')
                return '';
            };
            limitPerDay += +self.meals[i].nutrientsLimit[nutrient]();
        }
        return limitPerDay;
    }
}
