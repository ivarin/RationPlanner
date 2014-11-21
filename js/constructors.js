function Filters() {
	var self = this;

	self.name = ko.observable();
	self.type = ko.observable();
	self.ingredients = ko.observableArray();
	self.kcalories = ko.observable().extend({ isNumber: null });
	self.protein = ko.observable().extend({ isNumber: null });
	self.carbs = ko.observable().extend({ isNumber: null });
	self.fat = ko.observable().extend({ isNumber: null });
	
	self.setActiveDishType = function(item) {
		self.type(item);
	};			
	self.excludeIngredient = function(item) {			
		self.ingredients.push(item);			
	};
	self.returnExcludedIngredient = function(item) {
		self.ingredients.remove(item);
	};
	self.resetAllFilters = function() {		
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
		kcalories: ko.computed(function() {
			return calculateTotal('kcalories');
		}),
		protein: ko.computed(function() {
			return calculateTotal('protein');
		}),
		carbs: ko.computed(function() {
			return calculateTotal('carbs');
		}),
		fat: ko.computed(function() {
			return calculateTotal('fat');
		})
	};
	self.nutrientsLeft = {
		kcalories: ko.computed(function() {
			return calculateBalance('kcalories');
		}),
		protein: ko.computed(function() {
			return calculateBalance('protein');
		}),
		carbs: ko.computed(function() {
			return calculateBalance('carbs');
		}),
		fat: ko.computed(function() {
			return calculateBalance('fat');
		})
	};

	self.addDish = function(dish) {				
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
	self.removeDish = function(dish) {		
		self.dishes.remove(dish);
	}

	function calculateTotal(nutrient) {
		var nutrientTotal = 0,
			i
		;
		for(i = 0; i < self.dishes().length; i++) {				
			nutrientTotal += +self.dishes()[i][nutrient];
		}
		return nutrientTotal;
	}
	function calculateBalance(nutrient){		
		if (self.nutrientsLimit[nutrient]() === '') {
			return '\u221E';
		} else {
			return +self.nutrientsLimit[nutrient]() - +self.nutrientsTotal[nutrient]();
		}
	}		
}

function DailyRation(date) {
	var self = this;

	self.date = date;
	self.meals = [new Meal('Breakfast'), new Meal('Lunch'), new Meal('Dinner')];

	self.nutrientsLimitPerDay = {
		kcalories: ko.computed(function(){
			return calculateLimitPerDay('kcalories');
		}),
		protein: ko.computed(function(){
			return calculateLimitPerDay('protein');
		}),
		carbs: ko.computed(function(){
			return calculateLimitPerDay('carbs');
		}),
		fat: ko.computed(function(){
			return calculateLimitPerDay('fat');
		})
	};

	self.resetAllLimits = function() {
		var i;
		for(i = 0; i < self.meals.length; i++) {
			for(nutrient in self.meals[i].nutrientsLimit) {
				self.meals[i].nutrientsLimit[nutrient]('');
			}		
		}		
	};
	function calculateLimitPerDay(nutrient) {
		var limitPerDay = 0,
			i
		;
		for(i = 0; i < self.meals.length; i++) {
			if (self.meals[i].nutrientsLimit[nutrient]() === '') {
				self.meals[i].nutrientsLimit[nutrient]('')
				return '';
			};
			limitPerDay += +self.meals[i].nutrientsLimit[nutrient]();
		}
		return limitPerDay;
	}	
}	

