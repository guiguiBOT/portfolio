console.log("hello");
let burgerIcon = document.querySelector('.burgerContainer');
let burgerHome = document.querySelector('#homeLinkBurger');
let burgerSkills = document.querySelector('#skillsLinkBurger')
let burgerAbout = document.querySelector('#aboutLinkBurger');
let burgerPortfolio = document.querySelector('#portfolioLinkBurger');
let burgerContact = document.querySelector('#contactLinkBurger');

burgerIcon.addEventListener('click', () => {
    if (burgerHome.classList.contains('disappearFirst')) {
        burgerHome.classList.replace('disappearFirst', 'appearFirst');
        burgerAbout.classList.replace('disappearSecond', "appearSecond");
        burgerSkills.classList.replace('disappearThird', "appearThird");
        burgerPortfolio.classList.replace('disappearFourth', "appearFourth");
        burgerContact.classList.replace('disappearFifth', "appearFifth");
    } else {
        burgerHome.classList.replace('appearFirst', 'disappearFirst');
        burgerAbout.classList.replace('appearSecond', "disappearSecond");
        burgerSkills.classList.replace('appearThird', "disappearThird");
        burgerPortfolio.classList.replace('appearFourth', "disappearFourth");
        burgerContact.classList.replace('appearFifth', "disappearFifth");
    }
});