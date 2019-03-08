'use strict';

$(document).ready(function () {
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
    console.log('sss');
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
      "daysOfWeek": ["DU", "LU", "MA", "MI", "JO", "VI", "SI"],
      "monthNames": ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"]
    },
    isInvalidDate: function isInvalidDate(date) {
      return !$(this.element[0]).data('available').some(function (dateItem) {
        return date.isSame(moment(dateItem, 'DD/MM/YYYY'));
      });
    }
  }, function (chosen_date) {
    var $el = $(this.element[0]);
    $el.val(chosen_date.format('DD/MM/YYYY'));
    $el.parent().next().removeAttr('disabled');
  });

  $('.the-date__input').on('show.daterangepicker', function () {
    $(this).parent().addClass('-open');
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