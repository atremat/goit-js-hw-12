import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { PixabayAPI } from './js/pixabay-api.js';
import { imagesTemplate } from './js/render-functions.js';

//creating instance of SimpleLightbox
let simplelightboxInstance = null;

//creating instance of PixabayAPI
const pixabayApi = new PixabayAPI();

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
};

let query; //contains value of input
let page; //contains value of current page
let maxPage; //contains value of last page

refs.form.addEventListener('submit', onFormSubmit);
refs.moreBtn.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault();
  //getting value of input
  query = e.target.elements.query.value.trim();
  //by default current page equals 1
  page = 1;

  //checking if input is empty
  if (!query) {
    showError('Empty field');
    return;
  }

  //shows loader
  showLoader();

  try {
    //fetching images
    const data = await pixabayApi.getImages(query, page);
    //checking if images are not found
    if (data.total === 0) {
      showError(
        `Sorry, there are no images matching your search query. Please try again!`
      );
    }
    //calculating last page
    maxPage = Math.ceil(data.total / pixabayApi.PER_PAGE);
    //after submit we have to delete last contents
    refs.galleryList.innerHTML = '';
    //rendering gallery
    renderGallery(data.hits);

    //creating instance of SimpleLightbox
    simplelightboxInstance = new SimpleLightbox(
      '.gallery-list a',
      simplelightboxOptions
    );
    //refreshing SimpleLightbox
    simplelightboxInstance.refresh();
  } catch (err) {
    console.error(err);
    showError(err);
  }

  //hiding loader
  hideLoader();
  //check if we have to show More button
  checkBtnVisibleStatus();
  //clear input
  e.target.reset();
}

//more button clicked
async function onLoadMoreClick() {
  //page increased after clicked
  page += 1;
  //show loader
  showLoader();
  //check if it is the last page and show info
  if (page === maxPage) {
    showInfo("We're sorry, but you've reached the end of search results.");
  }
  //getting images
  const data = await pixabayApi.getImages(query, page);
  //rendering html
  renderGallery(data.hits);
  //hide loader
  hideLoader();
  //check if it is the last page
  checkBtnVisibleStatus();

  //refreshing instance of simplelightbox to update our gallery
  simplelightboxInstance.refresh();

  //getting height of <li> element for scrollBy
  const height =
    refs.galleryList.firstElementChild.getBoundingClientRect().height;

  //using window method scrollBy to scroll after adding new images
  scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}

//rendering into html
function renderGallery(images) {
  const markup = imagesTemplate(images);
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}

//shows 'More button'
function showLoadBtn() {
  refs.moreWrapper.classList.remove('hidden');
}

//hides 'More button'
function hideLoadBtn() {
  refs.moreWrapper.classList.add('hidden');
}

//shows loader
function showLoader() {
  refs.searchLoader.classList.remove('hidden');
}

//hides loader
function hideLoader() {
  refs.searchLoader.classList.add('hidden');
}

//show message error styling
function showError(msg) {
  iziToast.error({
    message: msg,
    position: 'topRight',
  });
}

//show message info styling
function showInfo(msg) {
  iziToast.info({
    message: msg,
    position: 'topRight',
  });
}

//check if the page is last
function checkBtnVisibleStatus() {
  if (page >= maxPage) {
    hideLoadBtn();
  } else {
    showLoadBtn();
  }
}
