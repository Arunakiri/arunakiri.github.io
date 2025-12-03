// small helpers
document.getElementById('year').textContent = new Date().getFullYear();

// Copy email button
document.getElementById('copyEmailBtn').addEventListener('click', function() {
    const email = 'arunakiri.v@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const btn = this;
        const originalText = btn.textContent;
        btn.textContent = '✓';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
});