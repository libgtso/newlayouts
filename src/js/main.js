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
});

function hideMenuItems() {
  //лимит показываемых элементов
  var limit = 6;
  var burgerMenu = $(".burger-time .menu-container .main-menu");
  //исключаем мобильное меню
  var container = $(".main-menu").not(burgerMenu);
  var hideContainer = $(".hidden-list");
  if (!container.length || $("a", container).length <= limit + 1) return true;

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
  ymaps.ready(function() {
    var myMap = new ymaps.Map(
        "map",
        {
          center: [56.852071, 53.213458],
          zoom: 17
        },
        {
          searchControlProvider: "yandex#search"
        }
      ),
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      );
    myPlacemarkWithContent = new ymaps.Placemark(
      [56.852071, 53.213458],
      {
        hintContent: "Лихвинцева, 46"
      },
      {
        iconLayout: "default#imageWithContent",
        iconImageHref: "./images/icon.png",
        // iconImageSize: [48, 70],
        // iconImageOffset: [-24, -64],
        // iconContentOffset: [15, 15],
        iconContentLayout: MyIconContentLayout
      }
    );

    myMap.geoObjects.add(myPlacemarkWithContent);
  });
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
        for (var i = 0; i < item.length; i++) {
          $clamp($(item)[i], { clamp: "1000px" });
        }
      }
    });
    $(document).on("click", ".cls-btn", function(e) {
      if (item.closest(".sh-block")) {
        for (var i = 0; i < item.length; i++) {
          $clamp($(item)[i], { clamp: 3 });
        }
      }
    });
  }
}

function sectionPage() {
  var pubs = $(".section-pubs .pub-container");
  if (pubs.length) {
    pubs.each(function() {
      var caption = $(".caption", $(this)),
        annotation = $(".annotation", $(this));
      checkClamp($(this));
      if (caption.height() > 92 || annotation.height() > 96) {
        $(this).addClass("sh-hidden hideable");
      } else {
        $(this).removeClass("sh-hidden hideable");
      }
    });

    pubs.on("click", ".sh-btn", function() {
      checkClamp($(this).closest(".sh-block"));
    });
  }

  // function checkClamp(item) {
  //   // этот скрипт срабатывает раньше чем стандартный для sh-block, поэтому тут ноборот проверка
  //   if (item.is(".sh-hidden")) {
  //     $clamp($(".caption", item)[0], { clamp: "1000px" });
  //     $clamp($(".annotation", item)[0], { clamp: "1000px" });
  //   } else {
  //     $clamp($(".caption", item)[0], { clamp: 3 });
  //     $clamp($(".annotation", item)[0], { clamp: 3 });
  //   }
  // }
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
