document.addEventListener("DOMContentLoaded", function () {
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
      label.classList.remove('invalid');
    });

    // Validation logic
    let hasErrors = false;

    // Common fields
    const name = myForm.elements.name ? myForm.elements.name.value.trim() : '';
    const email = myForm.elements.email ? myForm.elements.email.value.trim() : '';
    const message = myForm.elements.message ? myForm.elements.message.value.trim() : '';
    const datenschutzCheckbox = myForm.querySelector('input[name="datenschutz"]');
    if (datenschutzCheckbox && datenschutzCheckbox.checked) {
      formData.append('Datenschutz', 'Datenschutzbestimmungen akzeptiert');
    }
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

    // File size validation for "anschreiben" input
    const anschreibenInput = myForm.querySelector('#anschreiben');
    if (anschreibenInput) {
      const anschreibenError = myForm.querySelector('#anschreiben-error');
      const anschreibenSizeError = myForm.querySelector('#anschreiben-size-error');
      const files = anschreibenInput.files;
      if (files.length > 0) {
        const maxSizeBytes = 4 * 1024 * 1024; // 4MB
        const fileSizeBytes = files[0].size;
        if (fileSizeBytes > maxSizeBytes) {
          anschreibenSizeError.style.display = 'block';
          hasErrors = true;
          anschreibenInput.classList.add('invalid');
        }
      } else {
        anschreibenError.style.display = 'block';
        hasErrors = true;
        anschreibenInput.classList.add('invalid');
      }
    }

    // File size validation for "foto" input
    const fotoInput = myForm.querySelector('#foto');
    if (fotoInput) {
      const fotoError = myForm.querySelector('#foto-error');
      const fotoSizeError = myForm.querySelector('#foto-size-error');
      const files = fotoInput.files;
      if (files.length > 0) {
        const maxSizeBytes = 4 * 1024 * 1024; // 4MB
        const fileSizeBytes = files[0].size;
        if (fileSizeBytes > maxSizeBytes) {
          fotoSizeError.style.display = 'block';
          hasErrors = true;
          fotoInput.classList.add('invalid');
        }
      } else {
        fotoError.style.display = 'block';
        hasErrors = true;
        fotoInput.classList.add('invalid');
      }
    }

    // File size validation for "lebenslauf" input
    const lebenslaufInput = myForm.querySelector('#lebenslauf');
    if (lebenslaufInput) {
      const lebenslaufError = myForm.querySelector('#lebenslauf-error');
      const lebenslaufSizeError = myForm.querySelector('#lebenslauf-size-error');
      const files = lebenslaufInput.files;
      if (files.length > 0) {
        const maxSizeBytes = 4 * 1024 * 1024; // 4MB
        const fileSizeBytes = files[0].size;
        if (fileSizeBytes > maxSizeBytes) {
          lebenslaufSizeError.style.display = 'block';
          hasErrors = true;
          lebenslaufInput.classList.add('invalid');
        }
      } else {
        lebenslaufError.style.display = 'block';
        hasErrors = true;
        lebenslaufInput.classList.add('invalid');
      }
    }

    // File size validation for "weitereDateien" input
    const weitereDateienInput = myForm.querySelector('#weitereDateien');
    if (weitereDateienInput) {
      const weitereDateienSizeError = myForm.querySelector('#weitereDateien-size-error');
      const files = weitereDateienInput.files;
      if (files.length > 0) {
        const maxSizeBytes = 4 * 1024 * 1024; // 4MB
        const fileSizeBytes = files[0].size;
        if (fileSizeBytes > maxSizeBytes) {
          weitereDateienSizeError.style.display = 'block';
          hasErrors = true;
          weitereDateienInput.classList.add('invalid');
        }
      }
    }

     // Check for the "bewerbung" class to enable validation for additional fields
    if (myForm.classList.contains('bewerbung')) {
      // Validate "Vorname" and "Nachname" fields
      const vorname = myForm.elements.vorname ? myForm.elements.vorname.value.trim() : '';
      const nachname = myForm.elements.nachname ? myForm.elements.nachname.value.trim() : '';

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

    // Handle the "Ansprache" checkboxes
    const anspracheCheckboxes = myForm.querySelectorAll('input[name="ansprache"]:checked');
    const selectedAnsprache = Array.from(anspracheCheckboxes).map((checkbox) => {
      const label = myForm.querySelector(`label[for="${checkbox.id}"]`);
      return label ? `"${label.textContent.trim()}"` : '';
    });

    // Construct the "Ansprache" string for the email
    const anspracheString = selectedAnsprache.length > 0 ? `Ansprache: ${selectedAnsprache.join(', ')}` : '';

    // Append the anspracheString to the form data with a specific key
    formData.append('EmailAnsprache', anspracheString);



    if (hasErrors) {
      return;
    }

    // Send the form data using fetch
    fetch("/", {
      body: formData,
      method: "POST",
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

