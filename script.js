document.addEventListener('DOMContentLoaded', function() {
    let currentSelectedItem = null; // Variable to keep track of the currently selected item
    let currentBackgroundColor = ''; // Variable to keep track of the current background color

    // Function to check if social media items are touching the bottom of the viewport
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

    // Function to toggle the display of social details
    function toggleDetails(event) {
        // Prevent the default link behavior
        event.preventDefault();

        // Stop the click event from propagating to the document
        event.stopPropagation();

        // Get the details and link of the clicked item
        const details = this.querySelector('.social-details');
        const link = this.querySelector('a').href;
        const isVisible = details.classList.contains('show');

        // Hide all social details
        document.querySelectorAll('.social-details').forEach(detail => {
            detail.classList.remove('show');
        });

        // Show or hide the clicked item's details
        if (!isVisible) {
            details.classList.add('show');

            // Update the background color based on the clicked item
            const colorClass = this.classList[1] + '-bg'; // Get the color class from the icon's second class
            currentBackgroundColor = colorClass; // Preserve the background color
            document.body.className = colorClass; // Update the body's class name

            // Update the currentSelectedItem
            currentSelectedItem = this;
        } else {
            // Open the link in a new tab if the details are already visible
            window.open(link, '_blank');
        }
    }

    // Function to hide social details without changing background color
    function hideDetails() {
        document.querySelectorAll('.social-details').forEach(detail => {
            detail.classList.remove('show');
        });
    }

    // Handle clicks within the profile container
    function handleClickInside(event) {
        // Close the details if any are open
        hideDetails();
    }

    // Attach click event listeners to all social media items
    document.querySelectorAll('.social-media-item').forEach(item => {
        item.addEventListener('click', toggleDetails);
    });

    // Attach click event listener to the profile container to close details on click
    document.querySelector('.profile-container').addEventListener('click', handleClickInside);

    // Hide social details if clicking outside of the .profile-container
    document.addEventListener('click', function(event) {
        const profileContainer = document.querySelector('.profile-container');

        // Check if the click was outside of the profile container
        if (!profileContainer.contains(event.target)) {
            hideDetails();
        }
    });

    // Run the position check on scroll and resize
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', checkPosition);

    // Run the position check initially to set the correct state
    checkPosition();
});
