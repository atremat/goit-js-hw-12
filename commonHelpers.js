import{a as c,i as u,S as d}from"./assets/vendor-b42c18af.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const i={form:document.querySelector(".form"),textInput:document.querySelector("#query"),searchBtn:document.querySelector(".search-button"),galleryList:document.querySelector(".gallery-list"),loader:document.querySelector(".loader")},f={captions:!0,captionDelay:250,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionClass:"",captionHTML:!0};i.form.addEventListener("submit",m);function m(o){o.preventDefault(),g();const t=o.currentTarget.elements.query.value,s=new URLSearchParams({key:"42031589-0742425241f8784341d5a922f",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0});c.get(`https://pixabay.com/api/?${s}`).then(a=>{p(a.data)}).catch(a=>console.log(a)).finally(()=>{i.form.reset()})}function y(o){return o.map(t=>`
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
`)}function l(){i.loader.classList.add("is-hidden")}function g(){i.loader.classList.remove("is-hidden")}function p(o){if(o.total===0){u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),i.galleryList.innerHTML="",l();return}i.galleryList.innerHTML=y(o.hits),l(),new d(".gallery-list a",f).refresh()}
//# sourceMappingURL=commonHelpers.js.map
