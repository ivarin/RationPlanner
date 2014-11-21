ko.bindingHandlers.datepicker = {
	init: function(element, valueAccessor) {
		var value = valueAccessor();

       	$(element).datepicker({	    	
	    	dateFormat: "dd/mm/yy",
	    	onSelect: function(){
	    	   	value(formatDate($(element).datepicker("getDate")));
	    	}
		});		

	    $(element).datepicker("setDate", new Date());
	    value(formatDate($(element).datepicker("getDate")));

	    function formatDate(date) {	
	    	var dd = date.getDate()
			if ( dd < 10 ) dd = '0' + dd;
			var mm = date.getMonth()+1
			if ( mm < 10 ) mm = '0' + mm;

			return dd+'.'+mm+'.'+date.getFullYear();
		}    
    }    
};