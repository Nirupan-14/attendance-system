class AttendanceApp {
    constructor() {
        this.currentUser = null;
        this.loginTime = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuthState();
        this.createFloatingElements();
    }

    bindEvents() {
        // Login form submission
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Input animations
        this.setupInputAnimations();
        
        // Feature card interactions
        this.setupFeatureCards();
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    setupInputAnimations() {
        const inputs = document.querySelectorAll('.input-group input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Handle initial state if input has value
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }

    setupFeatureCards() {
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', () => {
                this.animateCardClick(card);
            });
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + Enter to submit login form
            if (e.key === 'Enter' && e.ctrlKey) {
                const loginForm = document.getElementById('loginForm');
                if (loginForm.style.display !== 'none' && this.isPageActive('loginPage')) {
                    this.handleLogin();
                }
            }
            
            // Escape to logout (when on home page)
            if (e.key === 'Escape' && this.isPageActive('homePage')) {
                this.handleLogout();
            }
        });
    }

    async handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorDiv = document.getElementById('loginError');
        const loadingDiv = document.getElementById('loginLoading');
        const form = document.getElementById('loginForm');

        // Clear previous errors
        this.hideError();

        // Validate inputs
        if (!username || !password) {
            this.showError('Please fill in all fields');
            this.focusFirstEmptyField();
            return;
        }

        if (username.length < 3) {
            this.showError('Username must be at least 3 characters');
            document.getElementById('username').focus();
            return;
        }

        if (password.length < 4) {
            this.showError('Password must be at least 4 characters');
            document.getElementById('password').focus();
            return;
        }

        // Show loading state
        this.showLoadingState(true);

        try {
            // Simulate API call delay
            await this.delay(1500);

            // Validate credentials
            if (this.validateCredentials(username, password)) {
                this.loginUser(username);
            } else {
                throw new Error('Invalid username or password. Try: demo/demo');
            }
        } catch (error) {
            this.showError(error.message);
            this.showLoadingState(false);
            this.focusFirstEmptyField();
        }
    }

    validateCredentials(username, password) {
        // Demo credentials - replace with actual API validation
        const validCredentials = [
            { username: 'admin', password: 'admin123' },
            { username: 'teacher', password: 'teacher123' },
            { username: 'student', password: 'student123' },
            { username: 'demo', password: 'demo' },
            { username: 'user', password: 'user123' }
        ];

        return validCredentials.some(cred => 
            cred.username.toLowerCase() === username.toLowerCase() && 
            cred.password === password
        );
    }

    loginUser(username) {
        this.currentUser = username;
        this.loginTime = new Date().toLocaleString();
        
        // Update home page with user info
        document.getElementById('welcomeUser').textContent = this.capitalize(username);
        document.getElementById('currentUser').textContent = username;
        document.getElementById('loginTime').textContent = this.loginTime;

        // Show success animation
        this.showSuccessAnimation();

        // Delay redirect for better UX
        setTimeout(() => {
            this.showPage('homePage');
            this.resetLoginForm();
        }, 800);
    }

    handleLogout() {
        // Add confirmation dialog
        if (confirm('Are you sure you want to logout?')) {
            this.performLogout();
        }
    }

    performLogout() {
        // Clear user data
        this.currentUser = null;
        this.loginTime = null;
        
        // Show logout animation
        this.showLogoutAnimation();
        
        // Delay redirect
        setTimeout(() => {
            this.showPage('loginPage');
            this.hideError();
        }, 500);
    }

    showPage(pageId) {
        // Add transition effect
        document.body.classList.add('page-transition');
        
        setTimeout(() => {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });

            // Show target page
            document.getElementById(pageId).classList.add('active');
            
            // Complete transition
            document.body.classList.remove('page-transition');
            document.body.classList.add('page-transition', 'complete');
            
            setTimeout(() => {
                document.body.classList.remove('page-transition', 'complete');
            }, 300);
        }, 150);
    }

    showLoadingState(show) {
        const form = document.getElementById('loginForm');
        const loading = document.getElementById('loginLoading');
        
        if (show) {
            form.style.display = 'none';
            loading.style.display = 'block';
        } else {
            form.style.display = 'block';
            loading.style.display = 'none';
        }
    }

    resetLoginForm() {
        document.getElementById('loginForm').reset();
        this.showLoadingState(false);
        
        // Reset input group states
        document.querySelectorAll('.input-group').forEach(group => {
            group.classList.remove('focused');
        });
    }

    showError(message) {
        const errorDiv = document.getElementById('loginError');
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
        
        // Auto-hide error after 5 seconds
        setTimeout(() => {
            this.hideError();
        }, 5000);
    }

    hideError() {
        const errorDiv = document.getElementById('loginError');
        errorDiv.classList.remove('show');
    }

    showSuccessAnimation() {
        const form = document.getElementById('loginForm');
        form.style.transform = 'scale(0.95)';
        form.style.opacity = '0.7';
        
        setTimeout(() => {
            form.style.transform = 'scale(1.05)';
            form.style.opacity = '1';
        }, 200);
        
        setTimeout(() => {
            form.style.transform = '';
        }, 400);
    }

    showLogoutAnimation() {
        const container = document.querySelector('#homePage .container');
        container.style.transform = 'scale(0.95)';
        container.style.opacity = '0.7';
    }

    animateCardClick(card) {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'translateY(-3px) scale(1.02)';
        }, 150);
        setTimeout(() => {
            card.style.transform = '';
        }, 300);
    }

    focusFirstEmptyField() {
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        
        if (!username.value) {
            username.focus();
        } else if (!password.value) {
            password.focus();
        }
    }

    checkAuthState() {
        // This would typically check stored JWT tokens or session data
        // For demo purposes, we'll start with login page
        if (this.currentUser) {
            this.showPage('homePage');
        } else {
            this.showPage('loginPage');
        }
    }

    isPageActive(pageId) {
        return document.getElementById(pageId).classList.contains('active');
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    createFloatingElements() {
        const numberOfElements = 6;
        
        for (let i = 0; i < numberOfElements; i++) {
            const element = document.createElement('div');
            const size = Math.random() * 100 + 50;
            const animationDuration = Math.random() * 6 + 4;
            const startPosition = {
                top: Math.random() * 100,
                left: Math.random() * 100
            };
            
            element.className = 'floating-element';
            element.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${startPosition.top}%;
                left: ${startPosition.left}%;
                animation: float ${animationDuration}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            document.body.appendChild(element);
        }
    }

    // Utility method for future API integration
    async makeAPIRequest(url, method = 'POST', data = null) {
        try {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            
            if (data) {
                options.body = JSON.stringify(data);
            }
            
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create app instance
    window.attendanceApp = new AttendanceApp();
    
    // Add global error handler
    window.addEventListener('error', (e) => {
        console.error('Application error:', e.error);
    });
    
    // Add visibility change handler to pause animations when tab is not active
    document.addEventListener('visibilitychange', () => {
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach(element => {
            if (document.hidden) {
                element.style.animationPlayState = 'paused';
            } else {
                element.style.animationPlayState = 'running';
            }
        });
    });
    
    // Add performance optimization
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate responsive elements if needed
            console.log('Window resized, recalculating layout...');
        }, 250);
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AttendanceApp;
}