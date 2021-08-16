const popups = () => {

    // variables

    const popups = document.querySelectorAll('.popup'),
        btnsOpenPopup = document.querySelectorAll('.open-popup'),
        totalPrice = document.getElementById('total-price'),
        calculation = document.getElementById('calc'),
        inputQtyDays = document.getElementById('quantity_days');


    // functions

    const openPopup = (name) => {
        if (name === 'calc') {
            let errors = false;
            if (totalPrice.value === '') {
                errors = true;
                errorMessage('show',calculation);
                calculation.scrollIntoView({
                    block: 'center',
                    behavior: "smooth"
                });
            }
            if (!errors) {
                popups.forEach(popup => {
                    if (popup.attributes.title.nodeValue === name) {
                        const popupContent = popup.querySelector('.popup__content');
         
                        popup.style.visibility = 'visible';
                        popupContent.classList.add('popup__content-active');
         
                        popup.addEventListener('click', (event) => {
                            if (event.target.closest('.popup__close')) {
                                closePopup(popupContent, popup);
                            }
                        });
                        popup.addEventListener('mousedown', (event) => {
                            if (!event.target.closest('.popup__content')) {
                                closePopup(popupContent, popup);
                            }
                        });
                    }
                });
            }
        } else {
            popups.forEach(popup => {
                if (name === 'rent_car') {
                    if (popup.attributes[0].nodeValue === "rent_car") {
                        inputQtyDays.addEventListener('input', (event) => {
                            let regExp = /[^\d]/g;
                            let target = event.target;
                            target.value = target.value.replace(regExp, '');
                            errorMessage('hide', target);
                            if (+target.value > 30) {
                                target.value = 30;
                                errorMessage('show', target);
                            }
                        });
                    }
                }
                if (popup.attributes.title.nodeValue === name) {
                    const popupContent = popup.querySelector('.popup__content');
     
                    popup.style.visibility = 'visible';
                    popupContent.classList.add('popup__content-active');
     
                    popup.addEventListener('click', (event) => {
                        if (event.target.closest('.popup__close')) {
                            closePopup(popupContent, popup);
                        }
                    });
                    popup.addEventListener('mousedown', (event) => {
                        if (!event.target.closest('.popup__content')) {
                            closePopup(popupContent, popup);
                        }
                    });
                }
            });
        }
    }
 
    const closePopup = (popupContent, popup) => {
        popupContent.classList.remove('popup__content-active');
        popup.style.visibility = 'hidden';
    }

    const errorMessage = (message, target) => {
        target = message === 'show' ?
        target.nextElementSibling.style.display = 'block' :
        target.nextElementSibling.style.display = 'none';
     }

    // listebers

    btnsOpenPopup.forEach(btn => {
        btn.addEventListener('click', (event) => {
            openPopup(event.target.name);
        });
    });


}

export default popups;