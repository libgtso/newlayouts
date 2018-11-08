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
  }
  function checkClamp(item) {
    $(document).on("click", ".sh-btn", function(e) {
      if (item.closest(".sh-hidden")) {
        for (var i = 0; i < item.length; i++) {
          $clamp($(item)[i], { clamp: "1000px" });
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
  $("a.item").fancybox({ titleShow: false });
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIHNob3dIaWRlKCk7XHJcbiAgbWFpbnNsaWRlcigpO1xyXG4gIG9wZW5TbGlkZXJJbWFnZSgpO1xyXG4gIG1hcHNDdXN0b20oKTtcclxuICB1c2VmdWxsc2xpZGVyKCk7XHJcbiAgc2hvd0J1dHRvbigpO1xyXG4gIGxvYWRDb21tZW50cygpO1xyXG4gIGluZGV4UGFnZSgpO1xyXG4gIHNob3dQaWMoKTtcclxuICBoaWRlTWVudUl0ZW1zKCk7XHJcbiAgbG9hZGluZ0V2ZW50cygpO1xyXG4gIHNob3dBZ3JlZW1lbnQoKTtcclxuICBmYW5jeWJveCgpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGhpZGVNZW51SXRlbXMoKSB7XHJcbiAgLy/Qu9C40LzQuNGCINC/0L7QutCw0LfRi9Cy0LDQtdC80YvRhSDRjdC70LXQvNC10L3RgtC+0LJcclxuICB2YXIgbGltaXQgPSA2O1xyXG4gIHZhciBidXJnZXJNZW51ID0gJChcIi5idXJnZXItdGltZSAubWVudS1jb250YWluZXIgLm1haW4tbWVudVwiKTtcclxuICAvL9C40YHQutC70Y7Rh9Cw0LXQvCDQvNC+0LHQuNC70YzQvdC+0LUg0LzQtdC90Y5cclxuICB2YXIgY29udGFpbmVyID0gJChcIi5tYWluLW1lbnVcIikubm90KGJ1cmdlck1lbnUpO1xyXG4gIHZhciBoaWRlQ29udGFpbmVyID0gJChcIi5oaWRkZW4tbGlzdFwiKTtcclxuICBpZiAoIWNvbnRhaW5lci5sZW5ndGggfHwgJChcImFcIiwgY29udGFpbmVyKS5sZW5ndGggPD0gbGltaXQgKyAxKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgaW5pdCgpO1xyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgJChcImxpOmd0KFwiICsgKGxpbWl0IC0gMSkgKyBcIilcIiwgY29udGFpbmVyKS5hcHBlbmRUbyhoaWRlQ29udGFpbmVyKTtcclxuICAgIGNvbnRhaW5lci5hZGRDbGFzcyhcInNoLWJsb2NrIHNoLWhpZGRlblwiKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dIaWRlQmxvY2soZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgdmFyIGJsb2NrID0gJCh0aGlzKS5jbG9zZXN0KFwiLnNoLWJsb2NrXCIpO1xyXG4gIGJsb2NrLnRvZ2dsZUNsYXNzKFwic2gtaGlkZGVuXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93SGlkZSgpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnNoLWJ0biwgLnNob3ctdGV4dFwiLCBzaG93SGlkZUJsb2NrKTtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmNscy1idG5cIiwgc2hvd0hpZGVCbG9jayk7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5zaC1ydWxlc1wiLCBzaG93SGlkZUJsb2NrKTtcclxufVxyXG5cclxudmFyIHZlaWwgPSAkKFwiLnZlaWxcIik7XHJcblxyXG4vL9C30LDQutGA0YvRgtC40LUg0L/QvtC/0LDQv9CwINC/0L4g0LrQu9C40LrRgyDQvdCwINC60YDQtdGB0YJcclxuZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnBvcHVwLWNsb3NlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKFwiLnBvcHVwXCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuaXRlbVwiKSk7XHJcbiAgICBjb250YWluZXIuZmFkZU91dCgpO1xyXG4gICAgY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICB2ZWlsLmhpZGUoKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFpbnNsaWRlcigpIHtcclxuICAkKFwiLm1haW5zbGlkZXJcIikub3dsQ2Fyb3VzZWwoe1xyXG4gICAgbG9vcDogdHJ1ZSxcclxuICAgIGl0ZW1zOiAxLFxyXG4gICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgbW91c2VEcmFnOiBmYWxzZSxcclxuICAgIG5hdjogdHJ1ZSxcclxuICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgbmF2VGV4dDogZmFsc2VcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXNlZnVsbHNsaWRlcigpIHtcclxuICAkKFwiLnVzZWZ1bGxzbGlkZXJcIikub3dsQ2Fyb3VzZWwoe1xyXG4gICAgbG9vcDogZmFsc2UsXHJcbiAgICBpdGVtczogMixcclxuICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgIG1vdXNlRHJhZzogdHJ1ZSxcclxuICAgIG5hdjogdHJ1ZSxcclxuICAgIGRvdHM6IHRydWUsXHJcbiAgICBuYXZUZXh0OiBmYWxzZSxcclxuICAgIHNsaWRlQnk6IDJcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0J1dHRvbigpIHtcclxuICB2YXIgaGVpZ2h0VGV4dCA9IDEzMjtcclxuICB2YXIgdGV4dCA9ICQoXCIuc2gtYmxvY2suc2gtaGlkZGVuIHBcIik7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGhlaWdodFRleHQgPCB0ZXh0W2ldLm9mZnNldEhlaWdodCkge1xyXG4gICAgICAkKHRleHRbaV0pXHJcbiAgICAgICAgLmNsb3Nlc3QoXCIuc2gtYmxvY2suc2gtaGlkZGVuXCIpXHJcbiAgICAgICAgLmFkZENsYXNzKFwic2hvdy1idXR0b25cIik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkQ29tbWVudHMoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jb21tZW50cyAuY291bnRlci1pdGVtXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBjb250YWluZXIgPSAkKFwiLmNvbW1lbnRzLWl0ZW1cIiwgJChlLnRhcmdldCkuY2xvc2VzdChcIi5jb21tZW50c1wiKSk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB1cmw6IFwiLi9zcmMvYmxvY2tzL3Rlc3RzL3Rlc3QuaHRtbFwiLFxyXG4gICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGh0bWwpIHtcclxuICAgICAgICAkKGNvbnRhaW5lcikuYXBwZW5kKGh0bWwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblNsaWRlckltYWdlKCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIub3Blbi1pbWdcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciBibG9jayA9ICQodGhpcykuY2xvc2VzdChcIi5ibG9ja1wiKTtcclxuICAgIHZhciBhY3RpdmUgPSBibG9jay5maW5kKFwiZGl2LmFjdGl2ZVwiKS5maW5kKFwiaW1nXCIpO1xyXG4gICAgdmFyIHBvcHVwID0gYmxvY2suZmluZChcIi5wb3B1cFwiKTtcclxuXHJcbiAgICBwb3B1cFxyXG4gICAgICAuZmFkZUluKClcclxuICAgICAgLmh0bWwoJChhY3RpdmVbMF0pLmNsb25lKCkpXHJcbiAgICAgIC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJwb3B1cC1jbG9zZVwiPjwvZGl2PicpO1xyXG4gICAgY2xvc2VQb3B1cCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIucG9wdXAtY2xvc2VcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHBvcHVwLmZhZGVPdXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcHNDdXN0b20oKSB7XHJcbiAgeW1hcHMucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKFxyXG4gICAgICAgIFwibWFwXCIsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY2VudGVyOiBbNTYuODUyMDcxLCA1My4yMTM0NThdLFxyXG4gICAgICAgICAgem9vbTogMTdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNlYXJjaENvbnRyb2xQcm92aWRlcjogXCJ5YW5kZXgjc2VhcmNoXCJcclxuICAgICAgICB9XHJcbiAgICAgICksXHJcbiAgICAgIE15SWNvbkNvbnRlbnRMYXlvdXQgPSB5bWFwcy50ZW1wbGF0ZUxheW91dEZhY3RvcnkuY3JlYXRlQ2xhc3MoXHJcbiAgICAgICAgJzxkaXYgc3R5bGU9XCJjb2xvcjogI0ZGRkZGRjsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+JFtwcm9wZXJ0aWVzLmljb25Db250ZW50XTwvZGl2PidcclxuICAgICAgKTtcclxuICAgIG15UGxhY2VtYXJrV2l0aENvbnRlbnQgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFxyXG4gICAgICBbNTYuODUyMDcxLCA1My4yMTM0NThdLFxyXG4gICAgICB7XHJcbiAgICAgICAgaGludENvbnRlbnQ6IFwi0JvQuNGF0LLQuNC90YbQtdCy0LAsIDQ2XCJcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGljb25MYXlvdXQ6IFwiZGVmYXVsdCNpbWFnZVdpdGhDb250ZW50XCIsXHJcbiAgICAgICAgaWNvbkltYWdlSHJlZjogXCIuL2ltYWdlcy9pY29uLnBuZ1wiLFxyXG4gICAgICAgIC8vIGljb25JbWFnZVNpemU6IFs0OCwgNzBdLFxyXG4gICAgICAgIC8vIGljb25JbWFnZU9mZnNldDogWy0yNCwgLTY0XSxcclxuICAgICAgICAvLyBpY29uQ29udGVudE9mZnNldDogWzE1LCAxNV0sXHJcbiAgICAgICAgaWNvbkNvbnRlbnRMYXlvdXQ6IE15SWNvbkNvbnRlbnRMYXlvdXRcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBsYWNlbWFya1dpdGhDb250ZW50KTtcclxuICB9KTtcclxufVxyXG5cclxuLy/Qt9Cw0LrRgNC+0LXQvCDQv9C+0L/QsNC/INC/0L4g0LrQu9C40LrRgyDQstC90LUg0LXQs9C+XHJcbmZ1bmN0aW9uIGNsb3NlRGl2KCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwibW91c2V1cFwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICB2YXIgY29udGFpbmVyID0gJChcIi5wb3B1cFwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLml0ZW1cIikpO1xyXG4gICAgdmFyIGRpdiA9ICQoXCIucG9wdXBcIik7XHJcbiAgICBpZiAoIWRpdi5pcyhlLnRhcmdldCkgJiYgZGl2LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGRpdi5oaWRlKCk7XHJcbiAgICAgIGNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICB2ZWlsLmhpZGUoKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1BpYygpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLm9wZW4taW1nXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKFwiLnBvcHVwXCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuaXRlbVwiKSk7XHJcbiAgICB2YXIgaW1nID0gJChcIi5pbWctcHJldlwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLml0ZW1cIikpO1xyXG5cclxuICAgIHZlaWwuc2hvdygpO1xyXG4gICAgY29udGFpbmVyXHJcbiAgICAgIC5odG1sKCQoaW1nKS5jbG9uZSgpKVxyXG4gICAgICAuZmFkZUluKClcclxuICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cInBvcHVwLWNsb3NlXCI+PC9kaXY+Jyk7XHJcblxyXG4gICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgY2xvc2VEaXYoKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0FncmVlbWVudCgpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnNoLWFncmVlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB2YXIgY29udGFpbmVyID0gJChcIi5wb3B1cFwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLml0ZW1cIikpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiBcIi4vc3JjL2Jsb2Nrcy90ZXN0cy90ZXN0Mi5odG1sXCIsXHJcbiAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oaHRtbCkge1xyXG4gICAgICAgICQoY29udGFpbmVyKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnRhaW5lci5zaG93KCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwicG9wdXAtY2xvc2VcIj48L2Rpdj4nKTtcclxuICAgIHZlaWwuc2hvdygpO1xyXG4gICAgY2xvc2VEaXYoKTtcclxuICAgIGNsb3NlUG9wdXAoKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5kZXhQYWdlKCkge1xyXG4gIC8vINC+0LHRgNC10LfQsNGC0Ywg0L3QsNC30LLQsNC90LjQtSDRgNGD0LHRgNC40Log0L/QviDRiNC40YDQuNC90LVcclxuICB2YXIgY2FwdGlvbnMgPSAkKFwiLnNob3ctYnV0dG9uIC50ZXh0LWNvbnRhaW5lciBwXCIpO1xyXG4gIHZhciBuZXdzY2FwdGlvbiA9ICQoXCIubmV3cy1wcmV2aWV3IC50ZXh0LWNvbnRhaW5lciBwXCIpO1xyXG4gIGlmIChjYXB0aW9ucy5sZW5ndGgpIHtcclxuICAgIGNhcHRpb25zLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICRjbGFtcCh0aGlzLCB7IGNsYW1wOiAzIH0pO1xyXG4gICAgfSk7XHJcbiAgICBjaGVja0NsYW1wKGNhcHRpb25zKTtcclxuICB9XHJcbiAgaWYgKG5ld3NjYXB0aW9uLmxlbmd0aCkge1xyXG4gICAgbmV3c2NhcHRpb24uZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgJGNsYW1wKHRoaXMsIHsgY2xhbXA6IDMgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZnVuY3Rpb24gY2hlY2tDbGFtcChpdGVtKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnNoLWJ0blwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmIChpdGVtLmNsb3Nlc3QoXCIuc2gtaGlkZGVuXCIpKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAkY2xhbXAoJChpdGVtKVtpXSwgeyBjbGFtcDogXCIxMDAwcHhcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2VjdGlvblBhZ2UoKSB7XHJcbiAgdmFyIHB1YnMgPSAkKFwiLnNlY3Rpb24tcHVicyAucHViLWNvbnRhaW5lclwiKTtcclxuICBpZiAocHVicy5sZW5ndGgpIHtcclxuICAgIHB1YnMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGNhcHRpb24gPSAkKFwiLmNhcHRpb25cIiwgJCh0aGlzKSksXHJcbiAgICAgICAgYW5ub3RhdGlvbiA9ICQoXCIuYW5ub3RhdGlvblwiLCAkKHRoaXMpKTtcclxuICAgICAgY2hlY2tDbGFtcCgkKHRoaXMpKTtcclxuICAgICAgaWYgKGNhcHRpb24uaGVpZ2h0KCkgPiA5MiB8fCBhbm5vdGF0aW9uLmhlaWdodCgpID4gOTYpIHtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwic2gtaGlkZGVuIGhpZGVhYmxlXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJzaC1oaWRkZW4gaGlkZWFibGVcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHB1YnMub24oXCJjbGlja1wiLCBcIi5zaC1idG5cIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNoZWNrQ2xhbXAoJCh0aGlzKS5jbG9zZXN0KFwiLnNoLWJsb2NrXCIpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gZnVuY3Rpb24gY2hlY2tDbGFtcChpdGVtKSB7XHJcbiAgLy8gICAvLyDRjdGC0L7RgiDRgdC60YDQuNC/0YIg0YHRgNCw0LHQsNGC0YvQstCw0LXRgiDRgNCw0L3RjNGI0LUg0YfQtdC8INGB0YLQsNC90LTQsNGA0YLQvdGL0Lkg0LTQu9GPIHNoLWJsb2NrLCDQv9C+0Y3RgtC+0LzRgyDRgtGD0YIg0L3QvtCx0L7RgNC+0YIg0L/RgNC+0LLQtdGA0LrQsFxyXG4gIC8vICAgaWYgKGl0ZW0uaXMoXCIuc2gtaGlkZGVuXCIpKSB7XHJcbiAgLy8gICAgICRjbGFtcCgkKFwiLmNhcHRpb25cIiwgaXRlbSlbMF0sIHsgY2xhbXA6IFwiMTAwMHB4XCIgfSk7XHJcbiAgLy8gICAgICRjbGFtcCgkKFwiLmFubm90YXRpb25cIiwgaXRlbSlbMF0sIHsgY2xhbXA6IFwiMTAwMHB4XCIgfSk7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICAkY2xhbXAoJChcIi5jYXB0aW9uXCIsIGl0ZW0pWzBdLCB7IGNsYW1wOiAzIH0pO1xyXG4gIC8vICAgICAkY2xhbXAoJChcIi5hbm5vdGF0aW9uXCIsIGl0ZW0pWzBdLCB7IGNsYW1wOiAzIH0pO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZGluZ0V2ZW50cygpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmNlbGwgLm51bWIuZXZlbnRcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciBhY3RpdmUgPSAkKFwiLmNlbGwgLm51bWIuYWN0aXZlXCIpLFxyXG4gICAgICBldmVudHNJbmZvID0gJChcIi5ldmVudHMtaW5mb1wiKTtcclxuICAgIGFjdGl2ZS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKS5hZGRDbGFzcyhcImV2ZW50XCIpO1xyXG4gICAgJCh0aGlzKVxyXG4gICAgICAucmVtb3ZlQ2xhc3MoXCJldmVudFwiKVxyXG4gICAgICAuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICBldmVudHNJbmZvLmVtcHR5KCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB1cmw6IFwiLi9zcmMvYmxvY2tzL3Rlc3RzL3Rlc3QxLmh0bWxcIixcclxuICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihodG1sKSB7XHJcbiAgICAgICAgJChldmVudHNJbmZvKS5odG1sKGh0bWwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmFuY3lib3goKSB7XHJcbiAgJChcImEuaXRlbVwiKS5mYW5jeWJveCh7IHRpdGxlU2hvdzogZmFsc2UgfSk7XHJcbn1cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
