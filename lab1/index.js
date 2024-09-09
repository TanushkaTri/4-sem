document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('myForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();  

        var lastNameInput = document.querySelector('input[name="lastName"]');
        var lastNameErrorMessage = document.getElementById('lastNameError');

        var firstNameInput = document.querySelector('input[name="firstName"]');
        var firstNameErrorMessage = document.getElementById('firstNameError');

        var emailInput = document.querySelector('input[type="email"]');
        var emailErrorMessage = document.getElementById('emailError');

        var phoneInput = document.querySelector('input[type="tel"]');
        var phoneErrorMessage = document.getElementById('phoneError');

        var aboutMeTextarea = document.querySelector('textarea');
        var aboutMeErrorMessage = document.getElementById('aboutMeError');

        var citySelect = document.querySelector('select');
        var courseRadios = document.getElementsByName('course');
        var confirmationMessage = "Вы уверены в своих ответах?";

        validateLastName(lastNameInput, lastNameErrorMessage);
        validateFirstName(firstNameInput, firstNameErrorMessage);
        validateEmail(emailInput, emailErrorMessage);
        validatePhone(phoneInput, phoneErrorMessage);
        validateAboutMe(aboutMeTextarea, aboutMeErrorMessage);

        if (citySelect.value !== "city1") {
            if (!confirm(confirmationMessage)) {
                citySelect.classList.add('city-error');
                return; 
            }
        } else {
            citySelect.classList.remove('city-error');
        }

       
        if (!isAnyRadioChecked(courseRadios)) {
            if (!confirm(confirmationMessage)) {
                
                document.querySelector('.form-group label').classList.add('course-error');
                return;
            }
        } else {
            
            document.querySelector('.form-group label').classList.remove('course-error');
        }
        
        
        function isAnyRadioChecked(radioButtons) {
            for (var i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].checked) {
                    return true;
                }
            }
            return false;
        }
       
    });
 
    function validateLastName(input, errorMessageElement) {
        var value = input.value.trim();

        if (value === "") {
            errorMessageElement.textContent = "Поле не должно быть пустым!";
            errorMessageElement.style.color = 'red';
            return;
        }

        if (value.length > 20) {
            errorMessageElement.textContent = "Поле не должно содержать более 20 символов!";
            errorMessageElement.style.color = 'red';
            return;
        }

        if (!/^[а-яА-Яa-zA-Z]+$/.test(value)) {
            errorMessageElement.textContent = "Поле должно содержать только символы русского и английского алфавита!";
            errorMessageElement.style.color = 'red';
            return;
        }

        errorMessageElement.textContent = '';
    }

    function validateFirstName(input, errorMessageElement) {
        var value = input.value.trim();

        if (value === "") {
            errorMessageElement.textContent = "Поле не должно быть пустым!";
            errorMessageElement.style.color = 'red';
            errorMessageElement.style.s = 'red';
            return;
        }

        if (value.length > 20) {
            errorMessageElement.textContent = "Поле не должно содержать более 20 символов!";
            errorMessageElement.style.color = 'red';
            return;
        }

        if (!/^[а-яА-Яa-zA-Z]+$/.test(value)) {
            errorMessageElement.textContent = "Поле должно содержать только символы русского и английского алфавита!";
            errorMessageElement.style.color = 'red';
            return;
        }

        errorMessageElement.textContent = '';
    }



    function validateEmail(input, errorMessageElement) {
        var value = input.value.trim();

        if (value === "") {
            errorMessageElement.textContent = "Поле не должно быть пустым!";
            errorMessageElement.style.color = 'red';
            return;
        }

        if (/\s/.test(value)) {
            errorMessageElement.textContent = "Поле не должно содержать пробелы!";
            errorMessageElement.style.color = 'red';
            return;
        }

        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,5}\.[a-zA-Z]{2,3}$/;

        if (!emailPattern.test(value)) {
            errorMessageElement.textContent = "Неправильный формат E-mail!";
            errorMessageElement.style.color = 'red';
            return;
        }

        errorMessageElement.textContent = '';
    }

    function validatePhone(input, errorMessageElement) {
        var value = input.value.trim();
        var phonePattern = /^\(0\d{2}\)\d{3}-\d{2}-\d{2}$/;

        if (value === "") {
            errorMessageElement.textContent = "Поле не должно быть пустым!";
            errorMessageElement.style.color = 'red';
            return;
        }

        if (!phonePattern.test(value)) {
            errorMessageElement.textContent = "Некорректный формат телефона! Используйте (0xx)xxx-xx-xx";
            errorMessageElement.style.color = 'red';
            return;
        }

        errorMessageElement.textContent = '';

      
    }

    function validateAboutMe(textarea, errorMessageElement) {
        var value = textarea.value.trim();

        if (value.length > 250) {
            errorMessageElement.textContent = "Поле не должно содержать более 250 символов!";
            errorMessageElement.style.color = 'red';
            return;
        }

        errorMessageElement.textContent = '';
      
    }
    
});
