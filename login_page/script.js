import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJXLug7xSgJqGhERsSVhfZRKFQT_5Fs-A",
  authDomain: "capslock-3a2e6.firebaseapp.com",
  projectId: "capslock-3a2e6",
  storageBucket: "capslock-3a2e6.appspot.com",
  messagingSenderId: "655058355606",
  appId: "1:655058355606:web:1cd82f81db7275cb7e89b7",
  measurementId: "G-4C0VL56Z5F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const authForm = document.getElementById("auth-form");
const googleSignInDiv = document.getElementById("google-signin");
const passwordField = document.getElementById("password");
const passwordIcon = document.getElementById("password-icon");
const authButton = document.getElementById("auth-button");
const toggleLink = document.getElementById("toggle-auth-link");
const pageTitle = document.getElementById("page-title");
const roleContainer = document.getElementById("role-container");

// Toggle password visibility
passwordIcon.addEventListener("click", function() {
  const type = passwordField.type === "password" ? "text" : "password";
  passwordField.type = type;
  passwordIcon.textContent = type === "password" ? "👁️" : "🙈";
});

// Handle form submission for email/password sign-in
authForm.addEventListener("submit", async function(event) {
  event.preventDefault();
  const userType = document.getElementById("user-type")?.value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      if (pageTitle.textContent === "Sign In" && userType) {
        // Save user data to MongoDB via backend API during sign-up
        const signupResponse = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, userType })
        });
        if (!signupResponse.ok) throw new Error('Error saving user data');
      }

      // Log in the user
      const loginResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (loginResponse.ok) {
        window.location.href = "logged.html"; // Redirect after successful sign-in
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during authentication:", error.message);
      alert("An error occurred. Please try again.");
    }
  }
});

// Handle Google Sign-In button
const googleSignInButton = document.createElement("button");
googleSignInButton.innerText = "Sign In with Google";
googleSignInButton.addEventListener("click", function() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Google User signed in:", user);

      // Save Google user details to MongoDB via backend API
      const { email, displayName, photoURL } = user;
      fetch('/api/google-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, displayName, photoURL })
      })
      .then(() => {
        window.location.href = "logged.html"; // Redirect after successful sign-in
      })
      .catch((error) => {
        console.error("Error saving Google user data:", error.message);
      });
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error.message);
    });
});
googleSignInDiv.appendChild(googleSignInButton);

// Toggle between Sign In and Log In pages
toggleLink.addEventListener("click", function(event) {
  event.preventDefault();
  const isSignInPage = pageTitle.textContent === "Sign In";
  pageTitle.textContent = isSignInPage ? "Log In" : "Sign In";
  roleContainer.style.display = isSignInPage ? "none" : "block";
  authButton.textContent = isSignInPage ? "Log In" : "Sign In";
  toggleLink.textContent = isSignInPage ? "Need to Sign In? Sign In " : "Already have an account? Log In";
});