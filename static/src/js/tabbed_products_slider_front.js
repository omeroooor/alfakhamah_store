odoo.define('alfakhama.tabbed_products_slider_front',function(require){
    'use strict';

    var animation = require('web_editor.snippets.animation');

    function initialize_owl(el) {
        var rtl = false;
        if($('body').hasClass('rtl')) {rtl = true;}
        if(el && !el.data('owlCarousel')) {
            el.owlCarousel({
                rtl: rtl,
                items: 4,
                margin: 30,
                autoplay: true,
                loop: true,
                interval: 2000,
                rewind: true,
                slideBy: 'page',
                smartSpeed: 100,
                autoplayHoverPause: true,
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
            });
        } else {
            el.trigger('next.owl.carousel');
        }
    }

    function destory_owl(el) {
        if(el && el.data('owlCarousel')) {
            el.data('owlCarousel').destroy();
            el.find('.owl-stage-outer').children().unwrap();
            el.removeData();
        }
    }

    animation.registry.alfakhamah_tabbed_products_slider = animation.Class.extend({
        selector : ".js_tabbed_slider",
        start: function (editMode) {
            var self = this;
            if (editMode) {/*$('.js_multi_collection').addClass("hidden");*/}
            if(!editMode){
                var list_id=self.$target.attr('data-list-id') || false;
                $.get("/shop/get_tabbed_products_slider_content",{'collection_id':list_id}).then(function (data) {
                    if(data){                   
                        self.$target.empty().append(data);
                        $(".js_tabbed_slider").removeClass('hidden');
                        $('.tabbed_products_slider li a[data-toggle="tab"]').on('shown.bs.tab', function () {
                            initialize_owl($(".tabbed_products_slider .tabbed-slider-content .active .products_slider"));
                        });
                        initialize_owl($(".tabbed_products_slider .tabbed-slider-content .active .products_slider"));
                    }
                });
            }
        },
    });
});

