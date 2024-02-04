import{a as y,i as p,S as g}from"./assets/vendor-b42c18af.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();let u,l="";const a={form:document.querySelector(".form"),textInput:document.querySelector("#query"),searchBtn:document.querySelector(".search-button"),galleryList:document.querySelector(".gallery-list"),searchLoader:document.querySelector(".search-loader"),moreLoader:document.querySelector(".more-loader"),moreBtn:document.querySelector(".more-button")},h={captions:!0,captionDelay:250,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionClass:"",captionHTML:!0};a.form.addEventListener("submit",L);async function L(r){r.preventDefault(),u=1,f(a.searchLoader),l=r.currentTarget.elements.query.value;try{const e=await d(l);S(e)}catch(e){console.log(e)}}async function d(r){const e=new URLSearchParams({key:"42031589-0742425241f8784341d5a922f",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:u});return(await y.get(`https://pixabay.com/api/?${e}`)).data}function m(r){return r.map(e=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${e.largeImageURL}">
          <img
            class="gallery-image"
            src="${e.webformatURL}"
            data-source="${e.largeImageURL}"
            alt="${e.tags}"
          />
        </a>
      </li>
      `).join(`
`)}function s(r){r.classList.add("hidden")}function f(r){r.classList.remove("hidden")}function S(r){if(r.total===0){p.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),a.galleryList.innerHTML="",s(a.searchLoader);return}a.galleryList.innerHTML=m(r.hits),s(a.searchLoader),new g(".gallery-list a",h).refresh()}a.moreBtn.addEventListener("click",b);async function b(r){//!loader show bottom
f(a.moreLoader);try{u+=1;const e=await d(l),n=m(e.hits);s(a.moreLoader),a.galleryList.insertAdjacentHTML("beforeend",n)}catch(e){s(a.moreLoader),console.log(e)}}
//# sourceMappingURL=commonHelpers.js.map
