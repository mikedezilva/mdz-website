document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waitlist-form');
    const successMessage = document.getElementById('success-message');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email-input').value;
        
        if (email) {
            // Here you would normally send the email to your backend (e.g. Mailchimp, ConvertKit, etc.)
            // For now, we'll simulate a successful submission.
            
            // Add a small delay to simulate network request
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Submitting...</span>';
            btn.disabled = true;
            
            setTimeout(() => {
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');
            }, 800);
        }
    });
});
