/* Copyright (C) YOOtheme GmbH, YOOtheme Proprietary Use License (http://www.yootheme.com/license) */

jQuery(function($) {

    var config = $('html').data('config') || {}, navbar = $('.tm-navbar');

    // Social buttons
    $('article[data-permalink]').socialButtons(config);

    // push footer to bottom of page
    UIkit.$win.on('load resize', UIkit.Utils.debounce((function(block_main, block_footer, fn, h) {

        block_main   = $('.tm-main');
        block_footer = $('.tm-block-footer');

        fn  = function() {

            block_main.css('min-height', '');

            if (document.body.scrollHeight <= window.innerHeight) {

                h =  window.innerHeight-block_footer.outerHeight();

                block_main.css('min-height', h);
            }

            return fn;
        };

        return fn();

    })(), 80));


    // Navbar
    if (navbar.length) {

        var sizer   = $('<div class="tm-navbar-sizer" style="height:0px;"></div>').appendTo(navbar),
            items   = navbar.find('.uk-navbar-nav > li').attr('data-uk-dropdown', "{justify: 'body'}"),
            item;

        items.each(function() {

            item = $(this);

            var dp = item.find('.uk-dropdown:first');

            if (item.find('a:first').attr('href') == '#' && !config.menu_hover) {
                item.attr('data-uk-dropdown', "{justify: 'body', mode:'click'}");
            }

            if (dp.length) {

                var grid = dp.find('.uk-dropdown-grid').addClass('uk-grid-match uk-container-center'),
                    dpw  = item.attr('data-dropdownwidth');

                if (dpw) {
                    grid.css('max-width', dpw + (dpw.indexOf('%')=='-1' ? 'px':''));
                }

                dp.data('navs', dp.find('.uk-nav-navbar'));

                if (dp.data('navs').length > 1) {

                    dp.on('mouseenter', '.uk-nav-navbar', function(){
                        dp.data('navs').not(this).addClass('tm-link-muted');
                    }).on('mouseleave', '.uk-nav-navbar', function() {
                        dp.data('navs').not(this).removeClass('tm-link-muted');
                    });
                }

                if (dp.data('navs').length === 1) {
                    dp.data('navs').addClass('uk-text-center');
                }

            } else {
                item.removeAttr('data-uk-dropdown');
            }

        }).on('show.uk.dropdown', function(e, dropdown) {

            var dp = dropdown.dropdown.css('opacity', 0);

            if (!dp.find('.uk-container').length) {
                dp.find('.uk-grid:first').wrap($('<div class="uk-container uk-container-center"></div>'));
            }

            sizer.stop().animate({height: dp.outerHeight()}, 200, function() {
                dp.animate({opacity: 1});
            });

        }).on('hide.uk.dropdown', function() {
            sizer.stop().animate({height: 0}, 200);
        });

    }

    setTimeout(function(){
        UIkit.$win.trigger('resize');
    }, 500);

});
