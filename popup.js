document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  // Load saved credentials
  chrome.storage.local.get(['lpu_username', 'lpu_password'], (result) => {
    if (result.lpu_username) {
      usernameInput.value = result.lpu_username;
    }
    if (result.lpu_password) {
      passwordInput.value = result.lpu_password;
    }
  });

  // Save credentials
  saveBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    chrome.storage.local.set({
      lpu_username: username,
      lpu_password: password
    }, () => {
      status.textContent = 'Credentials saved!';
      setTimeout(() => {
        status.textContent = '';
      }, 2000);
    });
  });
});
