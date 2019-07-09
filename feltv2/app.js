
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {

        //slide the nav back in and out of view
        nav.classList.toggle('nav-active');

        //animate nav links - utilize the index to space out the fade-in animation and then remove the animation when clicking out burger
        navLinks.forEach( (link, index) => {
            if(link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `navLinkFadeIn 0.5s ease forwards ${index/5 + .35}s`;
            }
        });

        burger.classList.toggle('burger-active');
    });

}

navSlide();