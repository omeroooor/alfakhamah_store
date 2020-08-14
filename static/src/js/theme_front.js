odoo.define('alfakhama_store.carousel_rtl', function (require) {
    "use strict";

    var laze_carousel = require('theme_laze.front_js_multi');
    var animation = require('web_editor.snippets.animation');
    function initialize_owl(el){
        var rtl = false;
        if($('body').hasClass('rtl')) {rtl = true;}
        el.owlCarousel({
            rtl: rtl,
            items: 4,
            margin: 30,
            navigation: true,
            pagination: false,
            responsive: {
                0: {
                    items: 1,
                },
                481: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                1024: {
                    items: 4,
                }
            }

        })
    }
    function destory_owl(el){
        if(el && el.data('owlCarousel'))
       {
        el.data('owlCarousel').destroy();
        el.find('.owl-stage-outer').children().unwrap();
        el.removeData();
        }
      }
      animation.registry.s_product_multi_with_header = animation.Class.extend({
            selector : ".js_multi_collection",
                start: function (editMode) {
                var self = this;
                if (editMode)
                {
                //$('.js_multi_collection').addClass("hidden");
                }
                if(!editMode){
                var list_id=self.$target.attr('data-list-id') || false;
                $.get("/shop/get_multi_tab_content",{'collection_id':list_id}).then(function (data){
    
                    if(data){                   
                        self.$target.empty().append(data);
                        $(".js_multi_collection").removeClass('hidden');
                        $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
                            initialize_owl($(".multi_tab_slider .tab-content .active .multi_slider"));
                        }).on('hide.bs.tab', function () {
                        destory_owl($(".multi_tab_slider .tab-content .active .multi_slider"));
                        });           
                        initialize_owl($(".multi_tab_slider .tab-content .active .multi_slider"));
        }
                });
                }
            },
      });
});

odoo.define('alfakhama_store.quality_product_slider_rtl', function (require) {
    "use strict";
    var laze_carousel = require('theme_laze.front_js');
    var animation = require('web_editor.snippets.animation');
    function initialize_owl(el){
        var rtl = false;
        if($('body').hasClass('rtl')) {rtl = true;}
        el.owlCarousel({
            rtl: rtl,
            items: 4,
            margin: 30,
            navigation: true,
            pagination: false,
            responsive: {
                0: {
                    items: 1,
                },
                481: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                1024: {
                    items: 4,
                }
            }

        })
    }
    
  animation.registry.advance_product_slider = animation.Class.extend({
    selector : ".tqt_products_slider",
        start: function (editMode) {
            var self = this;
			if (editMode)
            {$('.tqt_products_slider .advance_product_slider').addClass("hidden");
			}
			if(!editMode){
			var	tab_collection=parseInt(self.$target.attr('data-tab-id') || 0),
				slider_id='tqt_products_slider'+new Date().getTime();

            $.get("/shop/get_products_content",{'tab_id':self.$target.attr('data-tab-id') || 0,
												'slider_id':slider_id,

            									}).then(function( data ) {
                if(data){                   
                    self.$target.empty().append(data);
					$(".tqt_products_slider").removeClass('hidden');
					initialize_owl($(".tqt-pro-slide"));
    				
                }
            });
			}
        }
    });
});



odoo.define('alfakhama_store.mobile_cart', function (require) {
    "use strict";

    var website_sale = require('website_sale.website_sale');
    if(!$('.js_delete_product').length) {
        return $.Deferred().reject("DOM doesn't contain '.js_delete_product'");
    }
    $(document).ready(function(){
        if($('.js_delete_product').length) {
            $('.oe_cart').on('click', '.js_delete_product', function(e) {
                e.preventDefault();
                var link_line_id = $(this).data('line-id');
                //console.log(link_line_id);
                //$(this).closest('div').find('.js_quantity').val(0).trigger('change');
                $(this).closest('div').parents('div').find('.js_quantity').each(function(){
                    if($(this).data('line-id') == link_line_id) {
                        //console.log($(this).data('line-id'));
                        $(this).val(0).trigger('change');
                    }
                })
            });
        }
    });
});