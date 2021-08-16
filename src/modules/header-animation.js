const headerAnimation = () => {
    
    // Variables

    const header = document.getElementById('header'),
       arrowUp = document.getElementById('arrow-up'),
       logo = document.querySelector('.logo');
    
    let arrowShow = false;
    
    // Functions

    // Listeners

    window.addEventListener('scroll', function() {
        if (pageYOffset > 300) {
            if(!header.classList.contains('header-light')) {
                header.classList.add('header-light');
                arrowShow = true;
                arrowUp.style.display = 'flex';
            }
        } else {
            header.classList.remove('header-light');
            arrowShow = false;
            arrowUp.style.display = 'none';
        }
        if (!!arrowShow) {
            arrowUp.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
            logo.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        }
    });
};

export default headerAnimation;