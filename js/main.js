$(document).ready(function() {
  showHide();
  mainslider();
  openSliderImage();
  mapsCustom();
  usefullslider();
  showButt();
  loadComments();
  indexPage();
  showPic();
  hideMenuItems();
  loadingEvents();
  showAgreement();
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

function showButt() {
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

var veil = $(".veil");

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

    function closePopup() {
      $(document).on("click", ".popup-close", function(e) {
        container.fadeOut();
        container.empty();
        veil.hide();
      });
    }
  });
}

function showAgreement() {
  $(document).on("click", ".sh-agree", function(e) {
    e.preventDefault();

    var container = $(".popup", $(e.target).closest(".agreement"));
    $.ajax({
      url: "./src/blocks/tests/test1.html",
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

    function closePopup() {
      $(document).on("click", ".popup-close", function(e) {
        container.fadeOut();
        container.empty();
        veil.hide();
      });
    }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIHNob3dIaWRlKCk7XHJcbiAgbWFpbnNsaWRlcigpO1xyXG4gIG9wZW5TbGlkZXJJbWFnZSgpO1xyXG4gIG1hcHNDdXN0b20oKTtcclxuICB1c2VmdWxsc2xpZGVyKCk7XHJcbiAgc2hvd0J1dHQoKTtcclxuICBsb2FkQ29tbWVudHMoKTtcclxuICBpbmRleFBhZ2UoKTtcclxuICBzaG93UGljKCk7XHJcbiAgaGlkZU1lbnVJdGVtcygpO1xyXG4gIGxvYWRpbmdFdmVudHMoKTtcclxuICBzaG93QWdyZWVtZW50KCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaGlkZU1lbnVJdGVtcygpIHtcclxuICAvL9C70LjQvNC40YIg0L/QvtC60LDQt9GL0LLQsNC10LzRi9GFINGN0LvQtdC80LXQvdGC0L7QslxyXG4gIHZhciBsaW1pdCA9IDY7XHJcbiAgdmFyIGJ1cmdlck1lbnUgPSAkKFwiLmJ1cmdlci10aW1lIC5tZW51LWNvbnRhaW5lciAubWFpbi1tZW51XCIpO1xyXG4gIC8v0LjRgdC60LvRjtGH0LDQtdC8INC80L7QsdC40LvRjNC90L7QtSDQvNC10L3RjlxyXG4gIHZhciBjb250YWluZXIgPSAkKFwiLm1haW4tbWVudVwiKS5ub3QoYnVyZ2VyTWVudSk7XHJcbiAgdmFyIGhpZGVDb250YWluZXIgPSAkKFwiLmhpZGRlbi1saXN0XCIpO1xyXG4gIGlmICghY29udGFpbmVyLmxlbmd0aCB8fCAkKFwiYVwiLCBjb250YWluZXIpLmxlbmd0aCA8PSBsaW1pdCArIDEpIHJldHVybiB0cnVlO1xyXG5cclxuICBpbml0KCk7XHJcblxyXG4gIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAkKFwibGk6Z3QoXCIgKyAobGltaXQgLSAxKSArIFwiKVwiLCBjb250YWluZXIpLmFwcGVuZFRvKGhpZGVDb250YWluZXIpO1xyXG4gICAgY29udGFpbmVyLmFkZENsYXNzKFwic2gtYmxvY2sgc2gtaGlkZGVuXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0hpZGVCbG9jayhlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICB2YXIgYmxvY2sgPSAkKHRoaXMpLmNsb3Nlc3QoXCIuc2gtYmxvY2tcIik7XHJcbiAgYmxvY2sudG9nZ2xlQ2xhc3MoXCJzaC1oaWRkZW5cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dIaWRlKCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuc2gtYnRuLCAuc2hvdy10ZXh0XCIsIHNob3dIaWRlQmxvY2spO1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuY2xzLWJ0blwiLCBzaG93SGlkZUJsb2NrKTtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnNoLXJ1bGVzXCIsIHNob3dIaWRlQmxvY2spO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWluc2xpZGVyKCkge1xyXG4gICQoXCIubWFpbnNsaWRlclwiKS5vd2xDYXJvdXNlbCh7XHJcbiAgICBsb29wOiB0cnVlLFxyXG4gICAgaXRlbXM6IDEsXHJcbiAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICBtb3VzZURyYWc6IGZhbHNlLFxyXG4gICAgbmF2OiB0cnVlLFxyXG4gICAgZG90czogZmFsc2UsXHJcbiAgICBuYXZUZXh0OiBmYWxzZVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1c2VmdWxsc2xpZGVyKCkge1xyXG4gICQoXCIudXNlZnVsbHNsaWRlclwiKS5vd2xDYXJvdXNlbCh7XHJcbiAgICBsb29wOiBmYWxzZSxcclxuICAgIGl0ZW1zOiAyLFxyXG4gICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgbW91c2VEcmFnOiB0cnVlLFxyXG4gICAgbmF2OiB0cnVlLFxyXG4gICAgZG90czogdHJ1ZSxcclxuICAgIG5hdlRleHQ6IGZhbHNlLFxyXG4gICAgc2xpZGVCeTogMlxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93QnV0dCgpIHtcclxuICB2YXIgaGVpZ2h0VGV4dCA9IDEzMjtcclxuICB2YXIgdGV4dCA9ICQoXCIuc2gtYmxvY2suc2gtaGlkZGVuIHBcIik7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGhlaWdodFRleHQgPCB0ZXh0W2ldLm9mZnNldEhlaWdodCkge1xyXG4gICAgICAkKHRleHRbaV0pXHJcbiAgICAgICAgLmNsb3Nlc3QoXCIuc2gtYmxvY2suc2gtaGlkZGVuXCIpXHJcbiAgICAgICAgLmFkZENsYXNzKFwic2hvdy1idXR0b25cIik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkQ29tbWVudHMoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jb21tZW50cyAuY291bnRlci1pdGVtXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBjb250YWluZXIgPSAkKFwiLmNvbW1lbnRzLWl0ZW1cIiwgJChlLnRhcmdldCkuY2xvc2VzdChcIi5jb21tZW50c1wiKSk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB1cmw6IFwiLi9zcmMvYmxvY2tzL3Rlc3RzL3Rlc3QuaHRtbFwiLFxyXG4gICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGh0bWwpIHtcclxuICAgICAgICAkKGNvbnRhaW5lcikuYXBwZW5kKGh0bWwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblNsaWRlckltYWdlKCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIub3Blbi1pbWdcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciBibG9jayA9ICQodGhpcykuY2xvc2VzdChcIi5ibG9ja1wiKTtcclxuICAgIHZhciBhY3RpdmUgPSBibG9jay5maW5kKFwiZGl2LmFjdGl2ZVwiKS5maW5kKFwiaW1nXCIpO1xyXG4gICAgdmFyIHBvcHVwID0gYmxvY2suZmluZChcIi5wb3B1cFwiKTtcclxuXHJcbiAgICBwb3B1cFxyXG4gICAgICAuZmFkZUluKClcclxuICAgICAgLmh0bWwoJChhY3RpdmVbMF0pLmNsb25lKCkpXHJcbiAgICAgIC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJwb3B1cC1jbG9zZVwiPjwvZGl2PicpO1xyXG4gICAgY2xvc2VQb3B1cCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIucG9wdXAtY2xvc2VcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHBvcHVwLmZhZGVPdXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcHNDdXN0b20oKSB7XHJcbiAgeW1hcHMucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKFxyXG4gICAgICAgIFwibWFwXCIsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY2VudGVyOiBbNTYuODUyMDcxLCA1My4yMTM0NThdLFxyXG4gICAgICAgICAgem9vbTogMTdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNlYXJjaENvbnRyb2xQcm92aWRlcjogXCJ5YW5kZXgjc2VhcmNoXCJcclxuICAgICAgICB9XHJcbiAgICAgICksXHJcbiAgICAgIE15SWNvbkNvbnRlbnRMYXlvdXQgPSB5bWFwcy50ZW1wbGF0ZUxheW91dEZhY3RvcnkuY3JlYXRlQ2xhc3MoXHJcbiAgICAgICAgJzxkaXYgc3R5bGU9XCJjb2xvcjogI0ZGRkZGRjsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+JFtwcm9wZXJ0aWVzLmljb25Db250ZW50XTwvZGl2PidcclxuICAgICAgKTtcclxuICAgIG15UGxhY2VtYXJrV2l0aENvbnRlbnQgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFxyXG4gICAgICBbNTYuODUyMDcxLCA1My4yMTM0NThdLFxyXG4gICAgICB7XHJcbiAgICAgICAgaGludENvbnRlbnQ6IFwi0JvQuNGF0LLQuNC90YbQtdCy0LAsIDQ2XCJcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGljb25MYXlvdXQ6IFwiZGVmYXVsdCNpbWFnZVdpdGhDb250ZW50XCIsXHJcbiAgICAgICAgaWNvbkltYWdlSHJlZjogXCIuL2ltYWdlcy9pY29uLnBuZ1wiLFxyXG4gICAgICAgIC8vIGljb25JbWFnZVNpemU6IFs0OCwgNzBdLFxyXG4gICAgICAgIC8vIGljb25JbWFnZU9mZnNldDogWy0yNCwgLTY0XSxcclxuICAgICAgICAvLyBpY29uQ29udGVudE9mZnNldDogWzE1LCAxNV0sXHJcbiAgICAgICAgaWNvbkNvbnRlbnRMYXlvdXQ6IE15SWNvbkNvbnRlbnRMYXlvdXRcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBsYWNlbWFya1dpdGhDb250ZW50KTtcclxuICB9KTtcclxufVxyXG5cclxudmFyIHZlaWwgPSAkKFwiLnZlaWxcIik7XHJcblxyXG4vL9C30LDQutGA0L7QtdC8INC/0L7Qv9Cw0L8g0L/QviDQutC70LjQutGDINCy0L3QtSDQtdCz0L5cclxuZnVuY3Rpb24gY2xvc2VEaXYoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJtb3VzZXVwXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKFwiLnBvcHVwXCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuaXRlbVwiKSk7XHJcbiAgICB2YXIgZGl2ID0gJChcIi5wb3B1cFwiKTtcclxuICAgIGlmICghZGl2LmlzKGUudGFyZ2V0KSAmJiBkaXYuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcclxuICAgICAgZGl2LmhpZGUoKTtcclxuICAgICAgY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICAgIHZlaWwuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93UGljKCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIub3Blbi1pbWdcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIGNvbnRhaW5lciA9ICQoXCIucG9wdXBcIiwgJChlLnRhcmdldCkuY2xvc2VzdChcIi5pdGVtXCIpKTtcclxuICAgIHZhciBpbWcgPSAkKFwiLmltZy1wcmV2XCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuaXRlbVwiKSk7XHJcblxyXG4gICAgdmVpbC5zaG93KCk7XHJcbiAgICBjb250YWluZXJcclxuICAgICAgLmh0bWwoJChpbWcpLmNsb25lKCkpXHJcbiAgICAgIC5mYWRlSW4oKVxyXG4gICAgICAuYXBwZW5kKCc8ZGl2IGNsYXNzPVwicG9wdXAtY2xvc2VcIj48L2Rpdj4nKTtcclxuXHJcbiAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICBjbG9zZURpdigpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIucG9wdXAtY2xvc2VcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnRhaW5lci5mYWRlT3V0KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICAgICAgdmVpbC5oaWRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93QWdyZWVtZW50KCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuc2gtYWdyZWVcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciBjb250YWluZXIgPSAkKFwiLnBvcHVwXCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuYWdyZWVtZW50XCIpKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybDogXCIuL3NyYy9ibG9ja3MvdGVzdHMvdGVzdDEuaHRtbFwiLFxyXG4gICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGh0bWwpIHtcclxuICAgICAgICAkKGNvbnRhaW5lcikuYXBwZW5kKGh0bWwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb250YWluZXIuc2hvdygpLmFwcGVuZCgnPGRpdiBjbGFzcz1cInBvcHVwLWNsb3NlXCI+PC9kaXY+Jyk7XHJcbiAgICB2ZWlsLnNob3coKTtcclxuICAgIGNsb3NlRGl2KCk7XHJcbiAgICBjbG9zZVBvcHVwKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5wb3B1cC1jbG9zZVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29udGFpbmVyLmZhZGVPdXQoKTtcclxuICAgICAgICBjb250YWluZXIuZW1wdHkoKTtcclxuICAgICAgICB2ZWlsLmhpZGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZGV4UGFnZSgpIHtcclxuICAvLyDQvtCx0YDQtdC30LDRgtGMINC90LDQt9Cy0LDQvdC40LUg0YDRg9Cx0YDQuNC6INC/0L4g0YjQuNGA0LjQvdC1XHJcbiAgdmFyIGNhcHRpb25zID0gJChcIi5zaG93LWJ1dHRvbiAudGV4dC1jb250YWluZXIgcFwiKTtcclxuICB2YXIgbmV3c2NhcHRpb24gPSAkKFwiLm5ld3MtcHJldmlldyAudGV4dC1jb250YWluZXIgcFwiKTtcclxuICBpZiAoY2FwdGlvbnMubGVuZ3RoKSB7XHJcbiAgICBjYXB0aW9ucy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAkY2xhbXAodGhpcywgeyBjbGFtcDogMyB9KTtcclxuICAgIH0pO1xyXG4gICAgY2hlY2tDbGFtcChjYXB0aW9ucyk7XHJcbiAgfVxyXG4gIGlmIChuZXdzY2FwdGlvbi5sZW5ndGgpIHtcclxuICAgIG5ld3NjYXB0aW9uLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICRjbGFtcCh0aGlzLCB7IGNsYW1wOiAzIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGNoZWNrQ2xhbXAoaXRlbSkge1xyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5zaC1idG5cIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICBpZiAoaXRlbS5jbG9zZXN0KFwiLnNoLWhpZGRlblwiKSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgJGNsYW1wKCQoaXRlbSlbaV0sIHsgY2xhbXA6IFwiMTAwMHB4XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlY3Rpb25QYWdlKCkge1xyXG4gIHZhciBwdWJzID0gJChcIi5zZWN0aW9uLXB1YnMgLnB1Yi1jb250YWluZXJcIik7XHJcbiAgaWYgKHB1YnMubGVuZ3RoKSB7XHJcbiAgICBwdWJzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBjYXB0aW9uID0gJChcIi5jYXB0aW9uXCIsICQodGhpcykpLFxyXG4gICAgICAgIGFubm90YXRpb24gPSAkKFwiLmFubm90YXRpb25cIiwgJCh0aGlzKSk7XHJcbiAgICAgIGNoZWNrQ2xhbXAoJCh0aGlzKSk7XHJcbiAgICAgIGlmIChjYXB0aW9uLmhlaWdodCgpID4gOTIgfHwgYW5ub3RhdGlvbi5oZWlnaHQoKSA+IDk2KSB7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInNoLWhpZGRlbiBoaWRlYWJsZVwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2gtaGlkZGVuIGhpZGVhYmxlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBwdWJzLm9uKFwiY2xpY2tcIiwgXCIuc2gtYnRuXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBjaGVja0NsYW1wKCQodGhpcykuY2xvc2VzdChcIi5zaC1ibG9ja1wiKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIGZ1bmN0aW9uIGNoZWNrQ2xhbXAoaXRlbSkge1xyXG4gIC8vICAgLy8g0Y3RgtC+0YIg0YHQutGA0LjQv9GCINGB0YDQsNCx0LDRgtGL0LLQsNC10YIg0YDQsNC90YzRiNC1INGH0LXQvCDRgdGC0LDQvdC00LDRgNGC0L3Ri9C5INC00LvRjyBzaC1ibG9jaywg0L/QvtGN0YLQvtC80YMg0YLRg9GCINC90L7QsdC+0YDQvtGCINC/0YDQvtCy0LXRgNC60LBcclxuICAvLyAgIGlmIChpdGVtLmlzKFwiLnNoLWhpZGRlblwiKSkge1xyXG4gIC8vICAgICAkY2xhbXAoJChcIi5jYXB0aW9uXCIsIGl0ZW0pWzBdLCB7IGNsYW1wOiBcIjEwMDBweFwiIH0pO1xyXG4gIC8vICAgICAkY2xhbXAoJChcIi5hbm5vdGF0aW9uXCIsIGl0ZW0pWzBdLCB7IGNsYW1wOiBcIjEwMDBweFwiIH0pO1xyXG4gIC8vICAgfSBlbHNlIHtcclxuICAvLyAgICAgJGNsYW1wKCQoXCIuY2FwdGlvblwiLCBpdGVtKVswXSwgeyBjbGFtcDogMyB9KTtcclxuICAvLyAgICAgJGNsYW1wKCQoXCIuYW5ub3RhdGlvblwiLCBpdGVtKVswXSwgeyBjbGFtcDogMyB9KTtcclxuICAvLyAgIH1cclxuICAvLyB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRpbmdFdmVudHMoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jZWxsIC5udW1iLmV2ZW50XCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB2YXIgYWN0aXZlID0gJChcIi5jZWxsIC5udW1iLmFjdGl2ZVwiKSxcclxuICAgICAgZXZlbnRzSW5mbyA9ICQoXCIuZXZlbnRzLWluZm9cIik7XHJcbiAgICBhY3RpdmUucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIikuYWRkQ2xhc3MoXCJldmVudFwiKTtcclxuICAgICQodGhpcylcclxuICAgICAgLnJlbW92ZUNsYXNzKFwiZXZlbnRcIilcclxuICAgICAgLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgZXZlbnRzSW5mby5lbXB0eSgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiBcIi4vc3JjL2Jsb2Nrcy90ZXN0cy90ZXN0MS5odG1sXCIsXHJcbiAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oaHRtbCkge1xyXG4gICAgICAgICQoZXZlbnRzSW5mbykuaHRtbChodG1sKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
