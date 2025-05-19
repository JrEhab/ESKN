document.addEventListener('DOMContentLoaded', function() {
    const password = document.querySelector('input[placeholder="Password"]');
    const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]');
    const continueBtn = document.querySelector('.con');
    const lyt1 = document.querySelector('.lyt1');
    const lyt2 = document.querySelector('.lyt2');
    const otpInputs = document.querySelectorAll('.lyt2 input[type="text"]');

// check pass

    function checkPasswords() {
        const isValid = password.value === confirmPassword.value 
                      && password.value.length >= 8
                      && confirmPassword.value.length >= 8;
        
        continueBtn.disabled = !isValid;
    }

    password.addEventListener('input', checkPasswords);
    confirmPassword.addEventListener('input', checkPasswords);

    // 2. إدارة انتقال الواجهات
    continueBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if(password.value !== confirmPassword.value) {
            alert('Passwords do not match!');
            return;
        }

        // إخفاء lyt1 مع تأثير
        lyt1.style.opacity = '0';
        lyt1.style.visibility = 'hidden';
        lyt1.style.transition = 'all 0.5s ease';
        
        // إظهار lyt2 مع تأثير
        setTimeout(() => {
            lyt2.style.opacity = '1';
            lyt2.style.visibility = 'visible';
            lyt2.style.transition = 'all 0.5s ease';
            otpInputs[0].focus();
        }, 500);
    });

    // 3. إدارة إدخال OTP
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if(e.target.value.match(/^\d$/)) { // تقييد الإدخال لأرقام فقط
                if(index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            } else {
                e.target.value = '';
            }
        });

        input.addEventListener('keydown', (e) => {
            if(e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    // 4. التحقق النهائي من OTP
    document.querySelector('.lyt2 .con').addEventListener('click', function(e) {
        e.preventDefault();
        
        const otp = Array.from(otpInputs).map(input => input.value).join('');
        
        if(otp.length !== 6) {
            alert('Please enter full OTP code!');
            return;
        }
        
        // هنا يمكنك إضافة منطق التحقق من OTP
        console.log('Submitted OTP:', otp);
        alert('Registration successful!');
    });
});