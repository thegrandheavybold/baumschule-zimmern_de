// Function to validate email using a regular expression
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function handleSubmit(event) {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  // Reset error messages and input classes
  const errorMessages = myForm.querySelectorAll('.error-message');
  errorMessages.forEach(function (error) {
    error.style.display = 'none';
  });

  const labels = myForm.querySelectorAll('label');
  labels.forEach(function (label) {
    label.classList.remove('invalid'); // Remove the invalid class from labels
  });

  // Validation logic
  let hasErrors = false;

  const name = myForm.elements.name.value.trim();
  const email = myForm.elements.email.value.trim();
  const message = myForm.elements.message.value.trim();
  const datenschutz = myForm.elements.datenschutz.checked;

  // Check if name is empty
  if (name === '') {
    const nameError = myForm.querySelector('#name + .error-message');
    nameError.style.display = 'block';
    myForm.elements.name.classList.add('invalid'); // Add the invalid class to the input
    hasErrors = true;

    // Add the invalid class to the label associated with the input
    const nameLabel = myForm.querySelector('label[for="name"]');
    if (nameLabel) {
      nameLabel.classList.add('invalid');
    }
  } else {
    // Remove the 'invalid' class when the input field is not empty
    myForm.elements.name.classList.remove('invalid');
  }

  // Check if email is empty or invalid
  if (email === '') {
    const emailError = myForm.querySelector('#email + .error-message');
    emailError.style.display = 'block';
    myForm.elements.email.classList.add('invalid'); // Add the invalid class to the input
    hasErrors = true;

    // Add the invalid class to the label associated with the input
    const emailLabel = myForm.querySelector('label[for="email"]');
    if (emailLabel) {
      emailLabel.classList.add('invalid');
    }
  } else if (!isValidEmail(email)) {
    const emailError = myForm.querySelector('#email + .error-message');
    emailError.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    emailError.style.display = 'block';
    myForm.elements.email.classList.add('invalid'); // Add the invalid class to the input
    hasErrors = true;

    // Add the invalid class to the label associated with the input
    const emailLabel = myForm.querySelector('label[for="email"]');
    if (emailLabel) {
      emailLabel.classList.add('invalid');
    }
  } else {
    // Remove the 'invalid' class when the email input is valid
    myForm.elements.email.classList.remove('invalid');
  }

  // Check if message is empty
  if (message === '') {
    const messageError = myForm.querySelector('#message + .error-message');
    messageError.style.display = 'block';
    myForm.elements.message.classList.add('invalid'); // Add the invalid class to the input
    hasErrors = true;

    // Add the invalid class to the label associated with the input
    const messageLabel = myForm.querySelector('label[for="message"]');
    if (messageLabel) {
      messageLabel.classList.add('invalid');
    }
  } else {
    // Remove the 'invalid' class when the input field is not empty
    myForm.elements.message.classList.remove('invalid');
  }

  // Check if privacy checkbox is checked
  const datenschutzCheckbox = myForm.querySelector('input[name="datenschutz"]');
  const privacyError = myForm.querySelector('.privacy .error-message');

  if (!datenschutzCheckbox.checked) {
    privacyError.style.display = 'block'; // Show the error message
    hasErrors = true;
    // Add the invalid class to the label associated with the input
    const privacyLabel = myForm.querySelector('label[for="datenschutz"]');
    if (privacyLabel) {
      privacyLabel.classList.add('invalid');
    }
  } else {
    privacyError.style.display = 'none'; // Hide the error message
    // Remove the 'invalid' class when the checkbox is checked
    myForm.querySelector('label[for="datenschutz"]').classList.remove('invalid');
  }

  // If there are validation errors, do not proceed with the fetch request
  if (hasErrors) {
    return;
  }

  // Send the form data using fetch
  fetch(myForm.action, {
    method: myForm.method,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      if (response.ok) {
        // Successfully submitted, hide the form and show success message
        myForm.style.display = 'none';
        const h2Element = myForm.previousElementSibling; // Get the previous sibling (the h2 element)
        if (h2Element) {
          h2Element.style.display = 'none';
        }
        const successMessage = document.getElementById('success');
        successMessage.classList.remove('hidden');
      } else {
        // Handle error cases here, e.g., display an error message
        throw new Error('Failed to submit the form.');
      }
    })
    .catch((error) => {
      // Handle fetch errors, e.g., display an alert
      alert(error);
    });
}

function initializeForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener('submit', handleSubmit);
  } else {
    console.error(`Form element with ID "${formId}" not found.`);
  }
}

function initializeFormAusbildungBewerbung() {
  initializeForm('kontakt_ausbildung_bewerbung');
}

// Initialize forms with different IDs
initializeForm('kontakt');
initializeForm('kontakt_ausbildung');
initializeFormAusbildungBewerbung(); // Initialize the 'kontakt_ausbildung_bewerbung' form
initializeForm('direkterkontakt_ausbildung');
