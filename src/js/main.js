$(document).ready(function() {
  showHide();
  mainslider();
  openSliderImage();
  mapsCustom();
  usefullslider();
  showButton();
  loadComments();
  indexPage();
  showPic();
  hideMenuItems();
  loadingEvents();
  showAgreement();
  fancybox();
  buttonUp();
  navFixedMenu();
});

function hideMenuItems() {
  //лимит показываемых элементов
  var limit = 6;
  var burgerMenu = $(".burger-menu .menu-container .main-menu");
  //исключаем мобильное меню
  var container = $(".main-menu").not(burgerMenu);
  var hideContainer = $(".hidden-list");
  if (!container.length || $("a", container).length <= limit + 1) return;

  init();

  function init() {
    $("li:gt(" + (limit - 1) + ")", container).appendTo(hideContainer);
    container.addClass("sh-block sh-hidden");
  }
}

function showHideBlock(e) {
  e.preventDefault();

  var block = $(this).closest(".sh-block");
  block.toggleClass("sh-hidden");
}

function showHide() {
  $(document).on("click", ".sh-btn, .show-text", showHideBlock);
  $(document).on("click", ".cls-btn", showHideBlock);
  $(document).on("click", ".sh-rules", showHideBlock);
}

var veil = $(".veil");

//закрытие попапа по клику на крест
function closePopup() {
  $(document).on("click", ".popup-close", function(e) {
    var container = $(".popup", $(e.target).closest(".item"));
    container.fadeOut();
    container.empty();
    veil.hide();
  });
}

function mainslider() {
  $(".mainslider").owlCarousel({
    loop: true,
    items: 1,
    autoplay: false,
    mouseDrag: false,
    nav: true,
    dots: false,
    navText: false
  });
}

function usefullslider() {
  $(".usefullslider").owlCarousel({
    loop: false,
    items: 2,
    autoplay: false,
    mouseDrag: true,
    nav: true,
    dots: true,
    navText: false,
    slideBy: 2
  });
}

function showButton() {
  var heightText = 132;
  var text = $(".sh-block.sh-hidden p");

  for (var i = 0; i < text.length; i++) {
    if (heightText < text[i].offsetHeight) {
      $(text[i])
        .closest(".sh-block.sh-hidden")
        .addClass("show-button");
    }
  }
}

function loadComments() {
  $(document).on("click", ".comments .counter-item", function(e) {
    e.preventDefault();
    var container = $(".comments-item", $(e.target).closest(".comments"));
    $.ajax({
      url: "./src/blocks/tests/test.html",
      cache: false,
      type: "GET",
      success: function(html) {
        $(container).append(html);
      }
    });
  });
}

function openSliderImage() {
  $(document).on("click", ".open-img", function(e) {
    e.preventDefault();

    var block = $(this).closest(".block");
    var active = block.find("div.active").find("img");
    var popup = block.find(".popup");

    popup
      .fadeIn()
      .html($(active[0]).clone())
      .append('<div class="popup-close"></div>');
    closePopup();

    function closePopup() {
      $(document).on("click", ".popup-close", function(e) {
        popup.fadeOut();
      });
    }
  });
}

function mapsCustom() {
  var container = $("#map"),
    address = $("#ymap-address").text(),
    coords = $("#ymap-address").attr("data-coordinates");

  if (
    typeof ymaps == "undefined" ||
    !container.length ||
    (!address && !coords) ||
    $.trim(container.html())
  ) {
    return;
  }
  ymaps.ready(function() {
    if (coords) {
      initMap(coords.split(","), address);
    } else {
      address = address.split(";")[0];
      ymaps.geocode(address).then(
        function(res) {
          var object = res.geoObjects.get(0);
          if (object) {
            coords = object.geometry.getCoordinates();
            initMap(coords, address);
          }
        },
        function(err) {
          console.err(err);
        }
      );
    }
  });

  function initMap(coords, address) {
    var ymap = new ymaps.Map("map", {
      center: coords,
      zoom: 15
    });
    ymap.balloon.open(coords, address);
  }
}

//закроем попап по клику вне его
function closeDiv() {
  $(document).on("mouseup", function(e) {
    var container = $(".popup", $(e.target).closest(".item"));
    var div = $(".popup");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      div.hide();
      container.empty();
      veil.hide();
    }
  });
}

function showPic() {
  $(document).on("click", ".open-img", function(e) {
    var container = $(".popup", $(e.target).closest(".item"));
    var img = $(".img-prev", $(e.target).closest(".item"));

    veil.show();
    container
      .html($(img).clone())
      .fadeIn()
      .append('<div class="popup-close"></div>');

    closePopup();
    closeDiv();
  });
}

function showAgreement() {
  $(document).on("click", ".sh-agree", function(e) {
    e.preventDefault();

    var container = $(".popup", $(e.target).closest(".item"));
    $.ajax({
      url: "./src/blocks/tests/test2.html",
      cache: false,
      type: "GET",
      success: function(html) {
        $(container).append(html);
      }
    });

    container.show().append('<div class="popup-close"></div>');
    veil.show();
    closeDiv();
    closePopup();
  });
}

//TODO ДОПИЛИТЬ СКРИПТ СКРЫВАЮЩИЙ
function indexPage() {
  // обрезать название рубрик по ширине
  var captions = $(".show-button .text-container p");
  var newscaption = $(".news-preview .text-container p");
  if (captions.length) {
    captions.each(function() {
      $clamp(this, { clamp: 3 });
    });
    checkClamp(captions);
  }
  if (newscaption.length) {
    newscaption.each(function() {
      $clamp(this, { clamp: 3 });
    });
    checkClamp(newscaption);
  }
  function checkClamp(item) {
    $(document).on("click", ".sh-btn", function(e) {
      if (item.closest(".sh-hidden")) {
        $clamp($(e.target).prevAll("p")[0], { clamp: "1000px" });
      }
    });
    $(document).on("click", ".cls-btn", function(e) {
      if (item.closest(".sh-block")) {
        $clamp($(e.target).prevAll("p")[0], { clamp: 3 });
      }
    });
  }
}

function loadingEvents() {
  $(document).on("click", ".cell .numb.event", function(e) {
    e.preventDefault();

    var active = $(".cell .numb.active"),
      eventsInfo = $(".events-info");
    active.removeClass("active").addClass("event");
    $(this)
      .removeClass("event")
      .addClass("active");
    eventsInfo.empty();
    $.ajax({
      url: "./src/blocks/tests/test1.html",
      cache: false,
      type: "GET",
      success: function(html) {
        $(eventsInfo).html(html);
      }
    });
  });
}

function fancybox() {
  $("a.item").fancybox();
}

function buttonUp() {
  var headerHeight = $("header").height();
  var documentScroll = $(this).scrollTop();
  if (documentScroll > headerHeight) {
    $(".button-up").css("display", "block");
  } else {
    $(".button-up").css("display", "none");
  }
}

$(".button-up").on("click", function(e) {
  e.preventDefault();
  $("html, body").animate(
    {
      scrollTop: 0
    },
    500
  );
});

function navFixedMenu() {
  var headerHeight = $("header").height(),
    burgerMenu = $(".burger-right .menu-container .aside .navigation"),
    fixedMenu = $(".aside .navigation").not(burgerMenu),
    containerHeight = $(".container .right-block").height(),
    documentScroll = $(this).scrollTop();

  if (
    documentScroll > headerHeight + 180 &&
    documentScroll < containerHeight - 540
  ) {
    fixedMenu.css({
      marginTop: 0,
      top: 16,
      position: "fixed"
    });
  } else {
    fixedMenu.css({
      marginTop: 172,
      top: "auto",
      position: "absolute"
    });
  }
}

$(document).on("scroll", function() {
  buttonUp();
  navFixedMenu();
});
