
fetch('header.html')
  .then(response => response.text())
  .then(html => {
    const header = document.getElementById('header');
    header.innerHTML = html;
  });


fetch('footer.html')
  .then(response => response.text())
  .then(html => {
    const footer = document.getElementById('footer');
    footer.innerHTML = html;
  });
fetch('login.html')
  .then(response => response.text())
  .then(html => {
    const login = document.getElementById('login');
    login.innerHTML = html;
  });
fetch('register.html')
  .then(response => response.text())
  .then(html => {
    const register = document.getElementById('register');
    register.innerHTML = html;
  });

fetch('forgotpassword.html')
  .then(response => response.text())
  .then(html => {
    const fp = document.getElementById('zaboravljenalozinka');
    fp.innerHTML = html;
  });


  