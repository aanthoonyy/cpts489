document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('petitionForm');
  const signaturesList = document.getElementById('signaturesList');

  const loadSignatures = () => {
    fetch('/api/signers')
      .then((response) => response.json())
      .then((data) => {
        signaturesList.innerHTML = '';
        data.forEach((signer) => {
          const li = document.createElement('li');
          li.textContent = `${signer.name} - ${signer.email} - ${signer.city} - ${signer.state}`;
          signaturesList.appendChild(li);
        });
      })
      .catch((err) => console.error(err));
  };

  loadSignatures();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
    };

    fetch('/petition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        loadSignatures();
        form.reset();
      })
      .catch((err) => console.error(err));
  });
});
