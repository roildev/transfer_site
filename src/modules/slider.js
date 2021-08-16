const slider = () => {
    $('.slider').slick({
        arrows: true,
        dots: true,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: true,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        draggable: true,
        swipe: true,
        touchTreshold: 10,
        centerMode: false
    });
};

export default slider;