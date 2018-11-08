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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIHNob3dIaWRlKCk7XHJcbiAgbWFpbnNsaWRlcigpO1xyXG4gIG9wZW5TbGlkZXJJbWFnZSgpO1xyXG4gIG1hcHNDdXN0b20oKTtcclxuICB1c2VmdWxsc2xpZGVyKCk7XHJcbiAgc2hvd0J1dHRvbigpO1xyXG4gIGxvYWRDb21tZW50cygpO1xyXG4gIGluZGV4UGFnZSgpO1xyXG4gIHNob3dQaWMoKTtcclxuICBoaWRlTWVudUl0ZW1zKCk7XHJcbiAgbG9hZGluZ0V2ZW50cygpO1xyXG4gIHNob3dBZ3JlZW1lbnQoKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBoaWRlTWVudUl0ZW1zKCkge1xyXG4gIC8v0LvQuNC80LjRgiDQv9C+0LrQsNC30YvQstCw0LXQvNGL0YUg0Y3Qu9C10LzQtdC90YLQvtCyXHJcbiAgdmFyIGxpbWl0ID0gNjtcclxuICB2YXIgYnVyZ2VyTWVudSA9ICQoXCIuYnVyZ2VyLXRpbWUgLm1lbnUtY29udGFpbmVyIC5tYWluLW1lbnVcIik7XHJcbiAgLy/QuNGB0LrQu9GO0YfQsNC10Lwg0LzQvtCx0LjQu9GM0L3QvtC1INC80LXQvdGOXHJcbiAgdmFyIGNvbnRhaW5lciA9ICQoXCIubWFpbi1tZW51XCIpLm5vdChidXJnZXJNZW51KTtcclxuICB2YXIgaGlkZUNvbnRhaW5lciA9ICQoXCIuaGlkZGVuLWxpc3RcIik7XHJcbiAgaWYgKCFjb250YWluZXIubGVuZ3RoIHx8ICQoXCJhXCIsIGNvbnRhaW5lcikubGVuZ3RoIDw9IGxpbWl0ICsgMSkgcmV0dXJuIHRydWU7XHJcblxyXG4gIGluaXQoKTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICQoXCJsaTpndChcIiArIChsaW1pdCAtIDEpICsgXCIpXCIsIGNvbnRhaW5lcikuYXBwZW5kVG8oaGlkZUNvbnRhaW5lcik7XHJcbiAgICBjb250YWluZXIuYWRkQ2xhc3MoXCJzaC1ibG9jayBzaC1oaWRkZW5cIik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93SGlkZUJsb2NrKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIHZhciBibG9jayA9ICQodGhpcykuY2xvc2VzdChcIi5zaC1ibG9ja1wiKTtcclxuICBibG9jay50b2dnbGVDbGFzcyhcInNoLWhpZGRlblwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0hpZGUoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5zaC1idG4sIC5zaG93LXRleHRcIiwgc2hvd0hpZGVCbG9jayk7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jbHMtYnRuXCIsIHNob3dIaWRlQmxvY2spO1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuc2gtcnVsZXNcIiwgc2hvd0hpZGVCbG9jayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW5zbGlkZXIoKSB7XHJcbiAgJChcIi5tYWluc2xpZGVyXCIpLm93bENhcm91c2VsKHtcclxuICAgIGxvb3A6IHRydWUsXHJcbiAgICBpdGVtczogMSxcclxuICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgIG1vdXNlRHJhZzogZmFsc2UsXHJcbiAgICBuYXY6IHRydWUsXHJcbiAgICBkb3RzOiBmYWxzZSxcclxuICAgIG5hdlRleHQ6IGZhbHNlXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZWZ1bGxzbGlkZXIoKSB7XHJcbiAgJChcIi51c2VmdWxsc2xpZGVyXCIpLm93bENhcm91c2VsKHtcclxuICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgaXRlbXM6IDIsXHJcbiAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICBtb3VzZURyYWc6IHRydWUsXHJcbiAgICBuYXY6IHRydWUsXHJcbiAgICBkb3RzOiB0cnVlLFxyXG4gICAgbmF2VGV4dDogZmFsc2UsXHJcbiAgICBzbGlkZUJ5OiAyXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dCdXR0b24oKSB7XHJcbiAgdmFyIGhlaWdodFRleHQgPSAxMzI7XHJcbiAgdmFyIHRleHQgPSAkKFwiLnNoLWJsb2NrLnNoLWhpZGRlbiBwXCIpO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChoZWlnaHRUZXh0IDwgdGV4dFtpXS5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgJCh0ZXh0W2ldKVxyXG4gICAgICAgIC5jbG9zZXN0KFwiLnNoLWJsb2NrLnNoLWhpZGRlblwiKVxyXG4gICAgICAgIC5hZGRDbGFzcyhcInNob3ctYnV0dG9uXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZENvbW1lbnRzKCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuY29tbWVudHMgLmNvdW50ZXItaXRlbVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgY29udGFpbmVyID0gJChcIi5jb21tZW50cy1pdGVtXCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuY29tbWVudHNcIikpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiBcIi4vc3JjL2Jsb2Nrcy90ZXN0cy90ZXN0Lmh0bWxcIixcclxuICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihodG1sKSB7XHJcbiAgICAgICAgJChjb250YWluZXIpLmFwcGVuZChodG1sKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5TbGlkZXJJbWFnZSgpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLm9wZW4taW1nXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB2YXIgYmxvY2sgPSAkKHRoaXMpLmNsb3Nlc3QoXCIuYmxvY2tcIik7XHJcbiAgICB2YXIgYWN0aXZlID0gYmxvY2suZmluZChcImRpdi5hY3RpdmVcIikuZmluZChcImltZ1wiKTtcclxuICAgIHZhciBwb3B1cCA9IGJsb2NrLmZpbmQoXCIucG9wdXBcIik7XHJcblxyXG4gICAgcG9wdXBcclxuICAgICAgLmZhZGVJbigpXHJcbiAgICAgIC5odG1sKCQoYWN0aXZlWzBdKS5jbG9uZSgpKVxyXG4gICAgICAuYXBwZW5kKCc8ZGl2IGNsYXNzPVwicG9wdXAtY2xvc2VcIj48L2Rpdj4nKTtcclxuICAgIGNsb3NlUG9wdXAoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnBvcHVwLWNsb3NlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBwb3B1cC5mYWRlT3V0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBzQ3VzdG9tKCkge1xyXG4gIHltYXBzLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcclxuICAgICAgICBcIm1hcFwiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNlbnRlcjogWzU2Ljg1MjA3MSwgNTMuMjEzNDU4XSxcclxuICAgICAgICAgIHpvb206IDE3XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzZWFyY2hDb250cm9sUHJvdmlkZXI6IFwieWFuZGV4I3NlYXJjaFwiXHJcbiAgICAgICAgfVxyXG4gICAgICApLFxyXG4gICAgICBNeUljb25Db250ZW50TGF5b3V0ID0geW1hcHMudGVtcGxhdGVMYXlvdXRGYWN0b3J5LmNyZWF0ZUNsYXNzKFxyXG4gICAgICAgICc8ZGl2IHN0eWxlPVwiY29sb3I6ICNGRkZGRkY7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPiRbcHJvcGVydGllcy5pY29uQ29udGVudF08L2Rpdj4nXHJcbiAgICAgICk7XHJcbiAgICBteVBsYWNlbWFya1dpdGhDb250ZW50ID0gbmV3IHltYXBzLlBsYWNlbWFyayhcclxuICAgICAgWzU2Ljg1MjA3MSwgNTMuMjEzNDU4XSxcclxuICAgICAge1xyXG4gICAgICAgIGhpbnRDb250ZW50OiBcItCb0LjRhdCy0LjQvdGG0LXQstCwLCA0NlwiXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpY29uTGF5b3V0OiBcImRlZmF1bHQjaW1hZ2VXaXRoQ29udGVudFwiLFxyXG4gICAgICAgIGljb25JbWFnZUhyZWY6IFwiLi9pbWFnZXMvaWNvbi5wbmdcIixcclxuICAgICAgICAvLyBpY29uSW1hZ2VTaXplOiBbNDgsIDcwXSxcclxuICAgICAgICAvLyBpY29uSW1hZ2VPZmZzZXQ6IFstMjQsIC02NF0sXHJcbiAgICAgICAgLy8gaWNvbkNvbnRlbnRPZmZzZXQ6IFsxNSwgMTVdLFxyXG4gICAgICAgIGljb25Db250ZW50TGF5b3V0OiBNeUljb25Db250ZW50TGF5b3V0XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQbGFjZW1hcmtXaXRoQ29udGVudCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbnZhciB2ZWlsID0gJChcIi52ZWlsXCIpO1xyXG5cclxuLy/Qt9Cw0LrRgNC+0LXQvCDQv9C+0L/QsNC/INC/0L4g0LrQu9C40LrRgyDQstC90LUg0LXQs9C+XHJcbmZ1bmN0aW9uIGNsb3NlRGl2KCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwibW91c2V1cFwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICB2YXIgY29udGFpbmVyID0gJChcIi5wb3B1cFwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLml0ZW1cIikpO1xyXG4gICAgdmFyIGRpdiA9ICQoXCIucG9wdXBcIik7XHJcbiAgICBpZiAoIWRpdi5pcyhlLnRhcmdldCkgJiYgZGl2LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGRpdi5oaWRlKCk7XHJcbiAgICAgIGNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICB2ZWlsLmhpZGUoKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1BpYygpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLm9wZW4taW1nXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKFwiLnBvcHVwXCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuaXRlbVwiKSk7XHJcbiAgICB2YXIgaW1nID0gJChcIi5pbWctcHJldlwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLml0ZW1cIikpO1xyXG5cclxuICAgIHZlaWwuc2hvdygpO1xyXG4gICAgY29udGFpbmVyXHJcbiAgICAgIC5odG1sKCQoaW1nKS5jbG9uZSgpKVxyXG4gICAgICAuZmFkZUluKClcclxuICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cInBvcHVwLWNsb3NlXCI+PC9kaXY+Jyk7XHJcblxyXG4gICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgY2xvc2VEaXYoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnBvcHVwLWNsb3NlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb250YWluZXIuZmFkZU91dCgpO1xyXG4gICAgICAgIGNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICAgIHZlaWwuaGlkZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0FncmVlbWVudCgpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnNoLWFncmVlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB2YXIgY29udGFpbmVyID0gJChcIi5wb3B1cFwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLml0ZW1cIikpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiBcIi4vc3JjL2Jsb2Nrcy90ZXN0cy90ZXN0Mi5odG1sXCIsXHJcbiAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oaHRtbCkge1xyXG4gICAgICAgICQoY29udGFpbmVyKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnRhaW5lci5zaG93KCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwicG9wdXAtY2xvc2VcIj48L2Rpdj4nKTtcclxuICAgIHZlaWwuc2hvdygpO1xyXG4gICAgY2xvc2VEaXYoKTtcclxuICAgIGNsb3NlUG9wdXAoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnBvcHVwLWNsb3NlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb250YWluZXIuZmFkZU91dCgpO1xyXG4gICAgICAgIGNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICAgIHZlaWwuaGlkZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5kZXhQYWdlKCkge1xyXG4gIC8vINC+0LHRgNC10LfQsNGC0Ywg0L3QsNC30LLQsNC90LjQtSDRgNGD0LHRgNC40Log0L/QviDRiNC40YDQuNC90LVcclxuICB2YXIgY2FwdGlvbnMgPSAkKFwiLnNob3ctYnV0dG9uIC50ZXh0LWNvbnRhaW5lciBwXCIpO1xyXG4gIHZhciBuZXdzY2FwdGlvbiA9ICQoXCIubmV3cy1wcmV2aWV3IC50ZXh0LWNvbnRhaW5lciBwXCIpO1xyXG4gIGlmIChjYXB0aW9ucy5sZW5ndGgpIHtcclxuICAgIGNhcHRpb25zLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICRjbGFtcCh0aGlzLCB7IGNsYW1wOiAzIH0pO1xyXG4gICAgfSk7XHJcbiAgICBjaGVja0NsYW1wKGNhcHRpb25zKTtcclxuICB9XHJcbiAgaWYgKG5ld3NjYXB0aW9uLmxlbmd0aCkge1xyXG4gICAgbmV3c2NhcHRpb24uZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgJGNsYW1wKHRoaXMsIHsgY2xhbXA6IDMgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZnVuY3Rpb24gY2hlY2tDbGFtcChpdGVtKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnNoLWJ0blwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmIChpdGVtLmNsb3Nlc3QoXCIuc2gtaGlkZGVuXCIpKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAkY2xhbXAoJChpdGVtKVtpXSwgeyBjbGFtcDogXCIxMDAwcHhcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2VjdGlvblBhZ2UoKSB7XHJcbiAgdmFyIHB1YnMgPSAkKFwiLnNlY3Rpb24tcHVicyAucHViLWNvbnRhaW5lclwiKTtcclxuICBpZiAocHVicy5sZW5ndGgpIHtcclxuICAgIHB1YnMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGNhcHRpb24gPSAkKFwiLmNhcHRpb25cIiwgJCh0aGlzKSksXHJcbiAgICAgICAgYW5ub3RhdGlvbiA9ICQoXCIuYW5ub3RhdGlvblwiLCAkKHRoaXMpKTtcclxuICAgICAgY2hlY2tDbGFtcCgkKHRoaXMpKTtcclxuICAgICAgaWYgKGNhcHRpb24uaGVpZ2h0KCkgPiA5MiB8fCBhbm5vdGF0aW9uLmhlaWdodCgpID4gOTYpIHtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwic2gtaGlkZGVuIGhpZGVhYmxlXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJzaC1oaWRkZW4gaGlkZWFibGVcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHB1YnMub24oXCJjbGlja1wiLCBcIi5zaC1idG5cIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNoZWNrQ2xhbXAoJCh0aGlzKS5jbG9zZXN0KFwiLnNoLWJsb2NrXCIpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gZnVuY3Rpb24gY2hlY2tDbGFtcChpdGVtKSB7XHJcbiAgLy8gICAvLyDRjdGC0L7RgiDRgdC60YDQuNC/0YIg0YHRgNCw0LHQsNGC0YvQstCw0LXRgiDRgNCw0L3RjNGI0LUg0YfQtdC8INGB0YLQsNC90LTQsNGA0YLQvdGL0Lkg0LTQu9GPIHNoLWJsb2NrLCDQv9C+0Y3RgtC+0LzRgyDRgtGD0YIg0L3QvtCx0L7RgNC+0YIg0L/RgNC+0LLQtdGA0LrQsFxyXG4gIC8vICAgaWYgKGl0ZW0uaXMoXCIuc2gtaGlkZGVuXCIpKSB7XHJcbiAgLy8gICAgICRjbGFtcCgkKFwiLmNhcHRpb25cIiwgaXRlbSlbMF0sIHsgY2xhbXA6IFwiMTAwMHB4XCIgfSk7XHJcbiAgLy8gICAgICRjbGFtcCgkKFwiLmFubm90YXRpb25cIiwgaXRlbSlbMF0sIHsgY2xhbXA6IFwiMTAwMHB4XCIgfSk7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICAkY2xhbXAoJChcIi5jYXB0aW9uXCIsIGl0ZW0pWzBdLCB7IGNsYW1wOiAzIH0pO1xyXG4gIC8vICAgICAkY2xhbXAoJChcIi5hbm5vdGF0aW9uXCIsIGl0ZW0pWzBdLCB7IGNsYW1wOiAzIH0pO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZGluZ0V2ZW50cygpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmNlbGwgLm51bWIuZXZlbnRcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciBhY3RpdmUgPSAkKFwiLmNlbGwgLm51bWIuYWN0aXZlXCIpLFxyXG4gICAgICBldmVudHNJbmZvID0gJChcIi5ldmVudHMtaW5mb1wiKTtcclxuICAgIGFjdGl2ZS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKS5hZGRDbGFzcyhcImV2ZW50XCIpO1xyXG4gICAgJCh0aGlzKVxyXG4gICAgICAucmVtb3ZlQ2xhc3MoXCJldmVudFwiKVxyXG4gICAgICAuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICBldmVudHNJbmZvLmVtcHR5KCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB1cmw6IFwiLi9zcmMvYmxvY2tzL3Rlc3RzL3Rlc3QxLmh0bWxcIixcclxuICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihodG1sKSB7XHJcbiAgICAgICAgJChldmVudHNJbmZvKS5odG1sKGh0bWwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
