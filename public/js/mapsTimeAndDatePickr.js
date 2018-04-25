$(document).ready(function() {
    // sets up timepickr
    $(".timePickr").timepicker()
    // flatpickr
    var config = {
        dateFormat: "m/d/Y",
        minDate: new Date()
    }
    $('.pickr-date').flatpickr(config)

    if( $("#eventEditing").val() ==  "true" ){
        initAutocompleteEdit()
    }else{
        initAutocomplete()
    }
    $('#map').fadeIn(2000, function() {
        // Trigger a map resize
        google.maps.event.trigger(map, 'resize');
    })
})