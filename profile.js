// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBS544NgDcblQ758GGKXoQA4S3Lni2uZJc",
    authDomain: "login-46940.firebaseapp.com",
    projectId: "login-46940",
    storageBucket: "login-46940.appspot.com",
    messagingSenderId: "957634357712",
    appId: "1:957634357712:web:d80b80ac60bf273877f1d5",
    measurementId: "G-1L1PECR66G",
    
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore service
const db = firebase.firestore();

// Get the form and input elements
const userForm = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

// Handle form submission
userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const name = nameInput.value;
    const email = emailInput.value;

    try {
        // Add user data to Firestore
        await db.collection('users').add({
            name: name,
            email: email
        });

        alert('User data added successfully!');
        // Optionally, clear the form
        userForm.reset();
    } catch (error) {
        console.error('Error adding user data: ', error);
        alert('Failed to add user data. Please try again.');
    }
});
