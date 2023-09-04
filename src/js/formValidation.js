document.addEventListener("DOMContentLoaded", function () {

  // Function to validate email using a regular expression
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const myForm = event.target;

    // Send the form data using fetch, excluding error messages
    const formData = new FormData(myForm);
    const errorMessages = myForm.querySelectorAll('.error-message');
    errorMessages.forEach(function (error) {
      formData.delete(error.getAttribute('for'));
    });

    // Reset error messages and input classes
    errorMessages.forEach(function (error) {
      error.style.display = 'none';
    });

    const labels = myForm.querySelectorAll('label');
    labels.forEach(function (label) {
      label.classList.remove('invalid'); // Remove the invalid class from labels
    });

    // Validation logic
    let hasErrors = false;

    // Common fields
    const name = myForm.elements.name ? myForm.elements.name.value.trim() : '';
    const email = myForm.elements.email ? myForm.elements.email.value.trim() : '';
    const message = myForm.elements.message ? myForm.elements.message.value.trim() : '';
    const datenschutzCheckbox = myForm.querySelector('input[name="datenschutz"]');
    const privacyError = myForm.querySelector('.privacy .error-message');

    // Check if name is empty (only if the field exists in the form)
    if (myForm.elements.name && name === '') {
      const nameError = myForm.querySelector('#name + .error-message');
      nameError.style.display = 'block';
      myForm.elements.name.classList.add('invalid');
      hasErrors = true;
      const nameLabel = myForm.querySelector('label[for="name"]');
      if (nameLabel) {
        nameLabel.classList.add('invalid');
      }
    } else if (myForm.elements.name) {
      myForm.elements.name.classList.remove('invalid');
    }

    // Check if email is empty or invalid (only if the field exists in the form)
    if (myForm.elements.email && email === '') {
      const emailError = myForm.querySelector('#email + .error-message');
      emailError.style.display = 'block';
      myForm.elements.email.classList.add('invalid');
      hasErrors = true;
      const emailLabel = myForm.querySelector('label[for="email"]');
      if (emailLabel) {
        emailLabel.classList.add('invalid');
      }
    } else if (myForm.elements.email && !isValidEmail(email)) {
      const emailError = myForm.querySelector('#email + .error-message');
      emailError.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
      emailError.style.display = 'block';
      myForm.elements.email.classList.add('invalid');
      hasErrors = true;
      const emailLabel = myForm.querySelector('label[for="email"]');
      if (emailLabel) {
        emailLabel.classList.add('invalid');
      }
    } else if (myForm.elements.email) {
      myForm.elements.email.classList.remove('invalid');
    }

    // Check if message is empty (only if the field exists in the form)
    if (myForm.elements.message && message === '') {
      const messageError = myForm.querySelector('#message + .error-message');
      messageError.style.display = 'block';
      myForm.elements.message.classList.add('invalid');
      hasErrors = true;
      const messageLabel = myForm.querySelector('label[for="message"]');
      if (messageLabel) {
        messageLabel.classList.add('invalid');
      }
    } else if (myForm.elements.message) {
      myForm.elements.message.classList.remove('invalid');
    }

    // Check if privacy checkbox is checked
    if (!datenschutzCheckbox.checked) {
      privacyError.style.display = 'block';
      hasErrors = true;
      const privacyLabel = myForm.querySelector('label[for="datenschutz"]');
      if (privacyLabel) {
        privacyLabel.classList.add('invalid');
      }
    } else {
      privacyError.style.display = 'none';
      myForm.querySelector('label[for="datenschutz"]').classList.remove('invalid');
    }

    // Additional fields for the "kontakt_ausbildung_bewerbung" form
    if (myForm.classList.contains('bewerbung')) {
      const vorname = myForm.elements.vorname ? myForm.elements.vorname.value.trim() : '';
      const nachname = myForm.elements.nachname ? myForm.elements.nachname.value.trim() : '';

      // Check if vorname is empty (only if the field exists in the form)
      if (myForm.elements.vorname && vorname === '') {
        const vornameError = myForm.querySelector('#vorname + .error-message');
        vornameError.style.display = 'block';
        myForm.elements.vorname.classList.add('invalid');
        hasErrors = true;
        const vornameLabel = myForm.querySelector('label[for="vorname"]');
        if (vornameLabel) {
          vornameLabel.classList.add('invalid');
        }
      } else if (myForm.elements.vorname) {
        myForm.elements.vorname.classList.remove('invalid');
      }

      // Check if nachname is empty (only if the field exists in the form)
      if (myForm.elements.nachname && nachname === '') {
        const nachnameError = myForm.querySelector('#nachname + .error-message');
        nachnameError.style.display = 'block';
        myForm.elements.nachname.classList.add('invalid');
        hasErrors = true;
        const nachnameLabel = myForm.querySelector('label[for="nachname"]');
        if (nachnameLabel) {
          nachnameLabel.classList.add('invalid');
        }
      } else if (myForm.elements.nachname) {
        myForm.elements.nachname.classList.remove('invalid');
      }
    }

    // Additional fields for the "files" section using IDs
    const anschreiben = document.getElementById('anschreiben');
    const foto = document.getElementById('foto');
    const lebenslauf = document.getElementById('lebenslauf');

    if (myForm.classList.contains('bewerbung')) {
      // Check if Anschreiben field is empty
      if (anschreiben && anschreiben.value === '') {
        const anschreibenError = document.getElementById('anschreiben-error'); // Updated selector
        anschreibenError.style.display = 'block';
        hasErrors = true;
        anschreiben.classList.add('invalid');
      }

      // Check if Foto field is empty
      if (foto && foto.value === '') {
        const fotoError = document.getElementById('foto-error'); // Updated selector
        fotoError.style.display = 'block';
        hasErrors = true;
        foto.classList.add('invalid');
      }

      // Check if Lebenslauf field is empty
      if (lebenslauf && lebenslauf.value === '') {
        const lebenslaufError = document.getElementById('lebenslauf-error'); // Updated selector
        lebenslaufError.style.display = 'block';
        hasErrors = true;
        lebenslauf.classList.add('invalid');
      }
    }

    // If there are validation errors, return and do not proceed with the fetch request
    if (hasErrors) {
      return;
    }

    // Send the form data using fetch
    fetch(myForm.action, {
      method: myForm.method,
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Successfully submitted, hide the form and show success message
          myForm.style.display = 'none';

          // Get all previous siblings of myForm and hide them
          let previousSibling = myForm.previousElementSibling;
          while (previousSibling) {
            previousSibling.style.display = 'none';
            previousSibling = previousSibling.previousElementSibling;
          }

          // Determine the ID of the success message based on the form's ID
          const formId = myForm.id;
          const successMessageId = `success-${formId}`;
          const successMessage = document.getElementById(successMessageId);
          if (successMessage) {
            successMessage.style.display = 'block';

            // Scroll to the top of the success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
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
    }
    // Optionally, you can add an else clause to handle cases where the form is not present.
    // For example:
    // else {
    //   console.error(`Form element with ID "${formId}" not found.`);
    // }
  }

  // Initialize forms with different IDs
  initializeForm('kontakt_ausbildung_bewerbung');
  initializeForm('kontakt_ausbildung');
  initializeForm('kontakt');
  initializeForm('direkterkontakt_ausbildung');
  initializeForm('direkterkontakt_berufserfahrene');
  initializeForm('kontakt_berufserfahren_bewerbung');
  initializeForm('kontakt_berufserfahren');

});




document.addEventListener("DOMContentLoaded", function () {
  // Function to clear the selected file for a specific input element
function clearFileInput(inputId) {
  const fileInput = document.getElementById(inputId);
  if (fileInput) {
    fileInput.value = ''; // Clear the selected file
  }
}

  // Attach change event listeners to the file input elements and update button visibility
  const fileInputIds = ["anschreiben", "foto", "lebenslauf", "weitereDateien"];

  fileInputIds.forEach(function (inputId) {
    const fileInput = document.getElementById(inputId);
    const clearButton = document.getElementById(`clear_${inputId}`);

    if (fileInput && clearButton) {
      fileInput.addEventListener("change", function () {
        toggleClearButtonVisibility(inputId);
      });

      clearButton.addEventListener("click", function () {
        clearFileInput(inputId);
        toggleClearButtonVisibility(inputId);
      });
    }
  });

  // Function to toggle the visibility of the "Clear" button based on file selection
  function toggleClearButtonVisibility(inputId) {
    const clearButton = document.getElementById(`clear_${inputId}`);
    const fileInput = document.getElementById(inputId);

    if (clearButton && fileInput) {
      if (fileInput.files.length > 0) {
        clearButton.style.display = "block"; // Show the button
      } else {
        clearButton.style.display = "none"; // Hide the button
      }
    }
  }

  // ... (Rest of the code)
});

