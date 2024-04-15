(()=>{var e={329:e=>{const t=/^[^:]+: /;const format=e=>{if(e instanceof SyntaxError){e.name="SyntaxError";e.message=e.message.replace(t,"");e.hideStack=true}else if(e instanceof TypeError){e.name=null;e.message=e.message.replace(t,"");e.hideStack=true}return e};class LoaderError extends Error{constructor(e){super();const{name:t,message:r,codeFrame:o,hideStack:s}=format(e);this.name="BabelLoaderError";this.message=`${t?`${t}: `:""}${r}\n\n${o}\n`;this.hideStack=s;Error.captureStackTrace(this,this.constructor)}}e.exports=LoaderError},548:(e,t,r)=>{const o=r(37);const s=r(17);const a=r(796);const i=r(113);const{promisify:n}=r(837);const{readFile:c,writeFile:u,mkdir:l}=r(292);const p=r.e(672).then(r.bind(r,672));const f=r(843);let d=null;let _="sha256";try{i.createHash(_)}catch(e){_="md5"}const b=n(a.gunzip);const m=n(a.gzip);const read=async function(e,t){const r=await c(e+(t?".gz":""));const o=t?await b(r):r;return JSON.parse(o.toString())};const write=async function(e,t,r){const o=JSON.stringify(r);const s=t?await m(o):o;return await u(e+(t?".gz":""),s)};const filename=function(e,t,r){const o=i.createHash(_);const s=JSON.stringify({source:e,options:r,identifier:t});o.update(s);return o.digest("hex")+".json"};const handleCache=async function(e,t){const{source:r,options:a={},cacheIdentifier:i,cacheDirectory:n,cacheCompression:c}=t;const u=s.join(e,filename(r,i,a));try{return await read(u,c)}catch(e){}const p=typeof n!=="string"&&e!==o.tmpdir();try{await l(e,{recursive:true})}catch(e){if(p){return handleCache(o.tmpdir(),t)}throw e}const d=await f(r,a);if(!d.externalDependencies.length){try{await write(u,c,d)}catch(e){if(p){return handleCache(o.tmpdir(),t)}throw e}}return d};e.exports=async function(e){let t;if(typeof e.cacheDirectory==="string"){t=e.cacheDirectory}else{if(d===null){const{default:e}=await p;d=e({name:"babel-loader"})||o.tmpdir()}t=d}return await handleCache(t,e)}},384:(e,t,r)=>{let o;try{o=r(718)}catch(e){if(e.code==="MODULE_NOT_FOUND"){e.message+="\n babel-loader@9 requires Babel 7.12+ (the package '@babel/core'). "+"If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'."}throw e}if(/^6\./.test(o.version)){throw new Error("\n babel-loader@9 will not work with the '@babel/core@6' bridge package. "+"If you want to use Babel 6.x, install 'babel-loader@7'.")}const{version:s}=r(684);const a=r(548);const i=r(843);const n=r(136);const c=r(77);const{isAbsolute:u}=r(17);const l=r(14).validate;function subscribe(e,t,r){if(r[e]){r[e](t)}}e.exports=makeLoader();e.exports.custom=makeLoader;function makeLoader(e){const t=e?e(o):undefined;return function(e,r){const o=this.async();loader.call(this,e,r,t).then((e=>o(null,...e)),(e=>o(e)))}}async function loader(e,t,r){const p=this.resourcePath;let f=this.getOptions();l(c,f,{name:"Babel loader"});if(f.customize!=null){if(typeof f.customize!=="string"){throw new Error("Customized loaders must be implemented as standalone modules.")}if(!u(f.customize)){throw new Error("Customized loaders must be passed as absolute paths, since "+"babel-loader has no way to know what they would be relative to.")}if(r){throw new Error("babel-loader's 'customize' option is not available when already "+"using a customized babel-loader wrapper.")}let e=require(f.customize);if(e.__esModule)e=e.default;if(typeof e!=="function"){throw new Error("Custom overrides must be functions.")}r=e(o)}let d;if(r&&r.customOptions){const o=await r.customOptions.call(this,f,{source:e,map:t});d=o.custom;f=o.loader}if("forceEnv"in f){console.warn("The option `forceEnv` has been removed in favor of `envName` in Babel 7.")}if(typeof f.babelrc==="string"){console.warn("The option `babelrc` should not be set to a string anymore in the babel-loader config. "+"Please update your configuration and set `babelrc` to true or false.\n"+"If you want to specify a specific babel config file to inherit config from "+"please use the `extends` option.\nFor more information about this options see "+"https://babeljs.io/docs/core-packages/#options")}if(Object.prototype.hasOwnProperty.call(f,"sourceMap")&&!Object.prototype.hasOwnProperty.call(f,"sourceMaps")){f=Object.assign({},f,{sourceMaps:f.sourceMap});delete f.sourceMap}const _=Object.assign({},f,{filename:p,inputSourceMap:t||f.inputSourceMap,sourceMaps:f.sourceMaps===undefined?this.sourceMap:f.sourceMaps,sourceFileName:p});delete _.customize;delete _.cacheDirectory;delete _.cacheIdentifier;delete _.cacheCompression;delete _.metadataSubscribers;const b=await o.loadPartialConfigAsync(n(_,this.target));if(b){let o=b.options;if(r&&r.config){o=await r.config.call(this,b,{source:e,map:t,customOptions:d})}if(o.sourceMaps==="inline"){o.sourceMaps=true}const{cacheDirectory:n=null,cacheIdentifier:c=JSON.stringify({options:o,"@babel/core":i.version,"@babel/loader":s}),cacheCompression:u=true,metadataSubscribers:l=[]}=f;let p;if(n){p=await a({source:e,options:o,transform:i,cacheDirectory:n,cacheIdentifier:c,cacheCompression:u})}else{p=await i(e,o)}b.files.forEach((e=>this.addDependency(e)));if(p){if(r&&r.result){p=await r.result.call(this,p,{source:e,map:t,customOptions:d,config:b,options:o})}const{code:s,map:a,metadata:i,externalDependencies:n}=p;n==null?void 0:n.forEach((e=>this.addDependency(e)));l.forEach((e=>{subscribe(e,i,this)}));return[s,a]}}return[e,t]}},136:(e,t,r)=>{const o=r(718);e.exports=function injectCaller(e,t){if(!supportsCallerOption())return e;return Object.assign({},e,{caller:Object.assign({name:"babel-loader",target:t,supportsStaticESM:true,supportsDynamicImport:true,supportsTopLevelAwait:true},e.caller)})};let s=undefined;function supportsCallerOption(){if(s===undefined){try{o.loadPartialConfig({caller:undefined,babelrc:false,configFile:false});s=true}catch(e){s=false}}return s}},843:(e,t,r)=>{const o=r(718);const{promisify:s}=r(837);const a=r(329);const i=s(o.transform);e.exports=async function(e,t){let r;try{r=await i(e,t)}catch(e){throw e.message&&e.codeFrame?new a(e):e}if(!r)return null;const{ast:o,code:s,map:n,metadata:c,sourceType:u,externalDependencies:l}=r;if(n&&(!n.sourcesContent||!n.sourcesContent.length)){n.sourcesContent=[e]}return{ast:o,code:s,map:n,metadata:c,sourceType:u,externalDependencies:Array.from(l||[])}};e.exports.version=o.version},684:e=>{"use strict";e.exports=require("./package.json")},14:e=>{"use strict";e.exports=require("./schema-utils")},718:e=>{"use strict";e.exports=require("@babel/core")},113:e=>{"use strict";e.exports=require("crypto")},292:e=>{"use strict";e.exports=require("fs/promises")},561:e=>{"use strict";e.exports=require("node:fs")},411:e=>{"use strict";e.exports=require("node:path")},742:e=>{"use strict";e.exports=require("node:process")},41:e=>{"use strict";e.exports=require("node:url")},37:e=>{"use strict";e.exports=require("os")},17:e=>{"use strict";e.exports=require("path")},837:e=>{"use strict";e.exports=require("util")},796:e=>{"use strict";e.exports=require("zlib")},77:e=>{"use strict";e.exports=JSON.parse('{"type":"object","properties":{"cacheDirectory":{"oneOf":[{"type":"boolean"},{"type":"string"}],"default":false},"cacheIdentifier":{"type":"string"},"cacheCompression":{"type":"boolean","default":true},"customize":{"type":"string","default":null}},"additionalProperties":true}')}};var t={};function __nccwpck_require__(r){var o=t[r];if(o!==undefined){return o.exports}var s=t[r]={exports:{}};var a=true;try{e[r](s,s.exports,__nccwpck_require__);a=false}finally{if(a)delete t[r]}return s.exports}__nccwpck_require__.m=e;(()=>{__nccwpck_require__.d=(e,t)=>{for(var r in t){if(__nccwpck_require__.o(t,r)&&!__nccwpck_require__.o(e,r)){Object.defineProperty(e,r,{enumerable:true,get:t[r]})}}}})();(()=>{__nccwpck_require__.f={};__nccwpck_require__.e=e=>Promise.all(Object.keys(__nccwpck_require__.f).reduce(((t,r)=>{__nccwpck_require__.f[r](e,t);return t}),[]))})();(()=>{__nccwpck_require__.u=e=>""+e+".index.js"})();(()=>{__nccwpck_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})();(()=>{__nccwpck_require__.r=e=>{if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(e,"__esModule",{value:true})}})();if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";(()=>{var e={179:1};var installChunk=t=>{var r=t.modules,o=t.ids,s=t.runtime;for(var a in r){if(__nccwpck_require__.o(r,a)){__nccwpck_require__.m[a]=r[a]}}if(s)s(__nccwpck_require__);for(var i=0;i<o.length;i++)e[o[i]]=1};__nccwpck_require__.f.require=(t,r)=>{if(!e[t]){if(true){installChunk(require("./"+__nccwpck_require__.u(t)))}else e[t]=1}}})();var r=__nccwpck_require__(384);module.exports=r})();