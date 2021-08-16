const sendForms = () => {
    

    $('.phone-valid').each(function() {
        
        $(this).intlTelInput({
            initialCountry: "auto",
            geoIpLookup: function(callback) {
                jQuery.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                    const countryCode = (resp && resp.country) ? resp.country : 'ES';
                    callback(countryCode)
                });
            },
            autoFormat: false,
            nationalMode: false,
            preferredCountries: ["ru", "ua", "es", "lt", "lv", "bg"],
            utilsScript: 'src/script/utils.js'
        });


        $(this).on('input', function() {
            let value = $(this).val();
            value = value.replace(/[^\d\/+]/g, '');
            $(this).val(value);
        });
    });

    $('form').each(function() {
        $(this).submit(function() {
            console.log($(this))
            let errors = false;
            const errorMessage = $(this).find('.form-error');
            errorMessage.css("display", "none");
            $(this).find('.input-normal').removeClass('input-normal-invalid');

            $(this).find('input, textarea').each(function () {
                let regExp = /^\d+$/;

                if($.trim($(this).val()) == '' && $(this).hasClass('required') ||
                    $.trim($(this).val()) == regExp && $(this).attr('type') === 'tel') {
                    errors = true;
                    if ($(this).hasClass('required')) {
                        $(this).addClass('input-normal-invalid');
                        
                        const id = $(this).attr('id');
                        errorMessage.each(function () {
                            if (id === $(this).attr('for')) {
                                $(this).css("display", "block");
                            }
                        });
                    };
                }
            });

            if (!errors) {
                const thanks = $( this ).find('.thanks-mesage');
                const dataForm = $( this ).serialize();
                $.ajax({
                    url: '../src/mail-send.php',
                    type: 'POST',
                    data: dataForm,
                    success: function(result) {
                        thanks.css('display', 'block');
                        setTimeout(function(){
                            thanks.css('display', 'none');
                        }, 5000);
                    },
                    error: function() {
                        console.log('Error');
                        thanks.css('display', 'block');
                        setTimeout(function(){
                            thanks.css('display', 'none');
                        }, 5000);
                    }
                });
            }

            return false;
        });
    });
};

export default sendForms;