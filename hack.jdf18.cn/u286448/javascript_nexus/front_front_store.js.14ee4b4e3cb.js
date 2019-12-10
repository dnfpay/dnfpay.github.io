ips.templates.set('nexus.store.productImage',"  <a href='{{fullURL}}' data-fullURL='{{fullURL}}' class='cNexusProduct_primaryImage ipsContained' data-ipsLightbox data-ipsLightbox-group='product' data-ipsProductZoom>  <img src='{{thumbURL}}' class='ipsImage ipsImage_thumb'> </a>");;
;(function($,_,undefined){"use strict";ips.controller.register('nexus.front.store.cartReview',{initialize:function(){this.on('click','[data-action="removeFromCart"]',this.removeFromCart);this.on('submit','[data-role="quantityForm"]',this.quantityForm);this.on('click','[data-action="checkout"]',this.checkout);},checkout:function(e){if($(e.target).hasClass('ipsButton_disabled')){e.preventDefault();}else{$(e.target).addClass('ipsButton_disabled');}},removeFromCart:function(e){e.preventDefault();var self=this;var url=$(e.currentTarget).attr('href');ips.ui.alert.show({type:'confirm',message:ips.getString('confirmRemoveItem'),icon:'warn',callbacks:{ok:function(){ips.getAjax()(url).done(function(response){self.scope.find('[data-role="cart"]').html(response);});}}});},quantityForm:function(e){e.preventDefault();var self=this;var form=$(e.currentTarget);var menu=form.closest('.ipsMenu');menu.css({height:menu.outerHeight()+'px'}).addClass('ipsLoading');form.hide();ips.getAjax()(form.attr('action'),{data:form.serialize()}).done(function(response){self.scope.find('[data-role="cart"]').html(response);}).fail(function(response){menu.removeClass('ipsLoading');form.show();ips.ui.alert.show({type:'alert',icon:'warn',message:response.responseJSON});});}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('nexus.front.store.category',{_ajaxObj:null,initialize:function(){this.on('click','[data-action="filter"],[data-page]',this.changeView);this.on(window,'statechange',this.stateChange);this.setup();},setup:function(){History.pushState({controller:'storeCategoryView'},document.title,window.location.href);},changeView:function(e){e.preventDefault();if($(e.target).hasClass('ipsSideMenu_item')){$(e.target).toggleClass('ipsSideMenu_itemActive');}
var self=this;var url=$(e.currentTarget).attr('href');History.pushState({controller:'storeCategoryView'},document.title,url);},stateChange:function(){var state=History.getState();if(_.isUndefined(state.data.controller)||state.data.controller!='storeCategoryView'){return;}
ips.utils.analytics.trackPageView(state.url);this._updateView(state.url,state.title)},_updateView:function(url,title){var self=this;if(this._ajaxObj&&_.isFunction(this._ajaxObj.abort)){this._ajaxObj.abort();}
this._setLoading(true);this._ajaxObj=ips.getAjax()(url).done(function(response){$('[data-role="packageListContainer"]').html(response.contents);$('[data-role="categorySidebar"]').html(response.sidebar);$(document).trigger('contentChange',[$('[data-role="packageListContainer"]'),$('[data-role="categorySidebar"]')]);History.pushState({controller:'storeCategoryView'},title,url);}).always(function(){self._setLoading(false);});},_setLoading:function(state){if(state){$('[data-role="packageList"]').css('height',$('[data-role="packageList"]').height()).html('').addClass('ipsLoading');}else{$('[data-role="packageList"]').css('height','auto').removeClass('ipsLoading');}}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('nexus.front.store.currencySelect',{initialize:function(){this.on('click','a',this.currencyChangeWarning);},currencyChangeWarning:function(e){e.preventDefault();ips.ui.alert.show({type:'confirm',message:ips.getString('store_currency_change_warning'),icon:'warn',callbacks:{ok:function(){window.location=$(e.currentTarget).attr('href');}}});}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('nexus.front.store.giftCard',{initialize:function(){this.on('click','[data-color]',this.toggleColor);this.on('change','[name="gift_voucher_amount"], [name="x_gift_voucher_amount"]',this.changeAmount);this.setup();},setup:function(){this.changeAmount();if($('input[name="gift_voucher_color"]').val()){this.setColor($('input[name="gift_voucher_color"]').val());}},changeAmount:function(){var amountVal=this.scope.find('[name="gift_voucher_amount"]:checked').val();var customVal=this.scope.find('[name="x_gift_voucher_amount"]').val();var amount=0;if(amountVal=='x'){if(!_.isUndefined(customVal)&&customVal!=''&&customVal!='x'){amount=customVal;}
var scope=this.scope;ips.getAjax()(this.scope.attr('data-formatCurrencyUrl')+'&amount='+amount).done(function(response){scope.find('[data-role="value"]').text(response);});}else{amount=amountVal;this.scope.find('[data-role="value"]').text(this.scope.find('label[for="'+this.scope.find('[name="gift_voucher_amount"]:checked').attr('id')+'"]').text());}},toggleColor:function(e){e.preventDefault();var swatch=$(e.currentTarget);var color=swatch.attr('data-color');this.setColor(color);},setColor:function(color){this.scope.find('[data-role="giftCard"]').css({backgroundColor:'#'+color}).end().find('input[type="hidden"][name="gift_voucher_color"]').val('#'+color).end().find('[data-color]').closest('li').removeAttr('data-selected');$(this.scope).find('[data-color="'+color+'"]').closest('li').attr('data-selected',true);}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('nexus.front.store.packagePage',{_productURL:'',initialize:function(){this.on('change','select, input[type="radio"], [name="quantity"], [name="renewal_term"]',this.updatePriceAndStock);this.on('submit','form',this.submitForm);this.on('click','[data-action="toggleImage"]',this.toggleScreenshot);this.on(document,'addToCart.nexus',this.addToCart);this.setup();},setup:function(){this.scope.find('.cNexusProduct_images [data-action="toggleImage"]').first().addClass('cNexusProduct_imageSelected');if(this.scope.find('select,input[type="radio"]').length){this.updatePriceAndStock();}},toggleScreenshot:function(e){e.preventDefault();var clickedImage=$(e.currentTarget);var thumbImage=clickedImage.find('img').attr('src');var fullImage=clickedImage.attr('href');var html=ips.templates.render('nexus.store.productImage',{fullURL:fullImage,thumbURL:thumbImage});this.scope.find('.cNexusProduct_primaryImage').replaceWith(html).end().find('[data-action="toggleImage"]').removeClass('cNexusProduct_imageSelected');clickedImage.addClass('cNexusProduct_imageSelected');$(document).trigger('contentChange',[this.scope.find('.cNexusProduct_primaryImage').parent()]);},submitForm:function(e){var self=this;var form=this.scope.find('form');if(form.attr('data-noajax')){return true;}
e.preventDefault();e.stopPropagation();var formDims=ips.utils.position.getElemDims(form);var formPos=ips.utils.position.getElemPosition(form);var loadingElem=$('<div/>').addClass('ipsLoading');form.after(loadingElem);loadingElem.css({top:formPos.offsetPos.top+'px',left:formPos.offsetPos.left+'px',width:formDims.outerWidth+'px',height:formDims.outerHeight+'px'});this._productURL=form.attr('action');this.trigger('addToCart.nexus',{url:this._productURL,formData:form.serialize()});},addToCart:function(e,data){if(data.url!==this._productURL){return;}
var self=this;ips.getAjax()(data.url,{data:data.formData,type:'post'}).done(function(response){if(self.scope.closest('.ipsDialog').length){var dialogContent=self.scope.closest('.ipsDialog').find('.ipsDialog_content');self.trigger('destroy');dialogContent.html(response.dialog).show();$(document).trigger('contentChange',[dialogContent]);}else{var contentElem=$('<div/>').html(response.dialog);var loadingElem=self.scope.find('form').next('.ipsLoading');ips.getContainer().append(contentElem);var dialogRef=ips.ui.dialog.create({title:self.scope.attr('data-itemTitle'),content:contentElem,forceReload:true,size:'medium'});dialogRef.show();$(document).trigger('contentChange',[contentElem]);loadingElem.remove();self.updatePriceAndStock();}
if(response.cart){$('#elCart_container').replaceWith($('<div>'+response.cart+'</div>').find('.cUserNav_icon'));$('#elCart_sep').removeClass('ipsHide');}}).fail(function(response){var loadingElem=self.scope.find('form').next('.ipsLoading');loadingElem.remove();if(response.responseJSON){ips.ui.alert.show({type:'alert',message:response.responseJSON,icon:'warn'});}else{var form=$(e.target).find('form');try{var newForm=$(response.responseText);}catch(err){form.attr('data-noajax','true');form.submit();}
form.replaceWith(newForm);$(document).trigger('contentChange');}});},updatePriceAndStock:function(){var self=this;var form=this.scope.find('form');ips.getAjax()(form.attr('action'),{dataType:'json',data:form.serialize()+'&stockCheck=1',type:'post'}).done(function(response){self.scope.find('[data-role="price"]').html(response.price);self.scope.find('[data-role="stock"]').html(response.stock);self.scope.find('[data-role="renewalTerm"]').html(response.renewal);if(response.okay){self.scope.find('button').removeAttr('disabled').text(ips.getString('add_to_cart_js'));}else{self.scope.find('button').attr('disabled','disabled').text(ips.getString('out_of_stock'));}}).fail(function(response){Debug.error(response);});}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('nexus.front.store.register',{_infoPaneWrapper:null,_infoPane:null,initialize:function(){this.on('click','[data-role="productCarousel"] .cNexusProduct',this.selectProduct);this.on('click','[data-action="closeInfo"]',this.closeInfo);this.on('addToCart.nexus',this.addToCart);this.setup();},setup:function(){this._infoPaneWrapper=this.scope.find('[data-role="productInformationWrapper"]');this._infoPane=this.scope.find('[data-role="productInformation"]');},closeInfo:function(e){e.preventDefault();this.scope.find('[data-role="productCarousel"] .cNexusProduct').removeClass('cNexusProduct_selected');this._infoPaneWrapper.hide().find('[data-action="closeInfo"]').hide();},selectProduct:function(e){e.preventDefault();var selectedProduct=$(e.currentTarget);var self=this;this.scope.find('[data-role="productCarousel"] .cNexusProduct').removeClass('cNexusProduct_selected');selectedProduct.addClass('cNexusProduct_selected');var url=selectedProduct.find('[data-role="productLink"]').attr('href');var height=200;if(this._infoPaneWrapper.is(':visible')){height=this._infoPane.height();}
this._infoPaneWrapper.show().find('[data-action="closeInfo"]').hide();this._infoPane.css({height:height+'px'}).html('').addClass('ipsLoading');ips.getAjax()(url).done(function(response){self._infoPaneWrapper.find('[data-action="closeInfo"]').show();self._infoPane.removeClass('ipsLoading').css({height:'auto'}).html(response);$(document).trigger('contentChange',[self._infoPane]);});},addToCart:function(e,data){e.stopPropagation();var self=this;ips.getAjax()(data.url,{data:data.formData+'&registerCheckout=1',type:'post'}).done(function(response){self._infoPane.html(response.dialog);$(document).trigger('contentChange',[self._infoPane]);}).fail(function(response){var loadingElem=self.scope.find('form').next('.ipsLoading');loadingElem.remove();if(response.responseJSON){ips.ui.alert.show({type:'alert',message:response.responseJSON,icon:'warn'});}else{var form=$(e.target).find('form');try{var newForm=$(response.responseText);}catch(err){form.attr('data-noajax','true');form.submit();}
form.replaceWith(newForm);$(document).trigger('contentChange');}});},});}(jQuery,_));;