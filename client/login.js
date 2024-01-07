
function submitLoginForm() {
         const email = document.getElementById('email').value;
         const password = document.getElementById('password').value;

         const apiUrl = 'http://localhost:8000/login';
         fetch(apiUrl, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ email, password }),
         })
             .then(response => response.json())
             .then(data => {
                 console.log('Login response:', data);

                 if (data.message === "Login successful") {
                     const token = data.token;
                     if (token) {
                         localStorage.setItem('token', token);
                         console.log('Stored Token:', token);
                     } else {
                         console.error('Token not found in data object');
                     }
                     alert('Login successful!');
                     window.location.href = './home.html';
                 } else {
                     alert('Login failed. Please check your credentials.');
                 }
             })
             .catch(error => {
                 console.error('Error during login:', error);
             });
     }
