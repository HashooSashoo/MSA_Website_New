// ============================================
// CONTACT FORM — EmailJS + hCaptcha
// ============================================

emailjs.init('zeGnu6KCd9LKVJ-GW');

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const captchaResponse = hcaptcha.getResponse();
    if (!captchaResponse) {
        showFormMessage('Please complete the captcha before submitting.', 'error');
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const params = {
        topic:   document.getElementById('topic').value,
        name:    document.getElementById('name').value,
        email:   document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    emailjs.send('service_ricemsaform', 'template_na6o649', params)
        .then(function () {
            showFormMessage('Your message has been sent! We will get back to you within 24–48 hours.', 'success');
            document.getElementById('contactForm').reset();
            hcaptcha.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Inquiry';
        })
        .catch(function () {
            showFormMessage('Something went wrong. Please try again or email us directly.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Inquiry';
        });
});

function showFormMessage(text, type) {
    let msg = document.getElementById('formMessage');
    if (!msg) {
        msg = document.createElement('p');
        msg.id = 'formMessage';
        document.getElementById('contactForm').appendChild(msg);
    }
    msg.textContent = text;
    msg.className = 'form-message form-message--' + type;
}
