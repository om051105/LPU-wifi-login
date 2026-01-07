// function to attempt login
function attemptLogin() {
    chrome.storage.local.get(['lpu_username', 'lpu_password'], (result) => {
        if (!result.lpu_username || !result.lpu_password) {
            console.log('LPU Auto-Connect: No credentials found. Please set them in the extension popup.');
            return;
        }

        console.log('LPU Auto-Connect: Attempting to fill credentials...');

        // Try multiple potential selectors since we don't know the exact ones
        // Common patterns for login forms
        const usernameFields = [
            document.querySelector('input[name="username"]'),
            document.querySelector('input[name="userId"]'),
            document.querySelector('input[type="text"]'),
            document.getElementById('username'),
            document.getElementById('userId')
        ];

        const passwordFields = [
            document.querySelector('input[name="password"]'),
            document.querySelector('input[type="password"]'),
            document.getElementById('password')
        ];

        const termsCheckbox = [
            document.querySelector('input[type="checkbox"]'), // Often "I agree to terms"
            document.getElementById('cbox'), // Common ID
            document.getElementById('terms')
        ];

        const loginButtons = [
            document.querySelector('button[type="submit"]'),
            document.querySelector('input[type="submit"]'),
            document.querySelector('.btn-login'),
            document.getElementById('loginbtn'),
            document.getElementById('login')
        ];

        // Filter out nulls and pick the first valid one
        const userField = usernameFields.find(el => el !== null);
        const passField = passwordFields.find(el => el !== null);
        const checkBox = termsCheckbox.find(el => el !== null);
        const loginBtn = loginButtons.find(el => el !== null);

        if (userField && passField) {
            userField.value = result.lpu_username;
            passField.value = result.lpu_password;

            // Dispatch events to ensure frameworks (like React/Angular) detect changes
            userField.dispatchEvent(new Event('input', { bubbles: true }));
            passField.dispatchEvent(new Event('input', { bubbles: true }));

            console.log('LPU Auto-Connect: Credentials filled.');

            // Check terms if it exists
            if (checkBox && !checkBox.checked) {
                checkBox.click();
                console.log('LPU Auto-Connect: Terms checked.');
            }

            // Click login
            if (loginBtn) {
                // Add a small delay to ensure values are registered
                setTimeout(() => {
                    console.log('LPU Auto-Connect: Clicking login...');
                    loginBtn.click();
                }, 500);
            } else {
                console.warn("LPU Auto-Connect: Login button not found. Please log in manually.");
            }

        } else {
            console.warn("LPU Auto-Connect: Could not find username or password fields.");
        }
    });
}

// Run on load
// Sometimes the page loads dynamically, so we might want to wait or use mutation observer.
// For now, let's try running immediately and after a short delay.
attemptLogin();
setTimeout(attemptLogin, 1000);
