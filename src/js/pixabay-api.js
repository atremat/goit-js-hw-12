import axios from 'axios';

export class PixabayAPI {
  constructor() {
    this.API_KEY = '42031589-0742425241f8784341d5a922f';
    this.BASE_URL = 'https://pixabay.com';
    this.END_POINT = '/api/';
    this.url = `${this.BASE_URL}${this.END_POINT}`;
    this.PER_PAGE = 15;
  }

  async getImages(query, currentPage) {
    const params = {
      key: this.API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.PER_PAGE,
      page: currentPage,
    };

    const res = await axios.get(this.url, { params });
    return res.data;
  }
}
