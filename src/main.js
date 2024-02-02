import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const refs = {
  form: document.querySelector('.form'),
  textInput: document.querySelector('#query'),
  searchBtn: document.querySelector('.search-button'),
  galleryList: document.querySelector('.gallery-list'),
  loader: document.querySelector('.loader'),
};

//options for simplelightbox
const simplelightboxOptions = {
  captions: true,
  captionDelay: 250,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionClass: '',
  captionHTML: true,
};

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  //show css-loader
  loaderShow();

  //value of input
  const searchText = e.currentTarget.elements.query.value;

  //parameters of searching query
  const searchParams = new URLSearchParams({
    key: '42031589-0742425241f8784341d5a922f',
    q: searchText,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  //fetch photos
  axios
    .get(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      createGallery(response.data);
    })
    .catch(error => console.log(error))
    .finally(() => {
      refs.form.reset();
    });
}

function renderGalleryMarkup(photoList) {
  //creating markup
  return photoList
    .map(photo => {
      return `
      <li class="gallery-item">
        <a class="gallery-link" href="${photo.largeImageURL}">
          <img
            class="gallery-image"
            src="${photo.webformatURL}"
            data-source="${photo.largeImageURL}"
            alt="${photo.tags}"
          />
        </a>
      </li>
      `;
    })
    .join('\n');
}

function loaderHide() {
  refs.loader.classList.add('is-hidden');
}

function loaderShow() {
  refs.loader.classList.remove('is-hidden');
}

function createGallery(data) {
  //if images are not found, then alert
  if (data.total === 0) {
    iziToast.error({
      message: `Sorry, there are no images matching your search query. Please try again!`,
      position: 'topRight',
    });

    //clear gallery if images not found
    refs.galleryList.innerHTML = '';

    //hiding css-load
    loaderHide();
    return;
  }

  //if images are found, then rendering gallery
  refs.galleryList.innerHTML = renderGalleryMarkup(data.hits);

  //hiding css-load
  loaderHide();

  //initializing simplelightbox
  const gallery = new SimpleLightbox('.gallery-list a', simplelightboxOptions);
  gallery.refresh();
}
