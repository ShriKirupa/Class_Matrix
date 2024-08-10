// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Example: Toggle sidebar visibility on small screens
    const toggleButton = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
});
