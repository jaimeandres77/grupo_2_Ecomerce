const inputPage = document.querySelector('input[name=page]');
const page = Number(inputPage.value.split('/')[0]);
const count = Number(inputPage.value.split('/')[1]);
const amountPages = Math.ceil(count/10);
const divPage = document.querySelector('#page');

const arrayPage = (amountPages,page) => {
const pages = [];
    if(amountPages > 1){
        if(page === 1){
            pages[0] = page;
            pages[1] = page + 1;
        } else if(page === amountPages){
            pages[0] = page - 1;
            pages[1] = page;
        } else if(page < amountPages){
            pages.push(page - 1);
            pages.push(page);
            pages.push(page + 1);
        }
    } else if(amountPages === 1){
        pages.push(page);
    }
    return pages;
}

const generarPage = (pages,amountPages,page,div) => {
    const url = location.pathname;
    if(pages[0] === page){
        pages.forEach(pg => {
            div.innerHTML += `<a href="${pg === 1 ? location.pathname : `${location.pathname}?page=${pg}`}" class="btn btn-secondary">${pg}</a>`;
        });
        if(pages.length > 1){
            div.innerHTML += `<a href="${location.pathname}?page=${page + 1}" class="btn btn-primary">>></a>`;
        }
    }
    else if(pages[1] === amountPages){
        div.innerHTML += `<a href="${location.pathname}?page=${page - 1}" class="btn btn-primary"><<</a>`;
        pages.forEach(pg => {
            div.innerHTML += `<a href="${location.pathname}?page=${pg}" class="btn btn-secondary">${pg}</a>`;
        });
    } else if(page > 0 && page < amountPages){
        div.innerHTML += `<a href="${location.pathname}?page=${page - 1}" class="btn btn-primary"><<</a>`;
        pages.forEach(pg => {
            div.innerHTML += `<a href="${location.pathname}?page=${pg}" class="btn btn-secondary">${pg}</a>`;
        });
        div.innerHTML += `<a href="${location.pathname}?page=${page + 1}" class="btn btn-primary">>></a>`;
    }
}

generarPage(arrayPage(amountPages,page),amountPages,page,divPage);