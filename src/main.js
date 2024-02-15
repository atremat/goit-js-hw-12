import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

let page; //current page
let searchText = ''; //getting from input
let totalPages; //total number of pages; using it for more button
let gallery = null; //simplelightbox instance

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

refs.form.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  //page = 1 by default
  page = 1;

  //total by default
  totalPages = 0;

  //show css-loader
  loaderShow(refs.searchLoader);

  //getting value of input
  searchText = e.currentTarget.elements.query.value;

  try {
    //getting images
    const data = await getImages(searchText);

    //calculating total nunmber of pages
    totalPages = Math.ceil(data.total / 15);

    //if we're not on last page( there are more pages except current page) , then show more button
    moreBtnCheck();

    createGallery(data);
  } catch (err) {
    console.log(err);
  }
  refs.form.reset();
}

//getting images
async function getImages(searchText) {
  //parameters of searching query
  const searchParams = new URLSearchParams({
    key: '42031589-0742425241f8784341d5a922f',
    q: searchText,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });

  const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
  const data = response.data;

  return data;
}

function templateImage({ largeImageURL, webformatURL, tags }) {
  return `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            data-source="${largeImageURL}"
            alt="${tags}"
          />
        </a>
      </li>
      `;
}

function templateImages(images) {
  return images.map(templateImage).join('\n');
}

function loaderHide(loader) {
  loader.classList.add('hidden');
}

function loaderShow(loader) {
  loader.classList.remove('hidden');
}

function moreBtnHide() {
  refs.moreWrapper.classList.add('hidden');
}

function moreBtnShow() {
  refs.moreWrapper.classList.remove('hidden');
}

//deciding to show more button or not
function moreBtnCheck() {
  if (page < totalPages) {
    moreBtnShow();
  } else {
    moreBtnHide();
  }
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
    loaderHide(refs.searchLoader);

    //hiding load more button
    return;
  }

  //if images are found, then rendering gallery
  refs.galleryList.innerHTML = templateImages(data.hits);

  //hiding css-load
  loaderHide(refs.searchLoader);

  initSimpleLightBox();
}

function initSimpleLightBox() {
  gallery = new SimpleLightbox('.gallery-list a', simplelightboxOptions);
  gallery.refresh();
}

refs.moreBtn.addEventListener('click', onMoreClick);

async function onMoreClick(e) {
  //check if the last page is downloaded, then disable more button and message show
  if (page + 1 === totalPages) {
    moreBtnHide();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }

  //loader show bottom
  loaderShow(refs.moreLoader);
  try {
    page += 1;
    gallery.destroy();
    const data = await getImages(searchText);
    const markup = templateImages(data.hits);

    moreBtnCheck;
    loaderHide(refs.moreLoader);
    refs.galleryList.insertAdjacentHTML('beforeend', markup);
    smoothScroll();
    initSimpleLightBox();
  } catch (err) {
    loaderHide(refs.moreLoader);
    console.log(err);
  }
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');

  // gettinf height of item
  const galleryItemHeight = galleryItem.getBoundingClientRect().height;

  // scroll fun
  window.scrollBy({
    top: galleryItemHeight * 2, // scroll with 2 heights of item
    behavior: 'smooth', // make scroll smooth
  });
}
