document.addEventListener('DOMContentLoaded', function() {
    let currentSelectedItem = null;
    let currentBackgroundColor = '';

    function checkPosition() {
        const items = document.querySelectorAll('.social-media-item');
        const windowHeight = window.innerHeight;

        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.bottom > windowHeight) {
                item.classList.add('outside');
            } else {
                item.classList.remove('outside');
            }
        });
    }

    function toggleDetails(event) {
        event.preventDefault();
        event.stopPropagation();

        const details = this.querySelector('.social-details');
        const link = this.querySelector('a').href;
        const isVisible = details.classList.contains('show');

        document.querySelectorAll('.social-details').forEach(detail => {
            detail.classList.remove('show');
        });

        if (!isVisible) {
            details.classList.add('show');
            const colorClass = this.classList[1] + '-bg';
            currentBackgroundColor = colorClass;
            document.body.className = colorClass;
            currentSelectedItem = this;
        } else {
            window.open(link, '_blank');
        }
    }

    function hideDetails() {
        document.querySelectorAll('.social-details').forEach(detail => {
            detail.classList.remove('show');
        });
    }

    function handleClickInside(event) {
        hideDetails();
    }

    document.querySelectorAll('.social-media-item').forEach(item => {
        item.addEventListener('click', toggleDetails);
    });

    document.querySelector('.profile-container').addEventListener('click', handleClickInside);

    document.addEventListener('click', function(event) {
        const profileContainer = document.querySelector('.profile-container');

        if (!profileContainer.contains(event.target)) {
            hideDetails();
        }
    });

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', checkPosition);

    checkPosition();
});
