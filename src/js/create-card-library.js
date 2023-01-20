// // Toma K

// // шукаю елементи
const CardListLibrary = document.querySelector('.gallery__card-list');
// console.log('galleryCardList', galleryCardList);


// // створюю рзмітку карток фільмів для галереї Функція приймає results: (відповідь сервера > response.data.results)
createMainGallery = (results)=>{

    return results.map( el => {
        const {id, poster_path, title, genre_ids, release_date} = el;
        // console.log('4', id, poster_path, title, genre_ids, release_date );
        const year = new Date(release_date).getFullYear();

        return `
            <li class="card-list__item">
                <img class="card-list__img" data-id="${id}" src="https://image.tmdb.org/t/p/w500${poster_path}" alt=" ${title} ">
                <h3 class="card-list__info card-list__title">${title}</h1>
                <p class="card-list__info card-list__text">${genre_ids} |  ${year} </p>
                <div class="card-list__rate"></div>
            </li>`
    } ).join('')
}