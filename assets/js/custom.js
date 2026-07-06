jQuery(document).ready(function () {
  jQuery('.navbar-toggler').on('click', function () {
    jQuery('.nav-menu').addClass("show");
    jQuery('.body-overlay').addClass('active');
  });
  jQuery('.navbar-close').on('click', function () {
    jQuery('.nav-menu').removeClass("show");
    jQuery('.body-overlay').removeClass('active');
  });
  jQuery('.body-overlay').on('click', function () {
    jQuery(".nav-menu").removeClass("show");
    jQuery('.body-overlay').removeClass('active');
  });

  // expands the dropdown menu on each click
  jQuery('.nav-menu').find('li .mobile-collapsed').on('click', function (e) {
    e.preventDefault();
    jQuery(this).parent('li').children('ul').stop(true, true).slideToggle(350);
    jQuery(document).find('li.active ul.sub-menu').css('display', 'none');
    jQuery(document).find('li.active').removeClass('active');
  });

  if (jQuery(".is-sticky-on").length > 0) {
    jQuery(window).on('scroll', function () {
      if (jQuery(window).scrollTop() >= 250) {
        jQuery('.is-sticky-on').addClass('is-sticky-menu');
      }
      else {
        jQuery('.is-sticky-on').removeClass('is-sticky-menu');
      }
    });
  }

  // Active Menu Item Logic
  var navLinks = jQuery('.primary-menu-list li a').not('[href="javascript:void(0);"]');
  var sections = jQuery('section[id], footer[id]');
  var isScrollingFromDoc = false;

  function updateActiveMenu() {
    if (isScrollingFromDoc) return;

    var scrollPos = jQuery(window).scrollTop() + 180;

    // Default Home
    if (jQuery(window).scrollTop() < 150) {
      jQuery('.primary-menu-list li').removeClass('current-menu-item');
      jQuery('.primary-menu-list li a[href="index.html"]').parent('li').addClass('current-menu-item');
      return;
    }

    sections.each(function () {
      var top = jQuery(this).offset().top,
        bottom = top + jQuery(this).outerHeight();

      if (scrollPos >= top && scrollPos < bottom) {
        var id = jQuery(this).attr('id');
        if (id) {
          jQuery('.primary-menu-list li').removeClass('current-menu-item');
          jQuery('.primary-menu-list li a[href="#' + id + '"]').parent('li').addClass('current-menu-item');
          jQuery('.primary-menu-list li a[href*="#' + id + '"]').parent('li').addClass('current-menu-item');
        }
      }
    });
  }

  jQuery(window).on('scroll', updateActiveMenu);

  navLinks.on('click', function () {
    isScrollingFromDoc = true;
    jQuery('.primary-menu-list li').removeClass('current-menu-item');
    jQuery(this).parent('li').addClass('current-menu-item');

    // Smooth Close Mobile Menu
    if (jQuery(window).width() < 992) {
      jQuery(".nav-menu").removeClass("show");
      jQuery('.body-overlay').removeClass('active');
    }

    setTimeout(function () {
      isScrollingFromDoc = false;
    }, 1200);
  });

  // Init
  updateActiveMenu();
});

// Preloader
jQuery(window).on('load', function () {
  jQuery('.loader-body').fadeOut(); // Hide the preloader element
});


// Home Slider
if (jQuery(".ast_home_slider").length > 0) {
  var $owlHome = jQuery('.ast_home_slider');
  $owlHome.owlCarousel({
    rtl: jQuery("html").attr("dir") == 'rtl' ? true : false,
    items: 1,
    autoplay: true,
    autoplayTimeout: 5000,
    margin: 0,
    loop: true,
    nav: true,
    singleItem: true,
    touchDrag: true,
    mouseDrag: true,
    navText: ['<i class="fa fa-arrow-left""></i>', '<i class="fa fa-arrow-right"></i>'],
    responsive: {
      0: {
        nav: false,
        dots: false
      },
      992: {
        dots: true
      },
      1000: {
        dots: true
      }
    }
  });
}

const select = (el, all = false) => {
  el = el.trim()
  if (all) {
    return [...document.querySelectorAll(el)]
  } else {
    return document.querySelector(el)
  }
}

const on = (type, el, listener, all = true) => {
  let selectEl = select(el, all)
  if (selectEl) {
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener))
    } else {
      selectEl.addEventListener(type, listener)
    }
  }
}

// Single Magnific Popup Video
jQuery('.ast_btn_play').magnificPopup({
  type: 'iframe'
});

jQuery('.availability-carousel').owlCarousel({
  loop: true,
  margin: 15,
  nav: true,
  dots: false,
  navText: ['<i class="fa fa-long-arrow-left""></i>', '<i class="fa fa-long-arrow-right"></i>'],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 3
    },
    1000: {
      items: 5
    }
  }
})

// Product Slider
if (jQuery(".ast_product_slider").length > 0) {
  var $owlHome = jQuery('.ast_product_slider');
  $owlHome.owlCarousel({
    autoplay: false,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    margin: 20,
    loop: true,
    dots: false,
    nav: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });
}

// Funfact Script
const counters = document.querySelectorAll('.value');
const speed = 200;

counters.forEach(counter => {
  const animate = () => {
    const value = +counter.getAttribute('akhi');
    const data = +counter.innerText;

    const time = value / speed;
    if (data < value) {
      counter.innerText = Math.ceil(data + time);
      setTimeout(animate, 1);
    } else {
      counter.innerText = value;
    }
  }
  animate();
});

/*----------- 15. Indicator Position ----------*/
function setPos(element) {
  var indicator = element.siblings('.indicator'),
    btnWidth = element.css('width'),
    btnHiehgt = element.css('height'),
    btnLeft = element.position().left,
    btnTop = element.position().top;
  element.addClass('active_tab').siblings().removeClass('active_tab');
  indicator.css({
    left: btnLeft + 'px',
    top: btnTop + 'px',
    width: btnWidth,
    height: btnHiehgt,
  })
};

jQuery('.Kundali_matching_tab a').each(function () {
  var link = jQuery(this);
  if (link.hasClass('active_tab')) setPos(link);
  link.on('mouseover', function () {
    setPos(jQuery(this));
  });
})

// Cart addButton
jQuery(document).ready(function () {

  jQuery('.quantity_add_btn').on('click', function () {
    var $counter = jQuery(this).closest('.quantity');
    var $value = $counter.find('.cart_quantity');
    var currentValue = parseInt($value.text(), 10);
    $value.text(currentValue + 1);
  });
  // When the "subtract" button is clicked
  jQuery('.quantity_subtract_btn').on('click', function () {
    var $counter = jQuery(this).closest('.quantity');
    var $value = $counter.find('.cart_quantity');
    var currentValue = parseInt($value.text(), 10);
    if (currentValue > 0) {
      $value.text(currentValue - 1);
    }
  });


  // Back to top
  var amountScrolled = 200;
  var amountScrolledNav = 25;

  jQuery(window).scroll(function () {
    if (jQuery(window).scrollTop() > amountScrolled) {
      jQuery('button.back-to-top').addClass('show');
    } else {
      jQuery('button.back-to-top').removeClass('show');
    }
  });

  jQuery('button.back-to-top').click(function () {
    jQuery('html, body').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

  // Kundali Matchmaking indicator
  jQuery(document).on("click", ".quarterly", function () {

    jQuery(".filder_column").removeClass("active");
    jQuery(".quarterly_content").addClass("active");
  });

  jQuery(document).on("click", ".half_yearly", function () {

    jQuery(".filder_column").removeClass("active");
    jQuery(".half_yearly_content").addClass("active");
  });

});

function handleAstroButtonClick(sectionClass) {
  jQuery(document).on('click', sectionClass + ' .vedicastro_button', function (e) {
    e.preventDefault(); // Prevent form from submitting

    var intervalClass;

    if (sectionClass == ".ast_kundli-matching-section") {
      var boy_fill = jQuery(this).parents(sectionClass).find("#boy-name").val();
      var girl_fill = jQuery(this).parents(sectionClass).find("#girl-name").val();
      if (!boy_fill || !girl_fill) {
        alert("Please fill in all fields."); // Or handle as needed
        return false; // Stop further execution if any field is empty
      }

      jQuery("body.home").addClass("zodic_overlay_show");


      intervalClass = "#maching_data";

    } else {
      var kundaliName = jQuery(this).parents(sectionClass).find("#kundali-name").val();
      var kundaliDate = jQuery(this).parents(sectionClass).find("#kundali-date").val();
      var kundaliTime = jQuery(this).parents(sectionClass).find("#kundali-time").val();
      var kundaliLocation = jQuery(this).parents(sectionClass).find("#kundali-location").val();

      if (sectionClass == ".ast_kundli-section") {
        intervalClass = "#lagan-chart-tabs-main-kundli #lagan_chart_tabs_menu_data";
      } else {
        intervalClass = "#lagan_chart_tabs_menu_data";
      }

      if (!kundaliName || !kundaliDate || !kundaliTime || !kundaliLocation) {
        // If kundali-name is empty, get the value of sade-sati-name
        kundaliName = jQuery(this).parents(sectionClass).find("#sade-sati-name").val();
        kundaliDate = jQuery(this).parents(sectionClass).find("#sade-sati-date").val();
        kundaliTime = jQuery(this).parents(sectionClass).find("#sade-sati-time").val();
        kundaliLocation = jQuery(this).parents(sectionClass).find("#sade-sati-location").val();
        intervalClass = "#sade_sati_res_data .remidiess";
      }


      if (!kundaliName || !kundaliDate || !kundaliTime || !kundaliLocation) {
        kundaliName = jQuery(this).parents(sectionClass).find("#rudraksh-name").val();
        kundaliDate = jQuery(this).parents(sectionClass).find("#rudraksh-date").val();
        kundaliTime = jQuery(this).parents(sectionClass).find("#rudraksh-time").val();
        kundaliLocation = jQuery(this).parents(sectionClass).find("#rudraksh-location").val();
        intervalClass = "#rudraksh_res_data .lagan_chart_birth_title";
      }

      if (!kundaliName || !kundaliDate || !kundaliTime || !kundaliLocation) {
        kundaliName = "not data found";
        kundaliDate = jQuery(this).parents(sectionClass).find("#panchang-date").val();
        kundaliTime = jQuery(this).parents(sectionClass).find("#panchang-time").val();
        kundaliLocation = jQuery(this).parents(sectionClass).find("#panchang-location").val();
        if (jQuery(document).find("#vedicastro-panchang").length > 0) {
          console.log("isndie the condition");
          intervalClass = "#vedicastro-panchang .lagan_birth_table_data";
        } else {
          console.log("outthe condition");
          intervalClass = "#panchang_sec_data .ast_vedicastro_popup";
        }
      }

      if (!kundaliName || !kundaliDate || !kundaliTime || !kundaliLocation) {
        kundaliName = "not data found";
        kundaliDate = "not data found";
        kundaliTime = "not data found";
        kundaliLocation = jQuery(this).parents(sectionClass).find("#retro-year").val();
        intervalClass = "#retro-planites .retro_planites_box";
      }

      if (!kundaliName || !kundaliDate || !kundaliTime || !kundaliLocation) {
        kundaliName = "not data found";
        kundaliDate = jQuery(this).parents(sectionClass).find("#hora-date").val();
        kundaliTime = jQuery(this).parents(sectionClass).find("#hora-time").val();
        kundaliLocation = jQuery(this).parents(sectionClass).find("#hora-location").val();
        intervalClass = "#hora_data .lagan_birth_table_data";
      }

      if (!kundaliName || !kundaliDate || !kundaliTime || !kundaliLocation) {
        kundaliName = "not data found";
        kundaliDate = jQuery(this).parents(sectionClass).find("#choghadiya-date").val();
        kundaliTime = jQuery(this).parents(sectionClass).find("#choghadiya-time").val();
        kundaliLocation = jQuery(this).parents(sectionClass).find("#choghadiya-location").val();
        intervalClass = "#choghadiya_data .lagan_birth_table_data";
      }
      if (!kundaliName || !kundaliDate || !kundaliTime || !kundaliLocation) {
        kundaliName = jQuery(this).parents(sectionClass).find("#numberology-name").val();
        kundaliDate = jQuery(this).parents(sectionClass).find("#numberology-date").val();
        kundaliTime = "not data found";
        kundaliLocation = "not data found";
        intervalClass = "#numerology-data .dashas_dosh";
      }

      if (!kundaliName || !kundaliDate || !kundaliTime || !kundaliLocation) {
        alert("Please fill in all fields."); // Or handle as needed
        return false; // Stop further execution if any field is empty
      }

    }

    // Log removed

    jQuery('.AstroAPI-loader-body').fadeIn();

    if (jQuery(intervalClass).length) {
      // Log removed


      jQuery('.AstroAPI-loader-body').fadeOut();

      jQuery(document).find(sectionClass + " .display_nones").addClass('ast__popup-show');
      jQuery(document).find(sectionClass + " #sade_sati_res_data").addClass('ast__popup-show');

      clearInterval(checkInterval);

      // Add the popup class
      jQuery(document).find(sectionClass + " #panchang_sec_data .ast_vedicastro_popup").addClass('ast__popup-show');
      jQuery(document).find(sectionClass + " #today_img_chart").addClass('ast__popup-show');
      jQuery(document).find(sectionClass + " #numerology-data").addClass('ast__popup-show');

      jQuery(sectionClass + " .sde_sati_group").append("<div class='ast_popup_close'><i class='fa fa-times-circle'></i></div>");
      jQuery('#retro-planites .choose_services_row').append("<div class='ast_popup_close'><i class='fa fa-times-circle'></i></div>");
      jQuery('#maching-results').append("<div class='ast_popup_close'><i class='fa fa-times-circle'></i></div>");
      jQuery("div.Numerology_count_number .numberlogy_grid").append("<div class='ast_popup_close'><i class='fa fa-times-circle'></i></div>");
      jQuery(sectionClass + " .astro_box_grid").append("<div class='ast_popup_close'><i class='fa fa-times-circle'></i></div>");

      var cont = jQuery('div.astro_grid.ast__popup-show').clone();
      jQuery('div.astro_grid.ast__popup-show').remove();
      jQuery(sectionClass + " .sde_sati_group").append(cont);

      var last = jQuery('div.astro_col-5.ast__popup-show').clone();
      jQuery('div.astro_col-5.ast__popup-show').remove();
      jQuery(sectionClass + " .numberlogy_grid").append(last);

      var content = jQuery(document).find('div#vedicastro-panchang').detach();

      var contentHtml = content.html();

      // If it exists, show the popup
      jQuery(document).find("#panchang_sec_data div.astro_box_row").after("<div class='ast_vedicastro_popup'><div class='ast_vedicastro_popup_inner'> " + contentHtml + " <div class='ast_popup_close'><i class='fa fa-times-circle'></i></div></div></div>");
    }
  }, 500);

}

jQuery(document).ready(function () {
  handleAstroButtonClick('.ast_astro-slider-form');
  handleAstroButtonClick('.astro__panchang-section');
  handleAstroButtonClick('.astro__sadesati-section');
  handleAstroButtonClick('.ast_kundli-section');
  handleAstroButtonClick('.ast_kundli-matching-section');
  // Add more sections if needed
});


jQuery(document).on('click', '.ast_popup_close', function () {
  // Remove the popup class
  jQuery('.display_nones, #sade_sati_res_data, .ast_vedicastro_popup').css('display', 'none');
  jQuery('.ast_kundli-section .display_nones').css('display', 'none');
  jQuery('#sade_sati_res_data').removeClass('ast__popup-show');
  jQuery('.display_nones').removeClass('ast__popup-show');
  jQuery('.ast_kundli-section .display_nones').removeClass('ast__popup-show');
  jQuery('#today_img_chart').removeClass('ast__popup-show');
  jQuery('#numerology-data').removeClass('ast__popup-show');
  jQuery("div.zodic_data").removeClass('zodic_data_show');
  jQuery("body").removeClass('zodic_overlay_show');
  if (jQuery(this).parents('.zodic_data').length == 0) {
    location.reload();
  }
});

jQuery(document).on('click', '#kundali-submit', function (e) {
  var content = jQuery(document).find('div.lagan_chart_tabs_main').detach();
  // Append the content to the next sibling div of the parent
  jQuery(document).find('div.astro_box.display_nones .astro_boxes').append(content);
  // Popup Close Button Add
  jQuery("div.astro_box.display_nones .astro_boxes").append("<div class='ast_popup_close'><i class='fa fa-times-circle'></i></div>");
});

jQuery(document).ready(function () {
  // Add click event to elements with class .zodics_sign_tab
  jQuery(".ast__astrocare-horoscope-form .zodics_sign_tab").click(function (event) {
    event.preventDefault();
    // Add a new class to the .zodic_data element


    // Log removed
    jQuery('.AstroAPI-loader-body').fadeIn();

    var checkInterval = setInterval(function () {

      if (jQuery(".zodic_data .gradient_left").length) {
        setTimeout(function () {
          jQuery('.AstroAPI-loader-body').fadeOut();
          jQuery(".zodic_data").addClass("zodic_data_show");
          jQuery("div.zodic_data").append("<div class='ast_popup_close'><i class='fa fa-times-circle'></i></div>");
          jQuery("body").addClass("zodic_overlay_show");
        }, 2000);
        clearInterval(checkInterval);
      }
    }, 500);


  });
});

// Kundali Matchmaking indicator
jQuery(document).ready(function () {

  jQuery(".choose_services_row .astro_col-5:nth-child(4)").addClass("active");

  jQuery(document).on("click", ".quarterly", function () {

    jQuery(".choose_services_row .astro_col-5").removeClass("active");
    jQuery(".choose_services_row .astro_col-5:nth-child(4)").addClass("active");
  });

  jQuery(document).on("click", ".half_yearly", function () {

    jQuery(".choose_services_row .astro_col-5").removeClass("active");
    jQuery(".choose_services_row .astro_col-5:last-child").addClass("active");
  });
});

// Astrologer Message LoadMore

(function ($) {

  // Service Section Load Button Filter
  jQuery(".astrocare-reviews .astrocare-review").slice(0, 3).show();
  jQuery(".astrocare-reviews .astro_load_btn").on('click', function (e) {
    e.preventDefault();
    jQuery(".astrocare-reviews .astro_load_btn").addClass("loadspinner");
    jQuery(".astrocare-reviews .astro_load_btn").animate({
      display: "block"
    }, 1000,
      function () {

        jQuery(".astrocare-reviews .astrocare-review:hidden").slice(0, 2).slideDown();
        if (jQuery(".astrocare-reviews .astrocare-review:hidden").length === 0) {
          jQuery(".astrocare-reviews .astro_load_btn").text("No more");
        }
        jQuery(".astrocare-reviews .astro_load_btn").removeClass("loadspinner");
      }
    );
  });

})(jQuery);