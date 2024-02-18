function imageTemplate({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            data-source="${largeImageURL}"
            alt="${tags}"
          />
          <ul class="gallery-info-list">
            <li class="gallery-info-item">
              <h3 class="gallery-info-title">Likes</h3>
              <p class="gallery-info-quantity">${likes}</p>
            </li>
            <li class="gallery-info-item">
              <h3 class="gallery-info-title">Views</h3>
              <p class="gallery-info-quantity">${views}</p>
            </li>
            <li class="gallery-info-item">
              <h3 class="gallery-info-title">Comments</h3>
              <p class="gallery-info-quantity">${comments}</p>
            </li>
            <li class="gallery-info-item">
              <h3 class="gallery-info-title">Downloads</h3>
              <p class="gallery-info-quantity">${downloads}</p>
            </li>
          </ul>
        </a>
      </li>
      `;
}

export function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}
