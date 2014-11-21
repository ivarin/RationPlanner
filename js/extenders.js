ko.extenders.isNumber = function(target) {

    var result = ko.computed({
        read: target,
        write: function (value) {
            if (isFinite(value)) {
                target(value);
            } else {
                alert('Please enter a number');
                target.notifySubscribers('');                
            }
        }
    }).extend({ notify: 'always' });

    return result;
};
