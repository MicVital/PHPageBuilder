!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([,,,,,,function(t,e,n){t.exports=n(7)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(8),i=(n.n(o),n(9)),a=(n.n(i),n(10)),r=(n.n(a),n(11)),s=(n.n(r),n(12)),l=(n.n(s),n(13)),c=(n.n(l),n(14));n.n(c)},function(t,e){$(document).ready(function(){function t(){window.editor.trigger("change:canvasOffset canvasScroll")}$(".gjs-editor").append($("#toggle-sidebar")),$(".gjs-pn-panels").prepend($("#sidebar-header")),$(".gjs-pn-panels").append($("#sidebar-bottom-buttons")),$("#toggle-sidebar").click(function(){$("#gjs").toggleClass("sidebar-collapsed"),t()}),window.editor.on("run:open-sm",function(t){$(".gjs-trt-traits").parent().parent().css("display","none"),$(".gjs-sm-sectors").parent().parent().css("display","block"),$("#gjs-sm-advanced .gjs-sm-properties").append($(".gjs-clm-tags"))}),window.editor.on("run:open-tm",function(t){$(".gjs-sm-sectors").parent().parent().css("display","none"),$(".gjs-trt-traits").parent().parent().css("display","block")}),window.editor.on("block:drag:start",function(e){$(window).width()<1e3&&($("#gjs").addClass("sidebar-collapsed"),t())});var e=!1;$(document).keydown(function(t){8===t.which&&(e=!0)}).keyup(function(t){8===t.which&&(e=!1)}),$(window).on("beforeunload",function(t){e&&t.preventDefault()})}),window.addEventListener("message",function(t){"page-loaded"===t.data?setTimeout(function(){$("#phpb-loading").addClass("loaded"),$(".gjs-blocks-cs").prepend($("#block-search")),window.isLoaded=!0},500):"touch-start"===t.data&&window.touchStart()},!1)},function(t,e){$(document).on("input","#block-search input",function(){var t=$(this).val().toLowerCase();$(".gjs-blocks-cs .gjs-block").each(function(){$(this).text().toLowerCase().includes(t)?$(this).removeClass("d-none"):$(this).addClass("d-none")})})},function(t,e){$(document).ready(function(){function t(){o();var t=e(window.editor.getWrapper().find("[phpb-content-container]")[0]);$.ajax({type:"POST",url:$("#save-page").data("url"),data:{data:JSON.stringify(t)},success:function(){o(),window.toastr.success(window.translations["toastr-changes-saved"])},error:function(){o(),window.toastr.error(window.translations["toastr-saving-failed"])}})}function e(t){var e=function t(e){var o=arguments.length>1&&void 0!==arguments[1]&&arguments[1];var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];var a={};a.current_block={};a.blocks={};var r=window.editor.getCss();var s=o;var l=i;void 0!==e.attributes["block-id"]&&("false"===e.attributes["is-html"]?(s=!0,l=!1):o&&"true"===e.attributes["is-html"]&&(l=!0));e.get("components").forEach(function(e){var n=t(e,s,l);for(var o in n.current_block)a.current_block[o]=n.current_block[o];for(var i in n.blocks)a.blocks[i]=n.blocks[i]});if(void 0!==e.attributes["block-id"])if(o&&"true"===e.attributes["is-html"]&&!1===i)a.current_block[e.attributes["block-id"]]=window.html_beautify(e.toHTML());else if("false"===e.attributes["is-html"]){var c={};e.get("traits").each(function(t){c[t.get("name")]=t.getTargetValue()}),a.current_block.attributes=c,void 0!==e.attributes["style-identifier"]&&r.includes(e.attributes["style-identifier"])&&(a.current_block.attributes["style-identifier"]=e.attributes["style-identifier"]);var d="ID"+(Date.now().toString(36)+Math.random().toString(36).substr(2,5)+n++).toUpperCase();if(e.replaceWith({tagName:"phpb-block",attributes:{slug:e.attributes["block-slug"],id:d}}),o){var u={};u[e.attributes["block-id"]]=a.current_block,a.current_block=u}else a.blocks[d]=a.current_block,a.current_block={}}return a}(t=window.cloneComponent(t)).blocks,o=window.html_beautify(function(t){var e="";t.get("components").forEach(function(t){return e+=t.toHTML()});var n=$("<container>"+e+"</container>");return n.find("phpb-block").each(function(){$(this).replaceWith('[block slug="'+$(this).attr("slug")+'" id="'+$(this).attr("id")+'"]')}),n.html()}(t)),i=window.editor.getCss(),a=window.editor.getStyle();return{html:o,css:i,components:JSON.parse(JSON.stringify(t.get("components"))),blocks:e,style:a}}$("#save-page").click(function(){t()}),$(document).bind("keydown",function(e){if(e.ctrlKey&&83===e.which)return t(),e.preventDefault(),!1}),window.getComponentDataInStorageFormat=function(t){var n=window.cloneComponent(t.parent());return n.get("components").reset(),n.append(t),e(n)};var n=0;function o(){var t=$("#save-page");t.blur(),t.hasClass("waiting")?(t.attr("disabled",!1),t.removeClass("waiting"),t.find(".spinner-border").addClass("d-none")):(t.attr("disabled",!0),t.addClass("waiting"),t.find(".spinner-border").removeClass("d-none"))}})},function(t,e){!function(){function t(){for(var t in window.themeBlocks){var e=window.themeBlocks[t],n=$("<container>").append(e.content);n.find("[phpb-blocks-container]").each(function(){""!==$(this).html()&&""===$(this).html().trim()&&$(this).html("")}),e.content=n.html(),editor.BlockManager.add(t,e)}}function e(t){var n=t;if("phpb-block"===t.get("tagName")){var o=t.attributes.attributes.id;void 0!==window.dynamicBlocks[o]&&void 0!==window.dynamicBlocks[o].html&&(n=t.replaceWith(window.dynamicBlocks[o].html))}n.get("components").each(function(t){return e(t)})}function n(t){var e=!1,n=t.getEl();if(n&&n.style){var o=window.getComputedStyle(n);["background","background-image","background-color"].forEach(function(t){var n=o.getPropertyValue(t);void 0===n||""===n||n.includes("none")||n.includes("rgba(0, 0, 0, 0)")||(e=!0)})}return e}function o(t){if("phpb-block"===t.attributes.tagName){var e=t.parent(),n=cloneComponent(t),a=void 0;e.components().each(function(e){e.cid===t.cid&&(a=t.replaceWith({tagName:"div"}),n.components().each(function(t){a.append(cloneComponent(t))}))}),t.remove(),i(n,a,!0,!1),function(t){if(void 0===window.blockSettings[t.attributes["block-slug"]])return;t.attributes.settings={};var e=[],n=t.attributes["block-id"];if(void 0!==window.dynamicBlocks[n]&&void 0!==window.dynamicBlocks[n].settings.attributes)t.attributes.settings=window.dynamicBlocks[n].settings,e=window.dynamicBlocks[n].settings.attributes;else if(t.parent()&&void 0!==t.parent().attributes.settings){var o=t.parent().attributes.settings;void 0!==o[n]&&void 0!==o[n].attributes&&(t.attributes.settings=o[n],e=o[n].attributes)}void 0!==e["style-identifier"]&&t.addClass(e["style-identifier"]);t.attributes["is-updating"]=!0,window.blockSettings[t.attributes["block-slug"]].forEach(function(n){var o=t.addTrait(n);void 0!==e[n.name]?o.setTargetValue(e[n.name]):void 0!==n["default-value"]&&o.setTargetValue(n["default-value"])}),t.attributes["is-updating"]=!1}(a),o(a)}else t.components().each(function(t){o(t)})}function i(t,e,n,o){var i=t.attributes.attributes;for(var a in i)i.hasOwnProperty(a)&&(o&&(e.attributes.attributes[a]=i[a]),n&&(e.attributes[a]=i[a]))}function a(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(l(t),void 0!==t.attributes.attributes["phpb-content-container"])t.set({droppable:!0,hoverable:!0});else if(void 0!==t.attributes["block-slug"]){var i={selectable:!0,hoverable:!0};e||(i={removable:!0,draggable:!0,copyable:!0,selectable:!0,hoverable:!0,stylable:!0},s(t)),"true"===t.attributes["is-html"]?(e=!1,o=!0):(e=!0,o=!1,t.getEl().setAttribute("data-cursor","default")),t.set(i)}o&&function(t){var e=t.get("tagName");(["h1","h2","h3","h4","h5","h6","h7","p","a","img","button","small","b","strong","i","em","ul","li","th","td"].includes(e)||n(t))&&r(t)}(t),function(t){("phpb-editable"in t.attributes.attributes||"phpb-blocks-container"in t.attributes.attributes)&&r(t)}(t),t.get("components").each(function(t){return a(t,e,o)})}function r(t){var e={hoverable:!0,selectable:!0,editable:!0,stylable:!0};"phpb-blocks-container"in t.attributes.attributes&&(e.droppable=!0),t.set(e),s(t)}function s(t){var e=!1;t.getClasses().forEach(function(t){t.startsWith("ID")&&16===t.length&&(e=t)}),void 0===t.attributes["style-identifier"]&&(t.attributes["style-identifier"]=e||"ID"+(Date.now().toString(36)+Math.random().toString(36).substr(2,5)+c++).toUpperCase()),e||t.addClass(t.attributes["style-identifier"])}function l(t){t.set({removable:!1,draggable:!1,droppable:!1,badgable:!1,stylable:!1,highlightable:!1,copyable:!1,resizable:!1,editable:!1,layerable:!1,selectable:!1,hoverable:!1})}window.editor.on("load",function(n){!function t(e){if("phpb-content-container"in e.attributes.attributes)return;l(e);e.get("components").each(function(e){return t(e)})}(n.getWrapper()),t();var i=n.getWrapper().find("[phpb-content-container]")[0];i.set("custom-name",window.translations["page-content"]),i.components(window.pageComponents),e(i),o(i),setTimeout(function(){a(i)},500)}),window.editor.on("component:selected",function(t){document.querySelector(".gjs-toolbar").classList.add("d-none"),(t.attributes.draggable||t.attributes.removable||"phpb-blocks-container"in t.attributes.attributes)&&document.querySelector(".gjs-toolbar").classList.remove("d-none"),void 0!==window.blockSettings[t.attributes["block-slug"]]&&window.blockSettings[t.attributes["block-slug"]].length?$(".gjs-pn-buttons .gjs-pn-btn:nth-of-type(2)").click():n(t)&&($(".gjs-pn-buttons .gjs-pn-btn:nth-of-type(3)").click(),$("#gjs-sm-position").hasClass("gjs-sm-open")&&$("#gjs-sm-position").find(".gjs-sm-title").click(),$("#gjs-sm-background").hasClass("gjs-sm-open")||$("#gjs-sm-background").find(".gjs-sm-title").click())}),window.editor.on("block:drag:stop",function(t){if(t){var e=t.parent();o(t),a(e)}}),window.editor.on("component:update",function(t){if(!0===window.isLoaded&&!t.attributes["is-updating"]&&void 0!==t.changed.attributes&&0!==$(".gjs-frame").contents().find("#"+t.ccid).length){for(var n=t;n.parent()&&"false"===n.parent().attributes["is-html"];)n=n.parent();(t=n).attributes["is-updating"]=!0,$(".gjs-frame").contents().find("#"+t.ccid).addClass("gjs-freezed");var i=window.editor.getWrapper().find("#"+t.ccid)[0].parent(),r=window.getComponentDataInStorageFormat(t);$.ajax({type:"POST",url:window.renderBlockUrl,data:{data:JSON.stringify(r)},success:function(n){var s=$(n).attr("block-id");void 0===window.dynamicBlocks[s]&&(window.dynamicBlocks[s]={settings:{}}),window.dynamicBlocks[s].settings=void 0===r.blocks[s]?{}:r.blocks[s],t.replaceWith(n),e(i),o(i),a(i);var l=void 0;i.components().each(function(t){t.attributes["block-id"]===s&&(l=t)}),window.editor.select(l)},error:function(){$(".gjs-frame").contents().find("#"+t.ccid).removeClass("gjs-freezed"),t.attributes["is-updating"]=!1}})}}),window.cloneComponent=function(t){var e=t.clone();return function t(e,n){i(e,n,!1,!0);for(var o=0;o<e.components().length;o++){var a=e.components().models[o],r=n.components().models[o];t(a,r)}}(t,e),e};var c=0}()},function(t,e){$(document).ready(function(){window.CKEDITOR.on("dialogDefinition",function(t){var e=t.data.name,n=t.data.definition;if("link"===e){var o=n.getContents("info");n.onLoad=function(){var t=CKEDITOR.dialog.getCurrent();t.getContentElement("info","linkType").getElement().hide(),t.getContentElement("info","protocol").getElement().hide(),t.getContentElement("info","url").getElement().hide()},o.add({type:"select",id:"linktype-selector",label:"Linktype",default:"",items:[[window.translations.page,"page"],["URL","url"]],onChange:function(t){var e=CKEDITOR.dialog.getCurrent();"page"===t.data.value?(e.getContentElement("info","page-selector").getElement().show(),e.getContentElement("info","url-field").getElement().hide()):(e.getContentElement("info","page-selector").getElement().hide(),e.getContentElement("info","url-field").getElement().show(),e.getContentElement("info","url-field").setValue(""))},setup:function(t){void 0===t.type?this.setValue("page"):"url"===t.type&&t.url.url.startsWith("[page id=")?this.setValue("page"):this.setValue(t.type)}}),o.add({type:"select",id:"page-selector",label:window.translations.page,default:"",items:window.pages,onChange:function(){var t=CKEDITOR.dialog.getCurrent(),e="[page id="+this.getValue()+"]";t.setValueOf("info","url",e),t.setValueOf("info","protocol","")},setup:function(t){this.allowOnChange=!1;var e="";t.url&&(e=t.url.url.substr(9,t.url.url.length-10)),this.setValue(e),this.allowOnChange=!0}}),o.add({type:"text",id:"url-field",label:"URL",default:"",onChange:function(){var t=CKEDITOR.dialog.getCurrent(),e=this.getValue();t.setValueOf("info","url",e)},setup:function(t){this.allowOnChange=!1;var e="";t.url&&(e=t.url.url),this.setValue(e),this.allowOnChange=!0}})}})})},function(t,e){$(document).ready(function(){window.CKEDITOR.on("instanceReady",function(t){var e=t.editor;e.on("paste",function(t){var n=$(e.element.$).closest("body");n.animate({scrollTop:n.scrollTop()},10)})})})},function(t,e){$(document).ready(function(){window.touchStart=function(){$("#gjs").addClass("sidebar-collapsed")}})}]);