"use strict";var TAG_TYPE={link:HTMLLinkElement,script:HTMLScriptElement,img:HTMLImageElement},TYPES=Object.keys(TAG_TYPE);function findCurrentDomain(e,t){for(var n="",r=0;r<t.length;r++)if(-1!==e.indexOf(t[r])){n=t[r];break}return n||e}function findNextDomain(e,t){var n=findCurrentDomain(e,t),r=t.indexOf(n);return t[(r+1)%t.length]||e}function getRequestUrl(e){return e instanceof HTMLScriptElement||e instanceof HTMLImageElement?e.src:e instanceof HTMLLinkElement?e.href:null}var defaultConfig={max:3,type:TYPES,domain:[],crossOrigin:!1};function validateTargetInfo(e,t){var n,r=t.target,i=null===(n=r.tagName)||void 0===n?void 0:n.toLocaleLowerCase(),a=e.type,o=getRequestUrl(r);return!!(i&&-1!==a.indexOf(i)&&TAG_TYPE[i]&&r instanceof TAG_TYPE[i]&&o)&&{target:r,tagName:i,url:o}}function createElement(e,t){var n=!0===t.crossOrigin?"anonymous":t.crossOrigin,r=n?'crossorigin="'.concat(n,'"'):"",i=t.times?'data-rsbuild-retry-times="'.concat(t.times,'"'):"",a=t.isAsync?"data-rsbuild-async":"";if(e instanceof HTMLScriptElement){var o=document.createElement("script");return o.src=t.url,n&&(o.crossOrigin=n),t.times&&(o.dataset.rsbuildRetryTimes=String(t.times)),t.isAsync&&(o.dataset.rsbuildAsync=""),{element:o,str:'<script src="'.concat(t.url,'" ').concat(r," ").concat(i," ").concat(a,"><\/script>")}}if(e instanceof HTMLLinkElement){var s=document.createElement("link");return s.rel=e.rel||"stylesheet",e.as&&(s.as=e.as),s.href=t.url,n&&(s.crossOrigin=n),t.times&&(s.dataset.rsbuildRetryTimes=String(t.times)),{element:s,str:'<link rel="'.concat(s.rel,'" href="').concat(t.url,'" ').concat(r," ").concat(i," ").concat(s.as?'as="'.concat(s.as,'"'):"","></link>")}}}function reloadElementResource(e,t,n){e instanceof HTMLScriptElement&&(n.isAsync?document.body.appendChild(t.element):document.write(t.str)),e instanceof HTMLLinkElement&&document.getElementsByTagName("head")[0].appendChild(t.element),e instanceof HTMLImageElement&&(e.src=n.url,e.dataset.rsbuildRetryTimes=String(n.times))}function retry(e,t){var n=validateTargetInfo(e,t);if(!1!==n){var r=n.target,i=n.tagName,a=n.url,o=e.test;if(o){if("string"==typeof o){var s=new RegExp(o);o=function(e){return s.test(e)}}if("function"!=typeof o||!o(a))return}var c=findCurrentDomain(a,e.domain);if(!(e.domain&&e.domain.length>0&&-1===e.domain.indexOf(c))){var l=Number(r.dataset.rsbuildRetryTimes)||0;if(l!==e.max){var m=findNextDomain(c,e.domain),d=Boolean(r.dataset.rsbuildAsync)||r.async||r.defer,u={url:a.replace(c,m),times:l+1,crossOrigin:e.crossOrigin,isAsync:d},f=createElement(r,u);if(e.onRetry&&"function"==typeof e.onRetry){var g={times:l,domain:c,url:a,tagName:i};e.onRetry(g)}reloadElementResource(r,f,u)}else if("function"==typeof e.onFail){var y={times:l,domain:c,url:a,tagName:i};e.onFail(y)}}}}function load(e,t){var n=validateTargetInfo(e,t);if(!1!==n){var r=n.target,i=n.tagName,a=n.url,o=findCurrentDomain(a,e.domain),s=Number(r.dataset.rsbuildRetryTimes)||0;if(0!==s&&"function"==typeof e.onSuccess){var c={times:s,domain:o,url:a,tagName:i};e.onSuccess(c)}}}function resourceMonitor(e,t){"undefined"!=typeof window&&void 0!==window.document&&(document.addEventListener("error",(function(t){t&&t.target instanceof Element&&e(t)}),!0),document.addEventListener("load",(function(e){e&&e.target instanceof Element&&t(e)}),!0))}function init(e){var t=Object.assign({},defaultConfig,e);Array.isArray(t.type)&&0!==t.type.length||(t.type=defaultConfig.type),Array.isArray(t.domain)&&0!==t.domain.length||(t.domain=defaultConfig.domain),Array.isArray(t.domain)&&(t.domain=t.domain.filter(Boolean));try{resourceMonitor((function(e){try{retry(t,e)}catch(e){console.error("retry error captured",e)}}),(function(e){try{load(t,e)}catch(e){console.error("load error captured",e)}}))}catch(e){console.error("monitor error captured",e)}}