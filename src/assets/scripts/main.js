$(document).ready(function() {
  console.log('init');

  // scrollToPage
  var $page = $('html,body');
  var scrollToPage = function scrollToPage(target) {
    var y = 0;
    if (target && $(target).length) {
      y = $(target).offset().top;
    }
    $page.animate({ scrollTop: y }, 300, 'swing');
    return;
  };

  $('.js-scrollto').on('click', function (e) {
    e.preventDefault();
    scrollToPage($(this).attr('href'));
  });

// Datepicker
  var currentYear = new Date().getYear() + 1900;

  $('.the-date__input').daterangepicker({
    singleDatePicker: true,
    autoUpdateInput: false,
    minYear: currentYear,
    maxYear: currentYear + 1,
    locale: {
      format: 'DD MMM, YYYY',
      "daysOfWeek": [
        "DU",
        "LU",
        "MA",
        "MI",
        "JO",
        "VI",
        "SI"
      ],
      "monthNames": [
         "Ianuarie",
         "Februarie",
         "Martie",
         "Aprilie",
         "Mai",
         "Iunie",
         "Iulie",
         "August",
         "Septembrie",
         "Octombrie",
         "Noiembrie",
         "Decembrie"
       ],
    },
    isInvalidDate: function(date) {
      return !$(this.element[0]).data('available').some(function (dateItem) {
        return date.isSame(moment(dateItem, 'DD/MM/YYYY'));
      });
    }
  }, function(chosen_date) {
    var $el = $(this.element[0]);
    $el.val(chosen_date.format('DD/MM/YYYY'));
    $el.parent().next().removeAttr('disabled');
  });

  $('.the-date__input')
    .on('show.daterangepicker', function () { $(this).parent().addClass('-open') })
    .on('hide.daterangepicker', function () { $(this).parent().removeClass('-open') });

  $('.the-review__slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          dots: true,
        }
      }
    ]
  });

  $('.simple-slider-3-col').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
  })

  $('.simple-slider-2-col').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
  })


  // ==============================================
  // Elements
  // ==============================================
  var $elements = {
  	page: $('html, body'),
  	body: $('body'),
  	overlay: $('#overlay'),
  	show: $('[data-show]'),
  	close: $('[data-close]'),
  }

  // ==============================================
  // Open Menu
  // ==============================================

  var showMenu = (function () {
  	var methods = {
  		bindUIActions: function () {
  			var _this = this;
  			$elements.show.on('click', function (e) {
  				e.preventDefault();
  				_this.show.call(this, e);
  			});
  			$elements.close.on('click', function (e) {
  				e.preventDefault();
  				_this.hide.call(this, e);
  			})
  		},

  		show: function(e) {
  			$($(this).data('show')).removeClass('-hide')
  			$elements.body.addClass('-popup-active');
  			$($(this).data('show')).addClass('-shown');
  		},

  		hide: function (e) {
  			$($(this).data('close')).removeClass('-shown');

        $($(this).data('close')).addClass('-hide');
        $elements.body.removeClass('-popup-active');
  		}
  	};

  	return methods.bindUIActions();
  })();

});

// B0D6FD

var mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#B0D6FD"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#D8E5F6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#B0D6FD"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#66ADFA"
      },
      {
        "weight": 1
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];

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
