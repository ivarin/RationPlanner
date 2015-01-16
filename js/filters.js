function Filters() {
    var self = this;

    self.name = ko.observable();
    self.type = ko.observable();
    self.ingredients = ko.observableArray();
    self.kcalories = ko.observable().extend({ isNumber: null });
    self.protein = ko.observable().extend({ isNumber: null });
    self.carbs = ko.observable().extend({ isNumber: null });
    self.fat = ko.observable().extend({ isNumber: null });

    self.setActiveDishType = function (item) {
        self.type(item);
    };
    self.excludeIngredient = function (item) {
        self.ingredients.push(item);
    };
    self.returnExcludedIngredient = function (item) {
        self.ingredients.remove(item);
    };
    self.resetAllFilters = function () {
        self.name('');
        self.type('');
        self.kcalories('');
        self.protein('');
        self.carbs('');
        self.fat('');
        for (var i = 0; i < self.ingredients().length; i++) {
            self.returnExcludedIngredient(self.ingredients()[i]);
            i--;
        };
    };
};