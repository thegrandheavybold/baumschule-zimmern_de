//FormValidation
const form = document.querySelector('form');
const error = document.querySelector('.error-message');
const input = document.querySelector('input');
const label = document.querySelector('label');
const success = document.querySelector('.success');
const formSection = document.querySelector('.form_section');


form.addEventListener('submit', event => {
  success.classList.add('hidden');
  formSection.classList.remove('hidden');
  
  form.checkValidity();
  
  event.preventDefault();

  if (form.checkValidity()) {
    success.classList.remove('hidden');
    formSection.classList.add('hidden');    
  }
});

// Revalidate on each keypress once the field has changed 
input.addEventListener('input', event => {
  // Clear out any previous error.
  error.style.display = "none";
  label.classList.remove('error');
  
  // Trigger the validation check. If the input field is invalid, it will emit an
  // 'invalid' event.
  input.checkValidity();
});

input.addEventListener('invalid', event => {
  // Even with the novalidate attribute the form still
  // gives us a suitable error message; we just have to display it
  // ourselves.
  error.style.display = "block";
  label.classList.add('error');
  input.focus();
});


