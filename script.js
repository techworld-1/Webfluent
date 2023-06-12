document.getElementById('registration-form').addEventListener('submit', function(event) {
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');
    var gradeInput = document.getElementById('grade');
  
    var errorMessages = [];
  
    if (nameInput.value === '') {
      errorMessages.push('Please enter your name.');
    }
  
    if (emailInput.value === '') {
      errorMessages.push('Please enter your email.');
    }
  
    if (phoneInput.value === '') {
      errorMessages.push('Please enter your phone number.');
    }
  
    if (gradeInput.value === '') {
      errorMessages.push('Please select your grade.');
    }
  
    if (errorMessages.length > 0) {
      event.preventDefault();
      var errorContainer = document.createElement('div');
      errorContainer.className = 'error';
      errorContainer.innerHTML = errorMessages.join('<br>');
      document.getElementById('registration-form').appendChild(errorContainer);
    }
  });
  