const services = () => {

    // Variables

    const servisContent = document.querySelectorAll('.servis__content');
    
    // Listeners

    servisContent.forEach(card => {
        card.addEventListener('mouseover', (event) => {
            if (event.target.closest('.servis__content')) {
                card.childNodes[1].classList.remove('circle-big-active');
                card.childNodes[1].classList.add('circle-big-active');
                card.childNodes[3].classList.remove('circle-small-active');
                card.childNodes[3].classList.add('circle-small-active');
            }
        });
        card.addEventListener('mouseleave', (event) => {
            if (event.target.closest('.servis__content')) {
                card.childNodes[1].classList.remove('circle-big-active');
                card.childNodes[3].classList.remove('circle-small-active');
            }
        });
    });
}

export default services;