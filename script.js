// Smooth open/close for the project <details>. Without JS they still work, just without the animation.
document.documentElement.classList.add('js');

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const EASE = 'cubic-bezier(.2, .7, .2, 1)';

document.querySelectorAll('.project').forEach((details) => {
  const summary = details.querySelector('summary');
  const body = details.querySelector('.body');
  let animation = null;

  summary.addEventListener('click', (event) => {
    if (reduceMotion.matches) return;
    event.preventDefault();

    // Read the current height before cancelling, so a click mid-animation reverses from where it is.
    // A closed <details> still lays out its content in Chrome, so treat closed as 0.
    const from = details.open ? body.getBoundingClientRect().height : 0;
    if (animation) animation.cancel();

    const closing = details.open && !details.classList.contains('closing');

    if (closing) {
      details.classList.add('closing');
      details.classList.remove('opening');
      animation = body.animate(
        { height: [`${from}px`, '0px'], opacity: [1, 0] },
        { duration: 260, easing: EASE }
      );
      animation.onfinish = () => {
        details.open = false;
        details.classList.remove('closing');
        animation = null;
      };
    } else {
      details.classList.remove('closing');
      details.open = true;
      details.classList.add('opening');
      const to = body.scrollHeight;
      animation = body.animate(
        { height: [`${from}px`, `${to}px`] },
        { duration: 380, easing: EASE }
      );
      animation.onfinish = () => {
        details.classList.remove('opening');
        animation = null;
      };
    }
  });
});

// Fade screenshots in once they have loaded (they are lazy, so this happens on first open).
document.querySelectorAll('figure img').forEach((img) => {
  if (img.complete && img.naturalWidth) img.classList.add('loaded');
  else img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
});
