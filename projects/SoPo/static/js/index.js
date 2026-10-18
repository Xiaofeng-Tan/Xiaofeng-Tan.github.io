window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();

    // Keep the press state visible for one frame instead of relying only on
    // the browser's very short-lived :active state.
    document.querySelectorAll('.publication-links .button').forEach(function(button) {
        var releaseTimer;

        function press() {
            window.clearTimeout(releaseTimer);
            button.classList.add('is-pressed');
        }

        function release() {
            window.clearTimeout(releaseTimer);
            releaseTimer = window.setTimeout(function() {
                button.classList.remove('is-pressed');
            }, 90);
        }

        button.addEventListener('pointerdown', press, { passive: true });
        button.addEventListener('pointerup', release, { passive: true });
        button.addEventListener('pointercancel', release, { passive: true });
        button.addEventListener('pointerleave', release, { passive: true });
        button.addEventListener('blur', release);
        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') press();
        });
        button.addEventListener('keyup', release);
    });

})
