(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[847],{641:function(t,e,n){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var r=o(n(3493)),s=o(n(3109)),a=n(6170),c=o(n(1060)),l=function(){function t(t){var e=this;this.options={color:"rgb(180, 180, 180)",opacity:1,licenseKey:null,size:40,focusableElements:"[data-blobity], a:not([data-no-blobity]), button:not([data-no-blobity]), [data-blobity-tooltip]",focusableElementsOffsetX:0,focusableElementsOffsetY:0,zIndex:-1,invert:!1,dotColor:null,magnetic:!0,mode:"normal",radius:4,font:"sans-serif",fontWeight:400,fontSize:40,fontColor:"#000000",tooltipPadding:12},this.initialized=!1,this.color={r:0,g:0,b:0},this.fontColor={r:0,g:0,b:0},this.stickedToElement=null,this.sticketToElementTooltip=null,this.disablingStickedToElementTimeout=null,this.isActive=!0,this.destroyed=!1,this.currentMagnetic=null,this.kinetPresets={normal:{acceleration:.1,friction:.35},bouncy:{acceleration:.1,friction:.28},slow:{acceleration:.06,friction:.35}},this.lastKnownCoordinates={x:0,y:0},this.currentOffsetX=0,this.currentOffsetY=0,this.manuallySetFocusedElement=null,this.manuallySetTooltipText=null,this.disableTimeStamp=(new Date).getTime(),this.reduceMotionSetting=!1,this.kinetDefaultMethod="animate",this.updateOptions=function(t){if(e.options=i(i({},e.options),t),Array.isArray(e.options.color)?e.color=e.options.color.map((function(t){return a.convertColor(t)})):e.color=a.convertColor(e.options.color),e.fontColor=a.convertColor(e.options.fontColor),e.options.invert&&(e.color=a.convertColor("rgb(255, 255, 255)")),e.options.dotColor){if(e.globalStyles&&(document.head.removeChild(e.globalStyles),e.globalStyles=void 0),!e.globalStyles){var n='<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill-rule="evenodd" fill="'+e.options.dotColor+'"/></svg>';e.globalStyles=document.createElement("style"),e.globalStyles.setAttribute("data-blobity-global-styles",""),e.globalStyles.appendChild(document.createTextNode("* {cursor: inherit}")),e.globalStyles.appendChild(document.createTextNode("html { cursor: url(data:image/svg+xml;base64,"+btoa(n)+") 4 4, auto;}")),document.head.appendChild(e.globalStyles)}}else e.globalStyles&&document.head.removeChild(e.globalStyles),e.globalStyles=void 0;e.canvas.style.cssText="\n            position: fixed;\n            z-index: -1;\n            top: 0;\n            left: 0;\n            pointer-events: none;\n            opacity: 1;\n            will-change: transform;\n            overflow: visible;\n            opacity: "+e.options.opacity+"; \n            z-index: "+(e.options.invert?2147483647:e.options.zIndex)+"; \n            "+(e.options.invert&&"mix-blend-mode: difference")+";\n        ",e.currentOffsetX=e.options.focusableElementsOffsetX,e.currentOffsetY=e.options.focusableElementsOffsetY,e.resize(),e.kinetInstance&&(Object.entries(e.kinetInstance._instances).filter((function(t){return"scale"!==t[0]})).forEach((function(t){var n=t[1];n._friction=1-e.kinetPresets[e.options.mode].friction,n._acceleration=e.kinetPresets[e.options.mode].acceleration})),e.stickedToElement||e.sticketToElementTooltip||(void 0!==t.radius&&e.kinetInstance[e.kinetDefaultMethod]("radius",e.options.radius),e.kinetInstance[e.kinetDefaultMethod]("width",e.options.size),e.kinetInstance[e.kinetDefaultMethod]("height",e.options.size),e.kinetInstance[e.kinetDefaultMethod]("x",e.lastKnownCoordinates.x-e.options.size/2),e.kinetInstance[e.kinetDefaultMethod]("y",e.lastKnownCoordinates.y-e.options.size/2)))},this.destroy=function(){e.destroyed||(window.removeEventListener("resize",e.resize),window.removeEventListener("mousemove",e.throttledMouseMove),document.removeEventListener("mouseenter",e.windowMouseEnter),document.removeEventListener("mouseleave",e.windowMouseLeave),document.removeEventListener("mouseover",e.focusableElementMouseEnter),document.removeEventListener("mouseout",e.focusableElementMouseLeave),document.removeEventListener("touchstart",e.disable),document.removeEventListener("touchend",e.disable),document.removeEventListener("mousemove",e.enable),e.prefersReducedMotionMediaQuery.removeEventListener("change",e.updatePrefersReducedMotionSetting),document.body.removeChild(e.canvas),document.documentElement.style.cursor="",e.globalStyles&&document.head.removeChild(e.globalStyles),e.destroyed=!0)},this.disable=function(){e.disableTimeStamp=(new Date).getTime(),e.isActive=!1,e.clear()},this.enable=function(){(new Date).getTime()-e.disableTimeStamp>16&&(e.isActive=!0)},this.updatePrefersReducedMotionSetting=function(){e.reduceMotionSetting=e.prefersReducedMotionMediaQuery.matches,e.kinetDefaultMethod=e.reduceMotionSetting?"set":"animate"},this.focusElement=function(t){e.manuallySetTooltipText=null,e.manuallySetFocusedElement=t,e.highlightElement(t)},this.showTooltip=function(t){e.manuallySetFocusedElement=null,e.manuallySetTooltipText=t,e.displayTooltip(t,e.lastKnownCoordinates.x,e.lastKnownCoordinates.y)},this.reset=function(){e.manuallySetFocusedElement=null,e.manuallySetTooltipText=null,e.activeTooltip?e.displayTooltip(e.activeTooltip,e.lastKnownCoordinates.x,e.lastKnownCoordinates.y):e.activeFocusedElement?e.highlightElement(e.activeFocusedElement):e.resetMorph(e.lastKnownCoordinates.x-e.options.size/2,e.lastKnownCoordinates.y-e.options.size/2)},this.focusableElementMouseEnter=function(t){if(e.isActive&&t.target){var n=t.target.closest(e.options.focusableElements);if(n){e.stickedToElement=n;var i=n.getAttribute("data-blobity-tooltip");n&&void 0!=i&&(e.sticketToElementTooltip=i),e.currentOffsetX=n.getAttribute("data-blobity-offset-x")?parseInt(String(n.getAttribute("data-blobity-offset-x"))):e.options.focusableElementsOffsetX,e.currentOffsetY=n.getAttribute("data-blobity-offset-y")?parseInt(String(n.getAttribute("data-blobity-offset-y"))):e.options.focusableElementsOffsetY;var o=n.getAttribute("data-blobity-magnetic");e.reduceMotionSetting||("true"===o||e.options.magnetic&&"false"!==o)&&(e.currentMagnetic=new c.default(n),e.currentMagnetic.onTick=function(){if(!e.activeTooltip&&e.activeFocusedElement===n){var t=n.getBoundingClientRect(),i=t.width,o=t.height,r=t.x,s=t.y,a=n.getAttribute("data-blobity-radius");e.kinetInstance[e.kinetDefaultMethod]("textOpacity",0),e.morph({width:i+2*e.currentOffsetX,height:o+2*e.currentOffsetY,x:r-e.currentOffsetX,y:s-e.currentOffsetY},void 0!=a?parseInt(a):e.options.radius)}})}}},this.focusableElementMouseLeave=function(t){t.target&&(t.target.closest(e.options.focusableElements)&&(e.stickedToElement=null,e.sticketToElementTooltip=null,e.currentOffsetX=e.options.focusableElementsOffsetX,e.currentOffsetY=e.options.focusableElementsOffsetY,e.currentMagnetic&&(e.currentMagnetic.destroy(),e.currentMagnetic.onTick=null,e.currentMagnetic=null),e.resetMorph(t.clientX,t.clientY)))},this.mouseDown=function(){e.kinetInstance[e.kinetDefaultMethod]("scale",97)},this.mouseUp=function(){e.bounce()},this.windowMouseEnter=function(){e.kinetInstance[e.kinetDefaultMethod]("opacity",1)},this.windowMouseLeave=function(){e.kinetInstance[e.kinetDefaultMethod]("opacity",0)},this.highlightElement=function(t){var n=t.getBoundingClientRect(),i=n.width,o=n.height,r=n.x,s=n.y,a=t.getAttribute("data-blobity-radius");e.kinetInstance[e.kinetDefaultMethod]("textOpacity",0),e.morph({width:i+2*e.currentOffsetX,height:o+2*e.currentOffsetY,x:r-e.currentOffsetX,y:s-e.currentOffsetY},void 0!=a?parseInt(a):e.options.radius)},this.displayTooltip=function(t,n,i){e.ctx.font=e.options.fontWeight+" "+e.options.fontSize+"px "+e.options.font,e.ctx.textBaseline="bottom",e.ctx.textAlign="left";var o=e.ctx.measureText(t),r=o.actualBoundingBoxAscent,s=o.width,a=2*e.options.tooltipPadding;e.kinetInstance[e.kinetDefaultMethod]("textOpacity",100),e.morph({x:n+6,y:i+6,width:s+a,height:r+a},4)},this.mouseMove=function(t){e.initialized?(e.lastKnownCoordinates={x:t.clientX,y:t.clientY},e.activeTooltip?e.displayTooltip(e.activeTooltip,t.clientX,t.clientY):e.activeFocusedElement?e.highlightElement(e.activeFocusedElement):(e.kinetInstance[e.kinetDefaultMethod]("textOpacity",0),e.kinetInstance[e.kinetDefaultMethod]("x",t.clientX-e.options.size/2),e.kinetInstance[e.kinetDefaultMethod]("y",t.clientY-e.options.size/2),e.kinetInstance[e.kinetDefaultMethod]("width",e.options.size),e.kinetInstance[e.kinetDefaultMethod]("height",e.options.size),e.kinetInstance[e.kinetDefaultMethod]("radius",e.options.size/2))):(e.initialized=!0,e.kinetInstance.set("x",t.clientX-e.options.size/2),e.kinetInstance.set("y",t.clientY-e.options.size/2),e.kinetInstance[e.kinetDefaultMethod]("opacity",1))},this.resetMorph=function(t,n){e.disablingStickedToElementTimeout=setTimeout((function(){e.kinetInstance[e.kinetDefaultMethod]("width",e.options.size),e.kinetInstance[e.kinetDefaultMethod]("height",e.options.size),e.kinetInstance[e.kinetDefaultMethod]("radius",e.options.size/2),e.kinetInstance[e.kinetDefaultMethod]("x",t),e.kinetInstance[e.kinetDefaultMethod]("y",n)}))},this.clear=function(){e.ctx.resetTransform(),e.ctx.rotate(0),e.ctx.clearRect(-20,-20,window.innerWidth*window.devicePixelRatio+20,window.innerHeight*window.devicePixelRatio+20)},this.resize=function(){e.ctx.canvas.style.width=window.innerWidth+"px",e.ctx.canvas.style.height=window.innerHeight+"px",e.ctx.canvas.width=window.innerWidth*window.devicePixelRatio,e.ctx.canvas.height=window.innerHeight*window.devicePixelRatio,window.devicePixelRatio>1&&(e.ctx.imageSmoothingEnabled=!1)},this.canvas=document.createElement("canvas"),document.body.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.updateOptions(i({},t)),this.options.licenseKey||console.warn("Valid license number for Blobity is required. You can get one at https://blobity.gmrchk.com."),this.kinetInstance=new s.default({names:["x","y","opacity","textOpacity","width","height","radius","scale"],acceleration:this.kinetPresets[this.options.mode].acceleration,friction:this.kinetPresets[this.options.mode].friction}),this.kinetInstance._instances.scale._acceleration=.06,this.kinetInstance._instances.scale._friction=.9,this.kinetInstance.set("x",window.innerWidth/2),this.kinetInstance.set("y",window.innerHeight/2),this.kinetInstance.set("width",this.options.size),this.kinetInstance.set("height",this.options.size),this.kinetInstance.set("opacity",0),this.kinetInstance.set("textOpacity",0),this.kinetInstance.set("radius",this.options.size/2),this.kinetInstance.set("scale",100),this.kinetInstance.on("tick",(function(t){e.render(t.x.current,t.y.current,t.width.current,t.height.current,t.radius.current,t.x.velocity,t.y.velocity,t.opacity.current,t.scale.current,t.textOpacity.current)})),this.throttledMouseMove=r.default(this.mouseMove),window.addEventListener("resize",this.resize,{passive:!0}),this.resize(),window.addEventListener("mousemove",this.throttledMouseMove,{passive:!0}),document.addEventListener("mouseenter",this.windowMouseEnter),document.addEventListener("mouseleave",this.windowMouseLeave),document.addEventListener("mouseover",this.focusableElementMouseEnter),document.addEventListener("mouseout",this.focusableElementMouseLeave),document.addEventListener("mousedown",this.mouseDown),document.addEventListener("mouseup",this.mouseUp),document.addEventListener("touchstart",this.disable),document.addEventListener("touchend",this.disable),document.addEventListener("mousemove",this.enable,{passive:!0}),this.prefersReducedMotionMediaQuery=window.matchMedia("(prefers-reduced-motion: reduce)"),this.prefersReducedMotionMediaQuery.addEventListener("change",this.updatePrefersReducedMotionSetting),this.updatePrefersReducedMotionSetting()}return t.prototype.bounce=function(){this.reduceMotionSetting?this.kinetInstance.set("scale",100):(this.kinetInstance.set("scale",97),this.kinetInstance._instances.scale.velocity=3,this.kinetInstance.animate("scale",100))},Object.defineProperty(t.prototype,"activeTooltip",{get:function(){return this.manuallySetTooltipText||this.sticketToElementTooltip},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"activeFocusedElement",{get:function(){return this.manuallySetFocusedElement||this.stickedToElement},enumerable:!1,configurable:!0}),t.prototype.morph=function(t,e){var n=t.width,i=t.height,o=t.x,r=t.y;this.disablingStickedToElementTimeout&&clearTimeout(this.disablingStickedToElementTimeout),this.kinetInstance[this.kinetDefaultMethod]("radius",e),this.kinetInstance[this.kinetDefaultMethod]("width",n),this.kinetInstance[this.kinetDefaultMethod]("height",i),this.kinetInstance[this.kinetDefaultMethod]("x",o),this.kinetInstance[this.kinetDefaultMethod]("y",r)},t.prototype.render=function(t,e,n,i,o,r,s,c,l,u){this.clear();var d=this.activeFocusedElement?0:this.options.size/8*7;if(t*=window.devicePixelRatio,e*=window.devicePixelRatio,n=(this.activeTooltip?n:Math.max(n,d))*window.devicePixelRatio,i=(this.activeTooltip?i:Math.max(i,d))*window.devicePixelRatio,o*=window.devicePixelRatio,r*=window.devicePixelRatio,s*=window.devicePixelRatio,this.isActive){var f=this.ctx;f.globalAlpha=c,f.setTransform(l/100,0,0,l/100,t,e),f.translate(n,i),f.scale(l/100,l/100),f.translate(-n,-i);var h=Math.abs(n-this.options.size*window.devicePixelRatio)<2&&Math.abs(i-this.options.size*window.devicePixelRatio)<2&&Math.abs(o-this.options.size*window.devicePixelRatio/2)<2;if(h){var p=180*Math.atan2(s,r)/Math.PI+180;f.translate(o,o),f.rotate(p*Math.PI/180),f.translate(-o,-o)}var m=h?Math.min(2*Math.sqrt(Math.pow(Math.abs(r),2)+Math.pow(Math.abs(s),2)),60)/2:0;if(f.beginPath(),f.moveTo(o,0),f.arcTo(n+m,m/2,n+m,i+m/2,a.positive(o-m/2)),f.arcTo(n+m,i-m/2,m,i-m/2,a.positive(o-m/2)),f.arcTo(0,i,0,0,a.positive(o)),f.arcTo(0,0,n,0,a.positive(o)),f.closePath(),a.isGradient(this.color)){var v=f.createLinearGradient(0,0,n,i),g=this.color.length;this.color.forEach((function(t,e){v.addColorStop(1/(g-1)*e,"rgb("+t.r+", "+t.g+", "+t.b+")")})),f.fillStyle=v}else f.fillStyle="rgb("+this.color.r+", "+this.color.g+", "+this.color.b+")";f.fill(),this.activeTooltip&&(f.setTransform(l/100,0,0,l/100,t,e),this.ctx.textBaseline="top",this.ctx.textAlign="left",this.ctx.font=this.options.fontWeight+" "+this.options.fontSize*window.devicePixelRatio*(l/100)+"px "+this.options.font,f.fillStyle="rgba(\n                    "+this.fontColor.r+", "+this.fontColor.g+", \n                    "+this.fontColor.b+", "+u/100+")",f.fillText(this.activeTooltip,this.options.tooltipPadding*window.devicePixelRatio-(l-100)/100*n,this.options.tooltipPadding*window.devicePixelRatio-(l-100)/100*i))}},t}();e.default=l},1060:function(t,e,n){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=i(n(3109)),r=i(n(3493)),s=function(){function t(t){var e=this;this.destroying=!1,this.onTick=null,this.destroy=function(){window.removeEventListener("mousemove",e.throttledMouseMove),e.destroying=!0,e.kinetInstance.animate("x",0),e.kinetInstance.animate("y",0)},this.mouseMove=function(t){var n=e.getDistance(t.clientX+window.scrollX,t.clientY+window.scrollY);e.render(n,-1*(e.center.x-t.clientX-window.scrollX),-1*(e.center.y-t.clientY-window.scrollY))},this.kinetInstance=new o.default({names:["x","y"],acceleration:.1,friction:.4}),this.element=t,this.rect=this.element.getBoundingClientRect(),this.center={x:this.rect.x+window.scrollX+this.element.offsetWidth/2,y:this.rect.y+window.scrollY+this.element.offsetHeight/2},this.maxDistanceX=this.element.offsetWidth/2,this.maxDistanceY=this.element.offsetWidth/2,this.throttledMouseMove=r.default(this.mouseMove),window.addEventListener("mousemove",this.throttledMouseMove,{passive:!0}),this.kinetInstance.on("tick",(function(t){e.element.style.transform="translate3d("+t.x.current+"px, "+t.y.current+"px, 0) rotateY("+t.x.current/2+"deg) rotateX("+t.y.current/2+"deg)",e.onTick&&e.onTick()})),this.kinetInstance.on("end",(function(){e.destroying&&(e.element.style.transform="")}))}return t.prototype.getDistance=function(t,e){return Math.round(Math.sqrt(Math.pow(this.center.x-t,2)+Math.pow(this.center.y-e,2)))},t.prototype.render=function(t,e,n){if(Math.abs(e)<this.maxDistanceX&&Math.abs(n)<this.maxDistanceY){var i=e/this.maxDistanceX,o=n/this.maxDistanceY;this.kinetInstance.animate("x",Math.round(20*i)),this.kinetInstance.animate("y",Math.round(20*o))}else this.kinetInstance.animate("x",0),this.kinetInstance.animate("y",0)},t}();e.default=s},6170:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.negative=e.positive=e.isGradient=e.convertColor=e.extractRgbFromRgb=e.extractRgbFromHex=void 0;e.extractRgbFromHex=function(t){return{r:parseInt(t.slice(1,3),16),g:parseInt(t.slice(3,5),16),b:parseInt(t.slice(5,7),16)}};e.extractRgbFromRgb=function(t){var e=/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.exec(t);if(null===e)throw new Error("Couldn't convert color string "+t);return{r:parseInt(e[1]),g:parseInt(e[2]),b:parseInt(e[3])}};e.convertColor=function(t){if(t.includes("rgb"))return e.extractRgbFromRgb(t);if(t.startsWith("#"))return e.extractRgbFromHex(t);throw new Error("Couldn't convert color string "+t)};e.isGradient=function(t){return Array.isArray(t)};e.positive=function(t){return Math.max(t,0)};e.negative=function(t){return Math.min(t,0)}},6499:function(t,e,n){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=i(n(641));e.default=o.default},3109:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(e){var i=this;o(this,t),this._handlers={set:[],start:[],tick:[],end:[]};var r={friction:.7,acceleration:.04,initialValue:0,names:["x"],test:function(t){return Math.abs(t.current-t.target)>.1}};this._options=n({},r,e),e&&e.friction&&(this._options.friction=1-e.friction),this._instances={},this._options.names.forEach((function(t){i._instances[t]=new s(i._options.initialValue,i._options.acceleration,i._options.friction)})),this._raf=null}return i(t,[{key:"set",value:function(t,e){var n=this;null!=e?null!=this._instances[t]?(this._instances[t].current=e,this._instances[t].target=e,this._raf||(this._handlers.set.forEach((function(t){return t(n._instances)})),this._handlers.tick.forEach((function(t){return t(n._instances)})))):console.warn('Instance "'+t+"\" doesn't exist."):console.warn("Define a value.")}},{key:"animate",value:function(t,e){var n=this;if(null!=e){if(null!=this._instances[t])return this._instances[t].target!==e&&(this._instances[t].target=e,this._raf||(this._handlers.start.forEach((function(t){return t(n._instances,n._instances)})),this._animateValues()),e);console.warn("Instance "+t+" doesn't exist.")}else console.warn("Define a value.")}},{key:"_animateValues",value:function(){var t=this,e=!0;Object.keys(this._instances).forEach((function(n){t._instances[n].update(),t._options.test(t._instances[n])&&(e=!1)})),e?(Object.keys(this._instances).forEach((function(e){t._instances[e].current=t._instances[e].target,t._instances[e].velocity=0})),this._handlers.tick.forEach((function(e){return e(t._instances)})),this._handlers.end.forEach((function(e){return e(t._instances)})),this._raf=null):(this._raf=requestAnimationFrame(this._animateValues.bind(this)),this._handlers.tick.forEach((function(e){return e(t._instances)})))}},{key:"on",value:function(t,e){this._handlers[t]?this._handlers[t].push(e):console.warn("Unsupported event "+t+".")}},{key:"off",value:function(t,e){var n=this;if(null!=t)if(null!=e)if(this._handlers[t]&&this._handlers[t].filter((function(t){return t===e})).length){var i=this._handlers[t].filter((function(t){return t===e}))[0],o=this._handlers[t].indexOf(i);o>-1&&this._handlers[t].splice(o,1)}else console.warn("Handler for event "+t+" no found.");else this._handlers[t]=[];else Object.keys(this._handlers).forEach((function(t){n._handlers[t]=[]}))}}]),t}();e.default=r;var s=function(){function t(e,n,i){o(this,t),this.current=e,this.target=e,this._acceleration=n,this._friction=i,this.velocity=0}return i(t,[{key:"update",value:function(){var t=this.target-this.current,e=t*this._acceleration;return this.applyForce(e),this.velocity*=this._friction,this.current+=this.velocity,t}},{key:"applyForce",value:function(t){this.velocity+=t}}]),t}()},2705:function(t,e,n){var i=n(5639).Symbol;t.exports=i},4239:function(t,e,n){var i=n(2705),o=n(9607),r=n(2333),s=i?i.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":s&&s in Object(t)?o(t):r(t)}},7561:function(t,e,n){var i=n(7990),o=/^\s+/;t.exports=function(t){return t?t.slice(0,i(t)+1).replace(o,""):t}},1957:function(t,e,n){var i="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;t.exports=i},9607:function(t,e,n){var i=n(2705),o=Object.prototype,r=o.hasOwnProperty,s=o.toString,a=i?i.toStringTag:void 0;t.exports=function(t){var e=r.call(t,a),n=t[a];try{t[a]=void 0;var i=!0}catch(c){}var o=s.call(t);return i&&(e?t[a]=n:delete t[a]),o}},2333:function(t){var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},5639:function(t,e,n){var i=n(1957),o="object"==typeof self&&self&&self.Object===Object&&self,r=i||o||Function("return this")();t.exports=r},7990:function(t){var e=/\s/;t.exports=function(t){for(var n=t.length;n--&&e.test(t.charAt(n)););return n}},3279:function(t,e,n){var i=n(3218),o=n(7771),r=n(4841),s=Math.max,a=Math.min;t.exports=function(t,e,n){var c,l,u,d,f,h,p=0,m=!1,v=!1,g=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function y(e){var n=c,i=l;return c=l=void 0,p=e,d=t.apply(i,n)}function b(t){return p=t,f=setTimeout(x,e),m?y(t):d}function w(t){var n=t-h;return void 0===h||n>=e||n<0||v&&t-p>=u}function x(){var t=o();if(w(t))return k(t);f=setTimeout(x,function(t){var n=e-(t-h);return v?a(n,u-(t-p)):n}(t))}function k(t){return f=void 0,g&&c?y(t):(c=l=void 0,d)}function M(){var t=o(),n=w(t);if(c=arguments,l=this,h=t,n){if(void 0===f)return b(h);if(v)return clearTimeout(f),f=setTimeout(x,e),y(h)}return void 0===f&&(f=setTimeout(x,e)),d}return e=r(e)||0,i(n)&&(m=!!n.leading,u=(v="maxWait"in n)?s(r(n.maxWait)||0,e):u,g="trailing"in n?!!n.trailing:g),M.cancel=function(){void 0!==f&&clearTimeout(f),p=0,c=h=l=f=void 0},M.flush=function(){return void 0===f?d:k(o())},M}},3218:function(t){t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},7005:function(t){t.exports=function(t){return null!=t&&"object"==typeof t}},3448:function(t,e,n){var i=n(4239),o=n(7005);t.exports=function(t){return"symbol"==typeof t||o(t)&&"[object Symbol]"==i(t)}},7771:function(t,e,n){var i=n(5639);t.exports=function(){return i.Date.now()}},3493:function(t,e,n){var i=n(3279),o=n(3218);t.exports=function(t,e,n){var r=!0,s=!0;if("function"!=typeof t)throw new TypeError("Expected a function");return o(n)&&(r="leading"in n?!!n.leading:r,s="trailing"in n?!!n.trailing:s),i(t,e,{leading:r,maxWait:e,trailing:s})}},4841:function(t,e,n){var i=n(7561),o=n(3218),r=n(3448),s=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,c=/^0o[0-7]+$/i,l=parseInt;t.exports=function(t){if("number"==typeof t)return t;if(r(t))return NaN;if(o(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=o(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=i(t);var n=a.test(t);return n||c.test(t)?l(t.slice(2),n?2:8):s.test(t)?NaN:+t}},8045:function(t,e,n){"use strict";function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,o=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(c){o=!0,r=c}finally{try{i||null==a.return||a.return()}finally{if(o)throw r}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function o(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}e.default=function(t){var e=t.src,n=t.sizes,o=t.unoptimized,c=void 0!==o&&o,u=t.priority,d=void 0!==u&&u,m=t.loading,g=t.lazyBoundary,y=void 0===g?"200px":g,b=t.className,w=t.quality,x=t.width,k=t.height,I=t.objectFit,O=t.objectPosition,S=t.onLoadingComplete,T=t.loader,z=void 0===T?_:T,A=t.placeholder,D=void 0===A?"empty":A,P=t.blurDataURL,j=function(t,e){if(null==t)return{};var n,i,o=function(t,e){if(null==t)return{};var n,i,o={},r=Object.keys(t);for(i=0;i<r.length;i++)n=r[i],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(i=0;i<r.length;i++)n=r[i],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}(t,["src","sizes","unoptimized","priority","loading","lazyBoundary","className","quality","width","height","objectFit","objectPosition","onLoadingComplete","loader","placeholder","blurDataURL"]),R=n?"responsive":"intrinsic";"layout"in j&&(j.layout&&(R=j.layout),delete j.layout);var C="";if(function(t){return"object"===typeof t&&(v(t)||function(t){return void 0!==t.src}(t))}(e)){var L=v(e)?e.default:e;if(!L.src)throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(L)));if(P=P||L.blurDataURL,C=L.src,(!R||"fill"!==R)&&(k=k||L.height,x=x||L.width,!L.height||!L.width))throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(L)))}e="string"===typeof e?e:C;var Y=E(x),X=E(k),F=E(w),W=!d&&("lazy"===m||"undefined"===typeof m);(e.startsWith("data:")||e.startsWith("blob:"))&&(c=!0,W=!1);h.has(e)&&(W=!1);0;var q,N=i(l.useIntersection({rootMargin:y,disabled:!W}),2),B=N[0],H=N[1],K=!W||H,U={boxSizing:"border-box",display:"block",overflow:"hidden",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},V={boxSizing:"border-box",display:"block",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},G=!1,Q={position:"absolute",top:0,left:0,bottom:0,right:0,boxSizing:"border-box",padding:0,border:"none",margin:"auto",display:"block",width:0,height:0,minWidth:"100%",maxWidth:"100%",minHeight:"100%",maxHeight:"100%",objectFit:I,objectPosition:O},$="blur"===D?{filter:"blur(20px)",backgroundSize:I||"cover",backgroundImage:'url("'.concat(P,'")'),backgroundPosition:O||"0% 0%"}:{};if("fill"===R)U.display="block",U.position="absolute",U.top=0,U.left=0,U.bottom=0,U.right=0;else if("undefined"!==typeof Y&&"undefined"!==typeof X){var J=X/Y,Z=isNaN(J)?"100%":"".concat(100*J,"%");"responsive"===R?(U.display="block",U.position="relative",G=!0,V.paddingTop=Z):"intrinsic"===R?(U.display="inline-block",U.position="relative",U.maxWidth="100%",G=!0,V.maxWidth="100%",q='<svg width="'.concat(Y,'" height="').concat(X,'" xmlns="http://www.w3.org/2000/svg" version="1.1"/>')):"fixed"===R&&(U.display="inline-block",U.position="relative",U.width=Y,U.height=X)}else 0;var tt={src:p,srcSet:void 0,sizes:void 0};K&&(tt=M({src:e,unoptimized:c,layout:R,width:Y,quality:F,sizes:n,loader:z}));var et=e;0;return r.default.createElement("span",{style:U},G?r.default.createElement("span",{style:V},q?r.default.createElement("img",{style:{display:"block",maxWidth:"100%",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},alt:"","aria-hidden":!0,src:"data:image/svg+xml;base64,".concat(a.toBase64(q))}):null):null,r.default.createElement("img",Object.assign({},j,tt,{decoding:"async","data-nimg":R,className:b,ref:function(t){B(t),function(t,e,n,i,o){if(!t)return;var r=function(){t.src!==p&&("decode"in t?t.decode():Promise.resolve()).catch((function(){})).then((function(){if("blur"===i&&(t.style.filter="none",t.style.backgroundSize="none",t.style.backgroundImage="none"),h.add(e),o){var n=t.naturalWidth,r=t.naturalHeight;o({naturalWidth:n,naturalHeight:r})}}))};t.complete?r():t.onload=r}(t,et,0,D,S)},style:f({},Q,$)})),r.default.createElement("noscript",null,r.default.createElement("img",Object.assign({},j,M({src:e,unoptimized:c,layout:R,width:Y,quality:F,sizes:n,loader:z}),{decoding:"async","data-nimg":R,style:Q,className:b,loading:m||"lazy"}))),d?r.default.createElement(s.default,null,r.default.createElement("link",{key:"__nimg-"+tt.src+tt.srcSet+tt.sizes,rel:"preload",as:"image",href:tt.srcSet?void 0:tt.src,imagesrcset:tt.srcSet,imagesizes:tt.sizes})):null)};var r=d(n(7294)),s=d(n(5443)),a=n(6978),c=n(5809),l=n(7190);function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function d(t){return t&&t.__esModule?t:{default:t}}function f(t){for(var e=arguments,n=function(n){var i=null!=e[n]?e[n]:{},o=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(i).filter((function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable})))),o.forEach((function(e){u(t,e,i[e])}))},i=1;i<arguments.length;i++)n(i);return t}var h=new Set,p=(new Map,"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");var m=new Map([["default",function(t){var e=t.root,n=t.src,i=t.width,o=t.quality;0;return"".concat(e,"?url=").concat(encodeURIComponent(n),"&w=").concat(i,"&q=").concat(o||75)}],["imgix",function(t){var e=t.root,n=t.src,i=t.width,o=t.quality,r=new URL("".concat(e).concat(I(n))),s=r.searchParams;s.set("auto",s.get("auto")||"format"),s.set("fit",s.get("fit")||"max"),s.set("w",s.get("w")||i.toString()),o&&s.set("q",o.toString());return r.href}],["cloudinary",function(t){var e=t.root,n=t.src,i=t.width,o=t.quality,r=["f_auto","c_limit","w_"+i,"q_"+(o||"auto")].join(",")+"/";return"".concat(e).concat(r).concat(I(n))}],["akamai",function(t){var e=t.root,n=t.src,i=t.width;return"".concat(e).concat(I(n),"?imwidth=").concat(i)}],["custom",function(t){var e=t.src;throw new Error('Image with src "'.concat(e,'" is missing "loader" prop.')+"\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader")}]]);function v(t){return void 0!==t.default}var g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default"}||c.imageConfigDefault,y=g.deviceSizes,b=g.imageSizes,w=g.loader,x=g.path,k=(g.domains,o(y).concat(o(b)));function M(t){var e=t.src,n=t.unoptimized,i=t.layout,r=t.width,s=t.quality,a=t.sizes,c=t.loader;if(n)return{src:e,srcSet:void 0,sizes:void 0};var l=function(t,e,n){if(n&&("fill"===e||"responsive"===e)){for(var i,r=/(^|\s)(1?\d?\d)vw/g,s=[];i=r.exec(n);i)s.push(parseInt(i[2]));if(s.length){var a,c=.01*(a=Math).min.apply(a,o(s));return{widths:k.filter((function(t){return t>=y[0]*c})),kind:"w"}}return{widths:k,kind:"w"}}return"number"!==typeof t||"fill"===e||"responsive"===e?{widths:y,kind:"w"}:{widths:o(new Set([t,2*t].map((function(t){return k.find((function(e){return e>=t}))||k[k.length-1]})))),kind:"x"}}(r,i,a),u=l.widths,d=l.kind,f=u.length-1;return{sizes:a||"w"!==d?a:"100vw",srcSet:u.map((function(t,n){return"".concat(c({src:e,quality:s,width:t})," ").concat("w"===d?t:n+1).concat(d)})).join(", "),src:c({src:e,quality:s,width:u[f]})}}function E(t){return"number"===typeof t?t:"string"===typeof t?parseInt(t,10):void 0}function _(t){var e=m.get(w);if(e)return e(f({root:x},t));throw new Error('Unknown "loader" found in "next.config.js". Expected: '.concat(c.VALID_LOADERS.join(", "),". Received: ").concat(w))}function I(t){return"/"===t[0]?t.slice(1):t}y.sort((function(t,e){return t-e})),k.sort((function(t,e){return t-e}))},7190:function(t,e,n){"use strict";function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,o=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);i=!0);}catch(c){o=!0,r=c}finally{try{i||null==a.return||a.return()}finally{if(o)throw r}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(e,"__esModule",{value:!0}),e.useIntersection=function(t){var e=t.rootMargin,n=t.disabled||!s,c=o.useRef(),l=i(o.useState(!1),2),u=l[0],d=l[1],f=o.useCallback((function(t){c.current&&(c.current(),c.current=void 0),n||u||t&&t.tagName&&(c.current=function(t,e,n){var i=function(t){var e=t.rootMargin||"",n=a.get(e);if(n)return n;var i=new Map,o=new IntersectionObserver((function(t){t.forEach((function(t){var e=i.get(t.target),n=t.isIntersecting||t.intersectionRatio>0;e&&n&&e(n)}))}),t);return a.set(e,n={id:e,observer:o,elements:i}),n}(n),o=i.id,r=i.observer,s=i.elements;return s.set(t,e),r.observe(t),function(){s.delete(t),r.unobserve(t),0===s.size&&(r.disconnect(),a.delete(o))}}(t,(function(t){return t&&d(t)}),{rootMargin:e}))}),[n,e,u]);return o.useEffect((function(){if(!s&&!u){var t=r.requestIdleCallback((function(){return d(!0)}));return function(){return r.cancelIdleCallback(t)}}}),[u]),[f,u]};var o=n(7294),r=n(9311),s="undefined"!==typeof IntersectionObserver;var a=new Map},6978:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.toBase64=function(t){return window.btoa(t)}},5809:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.imageConfigDefault=e.VALID_LOADERS=void 0;e.VALID_LOADERS=["default","imgix","cloudinary","akamai","custom"];e.imageConfigDefault={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",domains:[],disableStaticImages:!1,minimumCacheTTL:60,formats:["image/webp"]}},9008:function(t,e,n){t.exports=n(5443)},5675:function(t,e,n){t.exports=n(8045)}}]);