
window.onload = function() {
    const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    

    const formData = {
      name: fullName,
      email : email,
      password :password,
      passwordConfirm: confirmPassword
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/users/singup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Registration successful
        const { token } = data;
        localStorage.setItem('token', token);
        window.location.href = '/index.html';
      } else {
        // Registration failed
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('An error occurred. Please try again later.');
    }
  });  
}

