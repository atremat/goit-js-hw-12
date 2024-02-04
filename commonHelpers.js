import{a as g,i as m,S as h}from"./assets/vendor-b42c18af.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}})();let s,d="",c;const o={form:document.querySelector(".form"),textInput:document.querySelector("#query"),searchBtn:document.querySelector(".search-button"),galleryList:document.querySelector(".gallery-list"),searchLoader:document.querySelector(".search-loader"),moreLoader:document.querySelector(".more-loader"),moreBtn:document.querySelector(".more-button"),moreWrapper:document.querySelector(".more-wrapper")},L={captions:!0,captionDelay:250,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionClass:"",captionHTML:!0};o.form.addEventListener("submit",S);async function S(r){r.preventDefault(),s=1,c=null,y(o.searchLoader),d=r.currentTarget.elements.query.value;try{const e=await f(d);w(e)}catch(e){console.log(e)}o.form.reset()}async function f(r){const e=new URLSearchParams({key:"42031589-0742425241f8784341d5a922f",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s}),n=(await g.get(`https://pixabay.com/api/?${e}`)).data;return c=Math.ceil(n.total/15),console.log(n.total),console.log("total pages: ",c),console.log("current page",s),s!=c&&q(),n}function p(r){return r.map(e=>`
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
`)}function l(r){r.classList.add("hidden")}function y(r){r.classList.remove("hidden")}function b(){o.moreWrapper.classList.add("hidden")}function q(){o.moreWrapper.classList.remove("hidden")}function w(r){if(r.total===0){m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),o.galleryList.innerHTML="",l(o.searchLoader);return}o.galleryList.innerHTML=p(r.hits),l(o.searchLoader),new h(".gallery-list a",L).refresh()}o.moreBtn.addEventListener("click",P);async function P(r){s+1===c&&(b(),m.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),y(o.moreLoader);try{s+=1;const e=await f(d),i=p(e.hits);l(o.moreLoader),o.galleryList.insertAdjacentHTML("beforeend",i)}catch(e){l(o.moreLoader),console.log(e)}}
//# sourceMappingURL=commonHelpers.js.map
