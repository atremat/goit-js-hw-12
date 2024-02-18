import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { imagesTemplate } from './js/render-functions.js';

let gallery = null;

const refs = {
  form: document.querySelector('.form'),
  textInput: document.querySelector('#query'),
  searchBtn: document.querySelector('.search-button'),
  galleryList: document.querySelector('.gallery-list'),
  searchLoader: document.querySelector('.search-loader'),
  moreLoader: document.querySelector('.more-loader'),
  moreBtn: document.querySelector('.more-button'),
  moreWrapper: document.querySelector('.more-wrapper'),
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
  spinner: true,
};

// ======================================
let query;
let page;
let maxPage;

refs.form.addEventListener('submit', onFormSubmit);
refs.moreBtn.addEventListener('click', onLoadMoreClick);

// ======================================

async function onFormSubmit(e) {
  e.preventDefault();
  query = e.target.elements.query.value.trim();
  page = 1;

  if (!query) {
    showError('Empty field');
    return;
  }

  showLoader();

  try {
    const data = await fetchImages(query, page);
    if (data.total === 0) {
      showError(
        `Sorry, there are no images matching your search query. Please try again!`
      );
    }
    maxPage = Math.ceil(data.total / 15);
    refs.galleryList.innerHTML = '';
    renderGallery(data.hits);

    gallery = new SimpleLightbox('.gallery-list a', simplelightboxOptions);
    gallery.refresh();
  } catch (err) {
    console.error(err);
    showError(err);
  }

  hideLoader();
  checkBtnVisibleStatus();
  e.target.reset();
}

async function onLoadMoreClick() {
  page += 1;
  showLoader();
  const data = await fetchImages(query, page);
  renderGallery(data.hits);
  hideLoader();
  checkBtnVisibleStatus();

  gallery.destroy();
  gallery = new SimpleLightbox('.gallery-list a', simplelightboxOptions);
  gallery.refresh();

  const height =
    refs.galleryList.firstElementChild.getBoundingClientRect().height;

  scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}

// ======================================
function renderGallery(images) {
  const markup = imagesTemplate(images);
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}

function showLoadBtn() {
  refs.moreWrapper.classList.remove('hidden');
}
function hideLoadBtn() {
  refs.moreWrapper.classList.add('hidden');
}

function showLoader() {
  refs.searchLoader.classList.remove('hidden');
}
function hideLoader() {
  refs.searchLoader.classList.add('hidden');
}

function showError(msg) {
  iziToast.error({
    message: msg,
    position: 'topRight',
  });
}

function checkBtnVisibleStatus() {
  if (page >= maxPage) {
    hideLoadBtn();
  } else {
    showLoadBtn();
  }
}
// ========================================
