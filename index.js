// Initialize a flag to track login status
let loggedIn = false;

// Add event listener to the login form
document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Call login function when form is submitted
    login();
});

// Firebase auth state change listener
firebase.auth().onAuthStateChanged((user) => {
    if (user && loggedIn) {
        // If user is logged in and loggedIn flag is true, redirect to index2.html
        location.replace("index2.html");
    }
});

// Login function
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            // Set loggedIn to true upon successful login
            loggedIn = true;
            // Clear any previous error message
            document.getElementById("error").innerHTML = "";
        })
        .catch((error) => {
            // Display error message if login fails
            document.getElementById("error").innerHTML = error.message;
        });
}

// Sign up function
function signUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Set loggedIn to true upon successful sign up
            loggedIn = true;
            // Redirect to index2.html
            location.replace("index2.html");
        })
        .catch((error) => {
            // Display error message if sign-up fails
            if (error.code === 'auth/wrong-password') {
                document.getElementById("error").innerHTML = "Wrong password. Please try again.";
            } else {
                document.getElementById("error").innerHTML = error.message;
            }
        });
}
