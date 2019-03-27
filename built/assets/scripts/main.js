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
  };

  var openParcelForm = function openParcelForm() {
    $('.js-form-passanger').addClass('-hide');
    $('.js-form-parcel').removeClass('-hide');
    $('.js-top-search-tabs-item').removeClass('-active');
    $('.js-top-search-parcel').addClass('-active');
  };

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
      $('.js-return-date').removeClass('hide');
    } else if (direction === 'oneWay') {
      $('.js-return-date').addClass('hide');
    }
  });

  // Scroll to top and open passanger form
  $('.js-reservation-passanger').on('click', function () {
    openPassangerForm();
    scrollToPage('#the-header-first-screen__search');
    $('#selectFrom').select2('open');
  });

  // Scroll to top and open parcel form
  $('.js-reservation-parcel').on('click', function () {
    openParcelForm();
    scrollToPage('#the-header-first-screen__search');
    $('#selectParcelDestination').select2('open');
  });

  // Useful information block
  $('.js-information-list-name').on('click', function (e) {
    e.stopPropagation();
    $('.js-information-list-item').removeClass('-open');
    $(this).closest('.js-information-list-item').addClass('-open');
  });

  $('body').on('click', function (e) {
    var container = $('.js-information-list-item');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('.js-information-list-item').removeClass('-open');
    }
  });

  // Datepicker
  var currentYear = new Date().getYear() + 1900;

  var monthNames = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];

  $('.the-date__input').daterangepicker({
    singleDatePicker: true,
    autoUpdateInput: false,
    minYear: currentYear,
    maxYear: currentYear + 1,
    locale: {
      format: 'DD MMMM, YYYY',
      "daysOfWeek": ["DU", "LU", "MA", "MI", "JO", "VI", "SI"],
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
    $el.parent().next().removeAttr('disabled');
  });

  $('.the-date__input').on('show.daterangepicker', function () {
    $(this).parent().addClass('-open');
    scrollToPage(this, -100);
  }).on('hide.daterangepicker', function () {
    $(this).parent().removeClass('-open');
  });

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
});

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