'use strict';

$(document).ready(function () {
  $('.js-select2-location').select2({
    dropdownCssClass: 'select2-container-location'
  }).on('select2:open', function (e) {
    $(e.target).closest('.select2-wrapper').addClass('-open');
    if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 768) {
      setTimeout(function () {
        $('.select2-search__field').focus();
      }, 100);
    } else {
      $('.select2-search__field').prop('focus', 0);
    }
  }).on('select2:close', function (e) {
    $(e.target).closest('.select2-wrapper').removeClass('-open');
  });

  $('.js-select2-icon, .js-select2-label').on('click', function () {
    $(this).siblings('select').select2('open');
  });

  // scrollToPage
  var $page = $('html,body');
  var scrollToPage = function scrollToPage(target) {
    var translateY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var y = 0;
    if (target && $(target).length) {
      y = $(target).offset().top;
    }
    $page.animate({ scrollTop: y + translateY }, 300, 'swing');
    return;
  };

  $('.js-scrollto').on('click', function (e) {
    e.preventDefault();
    scrollToPage($(this).attr('href'));
  });

  var openPassangerForm = function openPassangerForm() {
    $('.js-form-parcel').addClass('-hide');
    $('.js-form-passanger').removeClass('-hide');
    $('.js-top-search-tabs-item').removeClass('-active');
    $('.js-top-search-passanger').addClass('-active');

    scrollToPage('#the-header-first-screen__search');
    // $('#selectFrom').select2('open');
  };

  var openParcelForm = function openParcelForm() {
    $('.js-form-passanger').addClass('-hide');
    $('.js-form-parcel').removeClass('-hide');
    $('.js-top-search-tabs-item').removeClass('-active');
    $('.js-top-search-parcel').addClass('-active');

    scrollToPage('#the-header-first-screen__search');
    // $('#selectParcelDestination').select2('open');
  };

  var hash = $(location).attr('hash');
  if (hash === '#passenger') {
    setTimeout(function () {
      openPassangerForm();
    }, 100);
  }
  if (hash === '#parcel') {
    setTimeout(function () {
      openParcelForm();
    }, 100);
  }

  // Main form switch
  $('.js-top-search-tabs-item').on('click', function () {
    var $this = $(this);
    var search = $this.data('search');

    if (search === 'passanger') {
      openPassangerForm();
    } else if (search === 'parcel') {
      openParcelForm();
    }
  });

  // Main form passanger
  $('.js-direction-button').on('click', function () {
    var $this = $(this);
    var direction = $this.data('direction');

    $this.parent().find('.js-direction-button').removeClass('-active');
    $(this).addClass('-active');

    if (direction === 'return') {
      $('.js-return-date').removeClass('hide').addClass('mobile-half');
      $('.js-departure-date').addClass('mobile-half');
    } else if (direction === 'oneWay') {
      $('.js-return-date').addClass('hide').removeClass('mobile-half');
      $('.js-departure-date').removeClass('mobile-half');
    }
  });

  // Scroll to top and open passanger form
  $('.js-reservation-passanger').on('click', function () {
    openPassangerForm();
  });

  // Scroll to top and open parcel form
  $('.js-reservation-parcel').on('click', function () {
    openParcelForm();
  });

  // Useful information block
  $('.js-information-list-name').on('click', function (e) {
    e.stopPropagation();
    var isOpen = $(this).closest('.js-information-list-item').hasClass('-open');

    $('.js-information-list-item').removeClass('-open');

    if (!isOpen) {
      $(this).closest('.js-information-list-item').addClass('-open');
    }
  });

  $('body').on('click', function (e) {
    var container = $('.js-information-list-item');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('.js-information-list-item').removeClass('-open');
    }
  });

  // Mobile calendar, result page
  $('.js-show-mobile-calendar').on('click', function () {
    $('.js-result-calendar').addClass('-open');
    $('.js-body-form').addClass('step1').removeClass('step2');
    $('.js-result-step-1').addClass('show').removeClass('hide');
    $('.js-result-step-2').removeClass('show').addClass('hide');
    $('.js-result-mobile-sticky').hide();
  });

  $('.js-result-sticky-next').on('click', function (e) {
    $('.js-result-mobile-sticky').hide();
    $('.js-result-calendar').addClass('-open');
    $('.js-result-step-1').addClass('hide');
    $('.js-result-step-2').addClass('show');
    $('.js-body-form').addClass('step2');
  });

  $('.js-close-result-calendar').on('click', function () {
    $('.js-result-calendar').removeClass('-open');
    $('.js-result-mobile-sticky').show();
  });

  // Datepicker
  var currentYear = new Date().getYear() + 1900;

  var monthNames = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];

  $('.js-date-input').daterangepicker({
    singleDatePicker: true,
    autoUpdateInput: false,
    alwaysShowCalendars: true,
    minYear: currentYear,
    maxYear: currentYear + 1,
    locale: {
      firstDay: 1,
      format: 'DD MMMM, YYYY',
      "daysOfWeek": ["LU", "MA", "MI", "JO", "VI", "SI", "DU"],
      "monthNames": monthNames
    },
    isInvalidDate: function isInvalidDate(date) {
      return !$(this.element[0]).data('available').some(function (dateItem) {
        return date.isSame(moment(dateItem, 'DD/MM/YYYY'));
      });
    }
  }, function (chosen_date) {
    var $el = $(this.element[0]);
    $el.val(chosen_date.get('date') + ' ' + monthNames[chosen_date.get('month')] + ', ' + chosen_date.get('year'));
    $el.next().val(chosen_date.get('date') + '.' + chosen_date.get('month') + '.' + chosen_date.get('year'));
    // В стрке выше можете указывать какой удобно формат
    console.log($el.next().val());
    $el.parent().next().removeAttr('disabled');
  });

  $('.js-date-input').on('show.daterangepicker', function () {
    $(this).parent().addClass('-open');
    scrollToPage(this, -100);
  }).on('hide.daterangepicker', function () {
    $(this).parent().removeClass('-open');
  });

  // Slider
  $('.the-review__slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    }]
  });

  $('.simple-slider-3-col').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true
  });

  $('.simple-slider-2-col').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true
  });

  // ==============================================
  // Elements
  // ==============================================
  var $elements = {
    page: $('html, body'),
    body: $('body'),
    overlay: $('#overlay'),
    show: $('[data-show]'),
    close: $('[data-close]')

    // ==============================================
    // Open Menu
    // ==============================================

  };var showMenu = function () {
    var methods = {
      bindUIActions: function bindUIActions() {
        var _this = this;
        $elements.show.on('click', function (e) {
          e.preventDefault();
          _this.show.call(this, e);
        });
        $elements.close.on('click', function (e) {
          e.preventDefault();
          _this.hide.call(this, e);
        });
      },

      show: function show(e) {
        $($(this).data('show')).removeClass('-hide');
        $elements.body.addClass('-popup-active');
        $($(this).data('show')).addClass('-shown');
      },

      hide: function hide(e) {
        $($(this).data('close')).removeClass('-shown');

        $($(this).data('close')).addClass('-hide');
        $elements.body.removeClass('-popup-active');
      }
    };

    return methods.bindUIActions();
  }();

  // New 30.04.2019

  $('.js-passanger-count-data-wrapper').on('click', function () {
    $('.js-passanger-count-select').toggleClass('show');
    $('.js-passanger-count').toggleClass('active');
  });

  $('.js-item-passanger').on('click', function (e) {
    e.stopPropagation();
  });

  $(window).click(function () {
    $('.js-passanger-count-select').removeClass('show');
    $('.js-passanger-count').removeClass('active');
  });

  $('.js-passanger-descrease').on('click', function () {
    var $input = $(this).closest('.js-passanger-count-counter').find('.js-passanger-count');

    if ($input.val() > 0 && !$(this).hasClass('js-passanger-adult-descrease')) {
      $input.val(+$input.val() - 1);
      $('.js-passanger-count-total').val(+$('.js-passanger-count-total').val() - 1);

      if (+$input.val() === 0) {
        $(this).addClass('disabled');
      }
    }

    if ($input.val() > 1 && $(this).hasClass('js-passanger-adult-descrease')) {
      $input.val(+$input.val() - 1);
      $('.js-passanger-count-total').val(+$('.js-passanger-count-total').val() - 1);

      if (+$input.val() === 1) {
        $(this).addClass('disabled');
      }
    }
  });

  $('.js-passanger-increase').on('click', function () {
    var $input = $(this).closest('.js-passanger-count-counter').find('.js-passanger-count');

    $input.val(+$input.val() + 1);
    $('.js-passanger-count-total').val(+$('.js-passanger-count-total').val() + 1);
    $(this).closest('.js-passanger-count-counter').find('.js-passanger-descrease').removeClass('disabled');
  });

  $('.js-the-switch-tour-button').on('click', function () {
    $(this).parent().find('.js-the-switch-tour-button').removeClass('active');
    $(this).addClass('active');

    if ($(this).data('tour') === 'one-way') {
      $('.js-tour-top-list').removeClass('-return');
    }

    if ($(this).data('tour') === 'return') {
      $('.js-tour-top-list').addClass('-return');
    }
  });

  $('.js-show-details-button').on('click', function () {
    $(this).toggleClass('show');
    $(this).closest('.js-result-body-form-steps').find('.js-details-order-list').toggleClass('show');
  });

  var routeTop = $('.js-route-top').offset().top;

  $(window).scroll(function (e) {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;

    console.log(routeTop, scrolled);

    if (scrolled > routeTop) {
      $('.js-route-top').addClass('-stickit');
    } else {
      $('.js-route-top').removeClass('-stickit');
    }
  });
});

// Phone
var input = document.querySelector(".js-input-phone");
try {
  intlTelInput(input);
} catch (e) {
  console.log(e.message);
}

// B0D6FD

var mapStyles = [{
  "elementType": "geometry",
  "stylers": [{
    "color": "#f5f5f5"
  }]
}, {
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#616161"
  }]
}, {
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#f5f5f5"
  }]
}, {
  "featureType": "administrative.land_parcel",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#B0D6FD"
  }]
}, {
  "featureType": "poi",
  "elementType": "geometry",
  "stylers": [{
    "color": "#eeeeee"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "geometry",
  "stylers": [{
    "color": "#e5e5e5"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [{
    "color": "#ffffff"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#D8E5F6"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [{
    "color": "#B0D6FD"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#66ADFA"
  }, {
    "weight": 1
  }]
}, {
  "featureType": "road.highway",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#616161"
  }]
}, {
  "featureType": "road.highway.controlled_access",
  "elementType": "geometry.fill",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "road.local",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
}, {
  "featureType": "transit.line",
  "elementType": "geometry",
  "stylers": [{
    "color": "#e5e5e5"
  }]
}, {
  "featureType": "transit.station",
  "elementType": "geometry",
  "stylers": [{
    "color": "#eeeeee"
  }]
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [{
    "color": "#c9c9c9"
  }]
}, {
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
}];

// Google map
function initMap() {
  var place = { lat: 47.031212, lng: 28.841415 };
  var placeMarker = { lat: 47.031212, lng: 28.841415 };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: place,
    scrollwheel: false,
    styles: mapStyles
    // mapTypeId: google.maps.MapTypeId.HYBRID
  });

  var marker = new google.maps.Marker({
    position: placeMarker,
    animation: google.maps.Animation.DROP,
    icon: {
      url: './assets/images/content/marker.png',
      scaledSize: new google.maps.Size(27, 37)
    },
    map: map
  });
}