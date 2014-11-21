$(function () {
	var RationPlannerVM = function (dishes) {
		var self = this;		
		
		self.dishTypes = function(){
			var types = [],
				i
			;		
			for(i = 0;  i < dishes.length; i++) {
				if(types.indexOf(dishes[i].type) == -1){
					types.push(dishes[i].type);
				} 		
			}
			return types.sort();
		};			

		self.filters = new Filters();

		self.currentDate = ko.observable();	
		self.allDays = ko.observableArray();	

		self.filteredDishes = ko.computed(function () {
			var nameFilter = self.filters.name(),
			 	typeFilter = self.filters.type(),
			 	ingredientFilter = self.filters.ingredients(),
			 	kcaloriesFilter = self.filters.kcalories(),
			 	proteinFilter = self.filters.protein(),
			 	carbsFilter = self.filters.carbs(),
			 	fatFilter = self.filters.fat(),
			 	result = []	 			
			;
			dishes.forEach(function(dish) {				
				if( (nameFilter && dish.name.toLowerCase().indexOf(nameFilter.toLowerCase()) == -1) || 
					(typeFilter && dish.type != typeFilter.toLowerCase()) || 
					(kcaloriesFilter && dish.kcalories > +kcaloriesFilter) || 
					(proteinFilter && dish.protein > +proteinFilter) || 
					(carbsFilter && dish.carbs > +carbsFilter) || 
					(fatFilter && dish.fat > +fatFilter) ) {
					return;
				} else if (ingredientFilter.length > 0) {
					var i, j;
					for(i = 0; i < dish.ingredients.length; i++) {
						for(j = 0; j < ingredientFilter.length; j++) {
							if(dish.ingredients[i] == ingredientFilter[j]) {
								return;
							}
						}
					}
				}
				result.push(dish);
			});		
			return result;			
		});

		self.filteredIngredients = ko.computed(function() {		
			var ingredients = [],
				i
			;		
			self.filteredDishes().forEach(function(dish) {
				for (i = 0; i < dish.ingredients.length; i++) {
					if (ingredients.indexOf(dish.ingredients[i]) == -1) {
						ingredients.push(dish.ingredients[i]);
					}
				}			
			});
			return ingredients.sort();
		});		

		self.currentDateRation = ko.computed(function(){		
			var currentDate = self.currentDate(),
				allDays = self.allDays(),
				newDay,
				i
			;
			for(i = 0; i < allDays.length; i++) {
				if (allDays[i].date == currentDate) {
					return allDays[i];
				}
			}
			newDay = new DailyRation(currentDate);
			self.allDays.push(newDay);		
			return newDay;		
		});
	};

ko.applyBindings(new RationPlannerVM(dishes));   

});