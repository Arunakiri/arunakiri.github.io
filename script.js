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

// call after DOM loaded
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.spread').forEach(sp => {
    const src = sp.dataset.img;
    if (src) {
      sp.style.setProperty('--img', `url("${src}")`);
      // set background-image also for li elements fallback
      sp.querySelectorAll('li').forEach(li => {
        li.style.backgroundImage = `url("${src}")`;
      });
    }
    // optional sizes
    const w = sp.dataset.w;
    const h = sp.dataset.h;
    if (w) sp.style.width = isNaN(w) ? w : (w + 'px');
    if (h) sp.style.height = isNaN(h) ? h : (h + 'px');
  });
});

// document.querySelectorAll('.spread').forEach(tile => {
//     tile.addEventListener('mousemove', e => {
//         const rect = tile.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         const rotateY = ((x / rect.width) - 0.5) * 22;  // tilt side
//         const rotateX = ((y / rect.height) - 0.5) * -22; // tilt up/down

//         tile.style.transform =
//             `translateZ(80px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
//     });

//     tile.addEventListener('mouseleave', () => {
//         tile.style.transform = `translateZ(0) rotateX(40deg)`; // back to fold angle
//     });
// });

document.querySelectorAll('.spread').forEach(tile => {
    
    const baseX = 28;   // base tilt back
    const baseY = -12;  // base tilt left
    const baseZ = 30;   // depth pop

    tile.addEventListener('mousemove', e => {
        const rect = tile.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // calculate dynamic tilt
        const tiltY = ((x / rect.width) - 0.5) * 16;   // left↔️right tilt
        const tiltX = ((y / rect.height) - 0.5) * -16; // forward/back tilt

        tile.style.transform = `
            translateZ(${baseZ}px)
            rotateX(${baseX + tiltX}deg)
            rotateY(${baseY + tiltY}deg)
        `;
    });

    tile.addEventListener('mouseleave', () => {
        tile.style.transform = `
            translateZ(${baseZ}px)
            rotateX(${baseX}deg)
            rotateY(${baseY}deg)
        `;
    });
});