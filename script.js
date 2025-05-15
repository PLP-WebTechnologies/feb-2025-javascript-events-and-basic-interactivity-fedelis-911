// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ====================
    // 1. EVENT HANDLING 🎈
    // ====================
    
    // Button Click
    const clickButton = document.getElementById('clickButton');
    const clickOutput = document.getElementById('clickOutput');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked! 🎉';
        clickOutput.classList.add('celebrate');
        
        // Remove the animation class after it finishes
        setTimeout(() => {
            clickOutput.classList.remove('celebrate');
        }, 500);
    });
    
    // Hover Effects
    const hoverBox = document.getElementById('hoverBox');
    
    hoverBox.addEventListener('mouseenter', function() {
        this.textContent = 'Mouse is over me! 😊';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        this.textContent = 'Hover Over Me!';
    });
    
    // Keypress Detection
    const keypressOutput = document.getElementById('keypressOutput');
    
    document.addEventListener('keydown', function(event) {
        keypressOutput.textContent = `You pressed: ${event.key} (Key code: ${event.keyCode})`;
    });
    
    // Secret Action (Double-click or Long Press)
    const secretBox = document.getElementById('secretBox');
    const secretOutput = document.getElementById('secretOutput');
    let pressTimer;
    
    // Double-click handler
    secretBox.addEventListener('dblclick', function() {
        secretOutput.textContent = 'You discovered the double-click secret! 🎊';
    });
    
    // Long press handlers
    secretBox.addEventListener('mousedown', function() {
        // Set timer for long press (1 second)
        pressTimer = setTimeout(function() {
            secretOutput.textContent = 'You discovered the long press secret! 🕵️‍♂️';
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        // Clear the timer if mouse is released before 1 second
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        // Clear the timer if mouse leaves the element
        clearTimeout(pressTimer);
    });
    
    // ====================
    // 2. INTERACTIVE ELEMENTS 🎮
    // ====================
    
    // Button that changes text and color
    const colorChangingButton = document.getElementById('colorChangingButton');
    const colors = ['#2ecc71', '#e74c3c', '#3498db', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorChangingButton.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color ${colorIndex + 1} of ${colors.length}`;
    });
    
    // Image Gallery/Slideshow
    const galleryImages = document.querySelectorAll('.gallery img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentImageIndex = 0;
    
    // Show initial image
    galleryImages[currentImageIndex].classList.add('active');
    
    function showImage(index) {
        // Hide all images
        galleryImages.forEach(img => img.classList.remove('active'));
        
        // Ensure index is within bounds
        if (index >= galleryImages.length) {
            currentImageIndex = 0;
        } else if (index < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else {
            currentImageIndex = index;
        }
        
        // Show current image
        galleryImages[currentImageIndex].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        showImage(currentImageIndex - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        showImage(currentImageIndex + 1);
    });
    
    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
            });
            
            // Open current item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ====================
    // 3. FORM VALIDATION 📋
    // ====================
    
    const form = document.getElementById('validationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation for name
    nameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            nameError.textContent = 'Name is required';
        } else {
            nameError.textContent = '';
        }
    });
    
    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailError.textContent = '';
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });
    
    // Real-time password strength check
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Check password length
        if (password.length >= 8) strength += 1;
        
        // Check for uppercase letters
        if (/[A-Z]/.test(password)) strength += 1;
        
        // Check for numbers
        if (/[0-9]/.test(password)) strength += 1;
        
        // Check for special characters
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update strength meter
        const width = (strength / 4) * 100;
        strengthMeter.style.width = `${width}%`;
        
        // Update strength text and color
        if (password.length === 0) {
            strengthText.textContent = '';
            strengthMeter.style.backgroundColor = 'transparent';
        } else if (strength <= 1) {
            strengthText.textContent = 'Weak';
            strengthMeter.style.backgroundColor = '#e74c3c';
        } else if (strength <= 3) {
            strengthText.textContent = 'Medium';
            strengthMeter.style.backgroundColor = '#f39c12';
        } else {
            strengthText.textContent = 'Strong';
            strengthMeter.style.backgroundColor = '#2ecc71';
        }
        
        // Show error if password is too short
        if (password.length > 0 && password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
        } else {
            passwordError.textContent = '';
        }
    });
    
    // Form submission handler
    form.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        }
        
        // Validate email (if provided)
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email !== '' && !emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate password (if provided)
        if (passwordInput.value.length > 0 && passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            isValid = false;
        }
        
        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        } else {
            alert('Form submitted successfully!');
        }
    });
});
