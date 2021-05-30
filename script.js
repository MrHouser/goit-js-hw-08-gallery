import pictures from './gallery-items.js';


const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');

gallery.addEventListener('click', onPreviewImageClick);
modal.addEventListener('click', closeModal);
window.addEventListener('keydown', onKeyPress);

gallery.innerHTML = makeMarkup (pictures);

const galleryImages = document.querySelectorAll('.gallery__image');

let imagesSrcArr = [];
galleryImages.forEach(im => {
    imagesSrcArr.push(im.dataset.source);
});


// Создание разметки
function makeMarkup (pictures) {
    return pictures.map(({ preview, original, description }) => {
        return `
            <li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                    >
                        <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                        />
                </a>
            </li> `
    }).join('');
};

// Открытие модалки
function onPreviewImageClick(evt) {
    
    evt.preventDefault();

    const currentImage = evt.target;
    if (!currentImage.classList.contains('gallery__image')) {
        return;
    }

    modal.classList.add('is-open');
    modalImage.src = currentImage.dataset.source;
    modalImage.alt = currentImage.alt;
    document.body.style.overflow = 'hidden';
    
};

// Закрытие модалки
function closeModal(evt) {
    onCloseBtnClick(evt);
    onBackdropClick(evt);    
};

// Закрытие модалки при клике на кнопку
function onCloseBtnClick(evt) {
    if (!evt.target.dataset.action) {
        return;
    }
    modal.classList.remove('is-open');
    modalImage.src = '';
    document.body.style.overflow = 'auto';
};

// Закрытие модалки при клике на бэкдроп
function onBackdropClick(evt) {
    if (!evt.target.classList.contains('lightbox__overlay')) {
        return;
    }
    modal.classList.remove('is-open');
    modalImage.src = '';
    document.body.style.overflow = 'auto';
};

// Обработчик нажатия клавиши при открытой модалке
function onKeyPress(evt) {
    if (!modal.classList.contains('is-open')) {
        return;
    }
    onEscPress(evt);
    onLeftOrRightArrowPress(evt);
};

// Закрытие модалки при нажатии на Esc
function onEscPress(evt) {
    if (evt.key !== "Escape") {
        return;
    }
    modal.classList.remove('is-open');
    modalImage.src = '';
};

//  Обработчик нажатия стрелок "влево" и "вправо"
function onLeftOrRightArrowPress(evt) {
    if (evt.key !== "ArrowLeft" && evt.key !== "ArrowRight") {
        return;
    }
    
    let newIndex;
    const currentIndex = imagesSrcArr.indexOf(modalImage.src); 

    if (evt.key === "ArrowLeft") {
        newIndex = currentIndex - 1;
        if (newIndex === -1) {
            newIndex = imagesSrcArr.length - 1;
        }
    } else {
        newIndex = currentIndex + 1;
        if (newIndex === imagesSrcArr.length) {
            newIndex = 0;
        }
    }

    modalImage.src = imagesSrcArr[newIndex];
};