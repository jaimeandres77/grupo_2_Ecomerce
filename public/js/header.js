(() => {
    // Menu desplagable
    const listElements = document.querySelectorAll('.nav__item--show');
    const list = document.querySelector('.nav__links');
    const menu = document.querySelector('.nav__hamburguer');

    const addClick = () => {
        listElements.forEach(el => {
            el.addEventListener('click',() => {
                let subMenu = el.children[1];
                let height = 0;
                el.classList.toggle('nav__item--active');
                if(subMenu.clientHeight === 0){
                    height = subMenu.scrollHeight;
                }
                subMenu.style.height = `${height}px`;
            })
        });
    }
    const deleteStyleHeight = () => {
        listElements.forEach(el => {
            if(el.children[1].getAttribute('style')){
                el.children[1].removeAttribute('style');
                el.classList.remove('nav__item--active');
            }
        });
    }
    window.addEventListener('resize',() => {
        if(window.innerWidth > 576){
            deleteStyleHeight();
            if(list.classList.contains('nav__links--show')){
                list.classList.remove('nav__links--show');
            }
        }else{
            addClick();
        }
    });
    if(window.innerWidth <= 576){
        addClick();
    }
    menu.addEventListener('click',() => list.classList.toggle('nav__links--show'));

})();