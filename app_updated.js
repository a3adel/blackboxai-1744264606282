function handleForgotPassword(e) {
    e.preventDefault();
    const phone = document.getElementById('resetPhone').value;
    const otpSection = document.getElementById('otpSection'); 
    const sendOtpBtn = document.getElementById('sendOtpBtn');

    if (!otpSection.classList.contains('hidden')) {
        // Verify OTP
        const otp = document.getElementById('otp').value;
        if (otp === '123456') { // Mock OTP verification
            alert('Password reset successful! Please check your phone for the new password.');
            showLoginScreen(e);
        }
    } else {
        // Send OTP
        otpSection.classList.remove('hidden');
        sendOtpBtn.textContent = 'Verify OTP';
        alert('OTP sent to your phone!');
    }
}
