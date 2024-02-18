import{a as P,S as b,i as h}from"./assets/vendor-5401a4b0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function l(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=l(r);fetch(r.href,o)}})();class q{constructor(){this.API_KEY="42031589-0742425241f8784341d5a922f",this.BASE_URL="https://pixabay.com",this.END_POINT="/api/",this.url=`${this.BASE_URL}${this.END_POINT}`,this.PER_PAGE=15}async getImages(t,l){const s={key:this.API_KEY,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:this.PER_PAGE,page:l};return(await P.get(this.url,{params:s})).data}}function E({largeImageURL:e,webformatURL:t,tags:l,likes:s,views:r,comments:o,downloads:n}){return`
      <li class="gallery-item">
        <a class="gallery-link" href="${e}">
          <img
            class="gallery-image"
            src="${t}"
            data-source="${e}"
            alt="${l}"
          />
          <ul class="gallery-info-list">
            <li class="gallery-info-item">
              <h3 class="gallery-info-title">Likes</h3>
              <p class="gallery-info-quantity">${s}</p>
            </li>
            <li class="gallery-info-item">
              <h3 class="gallery-info-title">Views</h3>
              <p class="gallery-info-quantity">${r}</p>
            </li>
            <li class="gallery-info-item">
              <h3 class="gallery-info-title">Comments</h3>
              <p class="gallery-info-quantity">${o}</p>
            </li>
            <li class="gallery-info-item">
              <h3 class="gallery-info-title">Downloads</h3>
              <p class="gallery-info-quantity">${n}</p>
            </li>
          </ul>
        </a>
      </li>
      `}function S(e){return e.map(E).join("")}let m=null;const d=new q,i={form:document.querySelector(".form"),textInput:document.querySelector("#query"),searchBtn:document.querySelector(".search-button"),galleryList:document.querySelector(".gallery-list"),searchLoader:document.querySelector(".search-loader"),moreLoader:document.querySelector(".more-loader"),moreBtn:document.querySelector(".more-button"),moreWrapper:document.querySelector(".more-wrapper")},w={captions:!0,captionDelay:250,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionClass:"",captionHTML:!0};let c,a,f;i.form.addEventListener("submit",A);i.moreBtn.addEventListener("click",I);async function A(e){if(e.preventDefault(),c=e.target.elements.query.value.trim(),a=1,!c){u("Empty field");return}y();try{const t=await d.getImages(c,a);t.total===0&&u("Sorry, there are no images matching your search query. Please try again!"),f=Math.ceil(t.total/d.PER_PAGE),i.galleryList.innerHTML="",p(t.hits),m=new b(".gallery-list a",w),m.refresh()}catch(t){console.error(t),u(t)}g(),L(),e.target.reset()}async function I(){a+=1,y(),a===f&&B("We're sorry, but you've reached the end of search results.");const e=await d.getImages(c,a);p(e.hits),g(),L(),m.refresh();const t=i.galleryList.firstElementChild.getBoundingClientRect().height;scrollBy({behavior:"smooth",top:t*2})}function p(e){const t=S(e);i.galleryList.insertAdjacentHTML("beforeend",t)}function _(){i.moreWrapper.classList.remove("hidden")}function v(){i.moreWrapper.classList.add("hidden")}function y(){i.searchLoader.classList.remove("hidden")}function g(){i.searchLoader.classList.add("hidden")}function u(e){h.error({message:e,position:"topRight"})}function B(e){h.info({message:e,position:"topRight"})}function L(){a>=f?v():_()}
//# sourceMappingURL=commonHelpers.js.map
