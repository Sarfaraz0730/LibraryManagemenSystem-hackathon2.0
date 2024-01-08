
function submitSignupForm() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    const apiUrl = 'http://localhost:8000/singup';
    console.log("apiUrl",apiUrl)


    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        
        if(data.message==="Registration successful"){
            console.log('Signup successful:', data);

            window.location.href = 'login.html';
        }
        else if(data.message ==="User already exist"){
            window.location.href = 'signup.html';
            alert("User already exist")
        }else{
            alert("registration failed to due to validation")
        }
        

    })
    .catch(error => {
        console.error('Error during signup:', error);
        alert('Signup failed. Please try again.'); 

    });
}
