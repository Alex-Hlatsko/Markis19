
        // $(document).ready(function() {
        //     $("#rega").on("submit", function() {
        //         $("#pageloader").fadeIn();
        //     }); //submit  
        // }); //document ready




        // NEW FORM SUBMIT CONTROL
        const $itiInstance = $('#telephone').intlTelInput({
            utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.18/js/utils.js',
            autoPlaceholder: 'aggressive',
            formatOnDisplay: true,
            //initialCountry: 'PL',
            //onlyCountries: ['PL'], 
            initialCountry: 'auto', 
            geoIpLookup: function (success, failure) {
             	$.get("https://ipinfo.io/?token=5811e5a20de2f8", function () { }, "jsonp").always(function (resp) {
             		var countryCode = (resp && resp.country) ? resp.country : "us";
             		success(countryCode);
             	});
             },
            nationalMode: true,
            placeholderNumberType: "FIXED_LINE_OR_MOBILE",
            separateDialCode: true,
            hiddenInput: 'phone',
        });
        $itiInstance.on('keyup', function() {
            const errorMap = ['Wrong number', 'Wrong country code', 'Short number', 'Long number', 'Wrong number', 'Wrong code'];
            const value = $(this).val();
            const num = $(this).intlTelInput('getNumber');
            const isValid = $(this).intlTelInput('isValidNumber');
            const errorCode = $(this).intlTelInput('getValidationError');
			
            if (isValid) {
                const $phoneErrors = $(this).parent().parent().find('.phone-errors');
                if ($phoneErrors.hasClass('phone-errors__active')) {
                    $phoneErrors.removeClass('phone-errors__active');
                }
                if ($(this).hasClass('__error')) {
                    $(this).removeClass('__error');
                }
            } else {
                $(this).addClass('__error');
            }
        });

        $itiInstance.on('blur', function() {
            const errorMap = ['Wrong number', 'Wrong country code', 'Short number', 'Long number', 'Wrong number', 'Wrong code'];
            const isValid = $(this).intlTelInput('isValidNumber');
            const errorCode = $(this).intlTelInput('getValidationError');
            const countryCode = $(this).intlTelInput('getSelectedCountryData').iso2;
            const phoneExampleByCountryCode = {
                'au': '41-123-12-12',
                'nz': '3-345-6789',
                'pl': '512 345 678',
                'ca': '506-234-5678',
                'uk': '121 234 5678'
            };

            if (!isValid) {
                const $phoneErrors = $(this).parent().parent().find('.phone-errors');
                $phoneErrors.addClass('phone-errors__active');
                let message = 'Phone number is not correct!';
                if (errorMap[errorCode]) {
                    message = errorMap[errorCode];
                }
                if (phoneExampleByCountryCode[countryCode]) {
                    message += "<br>Phone number example: " + phoneExampleByCountryCode[countryCode];
                }
                $phoneErrors.html(message);
            }
        });

        $itiInstance.on('countrychange', function(e, countryData) {
            const in_country = $(this).intlTelInput("getSelectedCountryData").iso2;
            $("input[name=country]").val(in_country.toUpperCase());
            // $("input[name=currency_code]").val(getPhoneCurrency(in_country.toUpperCase()));
        });

        $('form').submit(function() {
            const $phoneInput = $(this).find('[name=phone]');
            const isValid = $phoneInput.intlTelInput('isValidNumber');
            if (!isValid) {
                return false;
            }
            console.log('after checking...')
            // script from code index.php row 500
            $("#pageloader").fadeIn();
            $(this).find('button').attr('disabled', true);
            // script from code index.php row 500
        });

        // rewrited script from scriptForm.js
        $itiInstance.on("focusout", function(e, countryData) {
            // var intlNumber = $(this).intlTelInput('getNumber', intlTelInputUtils.numberFormat.NATIONAL);
            var intlNumber = $(this).intlTelInput('getNumber');
            $('input[name="phonesub"]').val(intlNumber);
            console.log(intlNumber);
            console.log($('input[name="phonesub"]').val());
        });
        // rewrited script from scriptForm.js

        // from scriptForm.js
        $(function() {
            // var regExp = /^\w*(\.\w*)?@\w*\.[a-z]+(\.[a-z]+)?$/;
            var regExp = /^([\w\.\+]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/;

            $('[type="email"]').on('keyup', function() {
                $('.message').hide();
                regExp.test($(this).val()) ? $('.message.success').show() : $('.message.error').show();
            });
        });
        // from scriptForm.js
        // NEW FORM SUBMIT CONTROL

        $.get("https://ipinfo.io/?token=5811e5a20de2f8", function(response) {
            $('input[name="ip"]').val(response.ip);
            $('input[name="country"]').val(response.country);
            $('input[name="city"]').val(response.city);
        }, "jsonp");
