
  function register() {
    const signupForm = document.getElementById('signupForm');
     signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
    const fullName = document.getElementById('name').value;
    const email = document.getElementById('email1').value;
    const password = document.getElementById('password1').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    console.log(fullName,email,password,confirmPassword);
    

    const formData = {
      name: fullName,
      email : email,
      password :password,
      passwordConfirm: confirmPassword
    };

    try {
      const token = 'token';
      const response = await fetch('http://localhost:3000/api/v1/users/singup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Registration successful
        const token = data.token;
  
        
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('name', fullName);
        window.location.href = '/SI2/PolovniAutomobili/frontend/index.html';
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

  function login() {
    const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const formData = {
    email,
    password
  };

  try {
    const token = 'your_bearer_token';
    const response = await fetch('http://localhost:3000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (response.ok) {
      // Login successful

      const { token, data: { user: { name, role, _id } } } = data;
      localStorage.setItem('email', email)
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('role', role);
      localStorage.setItem('id', _id);
      
      window.location.href = '/SI2/PolovniAutomobili/frontend/index.html';
    } else {
      // Login failed
      const { message } = data;
      alert(`Login failed: ${message}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    alert('An error occurred. Please try again later.');
  }
});

  }
 
  function hidden(){
   

    const adminTabla = document.querySelector(".admin-tabla");
    const adminTabla1 = document.querySelector(".admin-tabla1");
    const adminTabla2 = document.querySelector(".admin-tabla2");
    const adminTabla3 = document.querySelector(".admin-tabla3");
    const adminTabla4 = document.getElementById("admintabla");

    const loginbtn = document.getElementById("loginbtn");
    
    if (localStorage.getItem("token") !== null) {
      const name = localStorage.getItem("name");
      document.getElementById("user-name").textContent = name;
      loginbtn.hidden = true;
    }
    if (localStorage.getItem("role") === "user"){
      adminTabla4.hidden = true;
      if (adminTabla) {
        adminTabla.hidden = true;
      }
      if (adminTabla1) {
        adminTabla1.hidden = true;
      }
      if (adminTabla2) {
        adminTabla2.hidden = true;
      }
      if (adminTabla3) {
        adminTabla3.hidden = true;
      }
    }
                    
  }

  function logout() {
  localStorage.removeItem('email');
  localStorage.removeItem('name');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('id');
  window.location.href = '/SI2/PolovniAutomobili/frontend/index.html';
  
  }
