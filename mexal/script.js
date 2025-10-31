document.addEventListener('DOMContentLoaded', function() {
    const outerDiv = document.getElementById('outerDiv');
    const closeFlote = document.getElementById('closeFlote');
    const floatCloseButton = document.getElementById('float-close-button');

    document.addEventListener('click', function(event) {
        if (outerDiv.style.right === '0px' && event.target !== outerDiv && event.target !== floatCloseButton) {
            outerDiv.style.right = '-290px';
        }
    });

    outerDiv.addEventListener('click', function(event) {
        outerDiv.style.right = '0';
        event.stopPropagation();
        floatCloseButton.classList.add('rotate'); // Add the 'rotate' class to trigger the rotation animation
    });

    closeFlote.addEventListener('click', function(event) {
        outerDiv.style.right = '-290px';
        event.stopPropagation();
    });

    floatCloseButton.addEventListener('transitionend', function() {
        floatCloseButton.classList.remove('rotate'); // Remove the 'rotate' class after the animation completes
    });
});
