import{a as l,i as u,S as d}from"./assets/vendor-b42c18af.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const s={form:document.querySelector(".form"),textInput:document.querySelector("#query"),searchBtn:document.querySelector(".search-button"),galleryList:document.querySelector(".gallery-list"),loader:document.querySelector(".loader")},f={captions:!0,captionDelay:250,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionClass:"",captionHTML:!0};s.form.addEventListener("submit",m);async function m(a){a.preventDefault(),g();const t=a.currentTarget.elements.query.value,n=new URLSearchParams({key:"42031589-0742425241f8784341d5a922f",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15});try{const o=await y(n);h(o)}catch(o){console.log(o)}}async function y(a){return(await l.get(`https://pixabay.com/api/?${a}`)).data}function p(a){return a.map(t=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${t.largeImageURL}">
          <img
            class="gallery-image"
            src="${t.webformatURL}"
            data-source="${t.largeImageURL}"
            alt="${t.tags}"
          />
        </a>
      </li>
      `).join(`
`)}function c(){s.loader.classList.add("is-hidden")}function g(){s.loader.classList.remove("is-hidden")}function h(a){if(a.total===0){u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),s.galleryList.innerHTML="",c();return}s.galleryList.innerHTML=p(a.hits),c(),new d(".gallery-list a",f).refresh()}
//# sourceMappingURL=commonHelpers.js.map
