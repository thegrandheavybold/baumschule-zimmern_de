const handleSubmit = (event) => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch(myForm.action, {
    method: myForm.method,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      // Hide the form and h2 element
      myForm.style.display = "none";
      const h2Element = myForm.previousElementSibling; // Get the previous sibling (the h2 element)
      if (h2Element) {
        h2Element.style.display = "none";
      }

      // Unhide the success message
      const successMessage = document.getElementById('success');
      successMessage.classList.remove('hidden');
    })
    .catch((error) => alert(error));
};

const form = document.getElementById('kontakt');
form.addEventListener("submit", handleSubmit);