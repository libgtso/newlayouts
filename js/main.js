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

//закроем попап по клику вне его
function closeDiv() {
  $(document).on("mouseup", function(e) {
    var container = $(".popup", $(e.target).closest(".item"));
    var popup = $(".veil");
    var div = $(".popup");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      div.hide();
      container.empty();
      popup.hide();
    }
  });
}

function showPic() {
  $(document).on("click", ".open-img", function(e) {
    var container = $(".popup", $(e.target).closest(".item"));
    var img = $(".img-prev", $(e.target).closest(".item"));
    var popup = $(".veil");
    popup.show();
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
        popup.hide();
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

// $(document).on('click', '#header .menu a', function(e){
//     var href = $(this).attr('href');
//     if (href.indexOf('/#') === 0) {
//         var id = href.substring(2),
//             block = $('#'+id);

//         if (block.length) {
//             e.preventDefault();
//             $('html, body').animate({
//                 'scrollTop' : block.offset().top - 40
//             });
//         }
//     }
// });
//}

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIHNob3dIaWRlKCk7XHJcbiAgbWFpbnNsaWRlcigpO1xyXG4gIG9wZW5TbGlkZXJJbWFnZSgpO1xyXG4gIG1hcHNDdXN0b20oKTtcclxuICB1c2VmdWxsc2xpZGVyKCk7XHJcbiAgc2hvd0J1dHQoKTtcclxuICBsb2FkQ29tbWVudHMoKTtcclxuICBpbmRleFBhZ2UoKTtcclxuICBzaG93UGljKCk7XHJcbiAgaGlkZU1lbnVJdGVtcygpO1xyXG4gIGxvYWRpbmdFdmVudHMoKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBoaWRlTWVudUl0ZW1zKCkge1xyXG4gIC8v0LvQuNC80LjRgiDQv9C+0LrQsNC30YvQstCw0LXQvNGL0YUg0Y3Qu9C10LzQtdC90YLQvtCyXHJcbiAgdmFyIGxpbWl0ID0gNjtcclxuICB2YXIgYnVyZ2VyTWVudSA9ICQoXCIuYnVyZ2VyLXRpbWUgLm1lbnUtY29udGFpbmVyIC5tYWluLW1lbnVcIik7XHJcbiAgLy/QuNGB0LrQu9GO0YfQsNC10Lwg0LzQvtCx0LjQu9GM0L3QvtC1INC80LXQvdGOXHJcbiAgdmFyIGNvbnRhaW5lciA9ICQoXCIubWFpbi1tZW51XCIpLm5vdChidXJnZXJNZW51KTtcclxuICB2YXIgaGlkZUNvbnRhaW5lciA9ICQoXCIuaGlkZGVuLWxpc3RcIik7XHJcbiAgaWYgKCFjb250YWluZXIubGVuZ3RoIHx8ICQoXCJhXCIsIGNvbnRhaW5lcikubGVuZ3RoIDw9IGxpbWl0ICsgMSkgcmV0dXJuIHRydWU7XHJcblxyXG4gIGluaXQoKTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICQoXCJsaTpndChcIiArIChsaW1pdCAtIDEpICsgXCIpXCIsIGNvbnRhaW5lcikuYXBwZW5kVG8oaGlkZUNvbnRhaW5lcik7XHJcbiAgICBjb250YWluZXIuYWRkQ2xhc3MoXCJzaC1ibG9jayBzaC1oaWRkZW5cIik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93SGlkZUJsb2NrKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIHZhciBibG9jayA9ICQodGhpcykuY2xvc2VzdChcIi5zaC1ibG9ja1wiKTtcclxuICBibG9jay50b2dnbGVDbGFzcyhcInNoLWhpZGRlblwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0hpZGUoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5zaC1idG4sIC5zaG93LXRleHRcIiwgc2hvd0hpZGVCbG9jayk7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jbHMtYnRuXCIsIHNob3dIaWRlQmxvY2spO1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuc2gtcnVsZXNcIiwgc2hvd0hpZGVCbG9jayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW5zbGlkZXIoKSB7XHJcbiAgJChcIi5tYWluc2xpZGVyXCIpLm93bENhcm91c2VsKHtcclxuICAgIGxvb3A6IHRydWUsXHJcbiAgICBpdGVtczogMSxcclxuICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgIG1vdXNlRHJhZzogZmFsc2UsXHJcbiAgICBuYXY6IHRydWUsXHJcbiAgICBkb3RzOiBmYWxzZSxcclxuICAgIG5hdlRleHQ6IGZhbHNlXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZWZ1bGxzbGlkZXIoKSB7XHJcbiAgJChcIi51c2VmdWxsc2xpZGVyXCIpLm93bENhcm91c2VsKHtcclxuICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgaXRlbXM6IDIsXHJcbiAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICBtb3VzZURyYWc6IHRydWUsXHJcbiAgICBuYXY6IHRydWUsXHJcbiAgICBkb3RzOiB0cnVlLFxyXG4gICAgbmF2VGV4dDogZmFsc2UsXHJcbiAgICBzbGlkZUJ5OiAyXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dCdXR0KCkge1xyXG4gIHZhciBoZWlnaHRUZXh0ID0gMTMyO1xyXG4gIHZhciB0ZXh0ID0gJChcIi5zaC1ibG9jay5zaC1oaWRkZW4gcFwiKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoaGVpZ2h0VGV4dCA8IHRleHRbaV0ub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgICQodGV4dFtpXSlcclxuICAgICAgICAuY2xvc2VzdChcIi5zaC1ibG9jay5zaC1oaWRkZW5cIilcclxuICAgICAgICAuYWRkQ2xhc3MoXCJzaG93LWJ1dHRvblwiKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRDb21tZW50cygpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmNvbW1lbnRzIC5jb3VudGVyLWl0ZW1cIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGNvbnRhaW5lciA9ICQoXCIuY29tbWVudHMtaXRlbVwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLmNvbW1lbnRzXCIpKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybDogXCIuL3NyYy9ibG9ja3MvdGVzdHMvdGVzdC5odG1sXCIsXHJcbiAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oaHRtbCkge1xyXG4gICAgICAgICQoY29udGFpbmVyKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuU2xpZGVySW1hZ2UoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5vcGVuLWltZ1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdmFyIGJsb2NrID0gJCh0aGlzKS5jbG9zZXN0KFwiLmJsb2NrXCIpO1xyXG4gICAgdmFyIGFjdGl2ZSA9IGJsb2NrLmZpbmQoXCJkaXYuYWN0aXZlXCIpLmZpbmQoXCJpbWdcIik7XHJcbiAgICB2YXIgcG9wdXAgPSBibG9jay5maW5kKFwiLnBvcHVwXCIpO1xyXG5cclxuICAgIHBvcHVwXHJcbiAgICAgIC5mYWRlSW4oKVxyXG4gICAgICAuaHRtbCgkKGFjdGl2ZVswXSkuY2xvbmUoKSlcclxuICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cInBvcHVwLWNsb3NlXCI+PC9kaXY+Jyk7XHJcbiAgICBjbG9zZVBvcHVwKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5wb3B1cC1jbG9zZVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcG9wdXAuZmFkZU91dCgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFwc0N1c3RvbSgpIHtcclxuICB5bWFwcy5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXHJcbiAgICAgICAgXCJtYXBcIixcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjZW50ZXI6IFs1Ni44NTIwNzEsIDUzLjIxMzQ1OF0sXHJcbiAgICAgICAgICB6b29tOiAxN1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc2VhcmNoQ29udHJvbFByb3ZpZGVyOiBcInlhbmRleCNzZWFyY2hcIlxyXG4gICAgICAgIH1cclxuICAgICAgKSxcclxuICAgICAgTXlJY29uQ29udGVudExheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcclxuICAgICAgICAnPGRpdiBzdHlsZT1cImNvbG9yOiAjRkZGRkZGOyBmb250LXdlaWdodDogYm9sZDtcIj4kW3Byb3BlcnRpZXMuaWNvbkNvbnRlbnRdPC9kaXY+J1xyXG4gICAgICApO1xyXG4gICAgbXlQbGFjZW1hcmtXaXRoQ29udGVudCA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoXHJcbiAgICAgIFs1Ni44NTIwNzEsIDUzLjIxMzQ1OF0sXHJcbiAgICAgIHtcclxuICAgICAgICBoaW50Q29udGVudDogXCLQm9C40YXQstC40L3RhtC10LLQsCwgNDZcIlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWNvbkxheW91dDogXCJkZWZhdWx0I2ltYWdlV2l0aENvbnRlbnRcIixcclxuICAgICAgICBpY29uSW1hZ2VIcmVmOiBcIi4vaW1hZ2VzL2ljb24ucG5nXCIsXHJcbiAgICAgICAgLy8gaWNvbkltYWdlU2l6ZTogWzQ4LCA3MF0sXHJcbiAgICAgICAgLy8gaWNvbkltYWdlT2Zmc2V0OiBbLTI0LCAtNjRdLFxyXG4gICAgICAgIC8vIGljb25Db250ZW50T2Zmc2V0OiBbMTUsIDE1XSxcclxuICAgICAgICBpY29uQ29udGVudExheW91dDogTXlJY29uQ29udGVudExheW91dFxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGxhY2VtYXJrV2l0aENvbnRlbnQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vL9C30LDQutGA0L7QtdC8INC/0L7Qv9Cw0L8g0L/QviDQutC70LjQutGDINCy0L3QtSDQtdCz0L5cclxuZnVuY3Rpb24gY2xvc2VEaXYoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJtb3VzZXVwXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKFwiLnBvcHVwXCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuaXRlbVwiKSk7XHJcbiAgICB2YXIgcG9wdXAgPSAkKFwiLnZlaWxcIik7XHJcbiAgICB2YXIgZGl2ID0gJChcIi5wb3B1cFwiKTtcclxuICAgIGlmICghZGl2LmlzKGUudGFyZ2V0KSAmJiBkaXYuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcclxuICAgICAgZGl2LmhpZGUoKTtcclxuICAgICAgY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICAgIHBvcHVwLmhpZGUoKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1BpYygpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLm9wZW4taW1nXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKFwiLnBvcHVwXCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuaXRlbVwiKSk7XHJcbiAgICB2YXIgaW1nID0gJChcIi5pbWctcHJldlwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLml0ZW1cIikpO1xyXG4gICAgdmFyIHBvcHVwID0gJChcIi52ZWlsXCIpO1xyXG4gICAgcG9wdXAuc2hvdygpO1xyXG4gICAgY29udGFpbmVyXHJcbiAgICAgIC5odG1sKCQoaW1nKS5jbG9uZSgpKVxyXG4gICAgICAuZmFkZUluKClcclxuICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cInBvcHVwLWNsb3NlXCI+PC9kaXY+Jyk7XHJcblxyXG4gICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgY2xvc2VEaXYoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnBvcHVwLWNsb3NlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb250YWluZXIuZmFkZU91dCgpO1xyXG4gICAgICAgIGNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICAgIHBvcHVwLmhpZGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZGV4UGFnZSgpIHtcclxuICAvLyDQvtCx0YDQtdC30LDRgtGMINC90LDQt9Cy0LDQvdC40LUg0YDRg9Cx0YDQuNC6INC/0L4g0YjQuNGA0LjQvdC1XHJcbiAgdmFyIGNhcHRpb25zID0gJChcIi5zaG93LWJ1dHRvbiAudGV4dC1jb250YWluZXIgcFwiKTtcclxuICB2YXIgbmV3c2NhcHRpb24gPSAkKFwiLm5ld3MtcHJldmlldyAudGV4dC1jb250YWluZXIgcFwiKTtcclxuICBpZiAoY2FwdGlvbnMubGVuZ3RoKSB7XHJcbiAgICBjYXB0aW9ucy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAkY2xhbXAodGhpcywgeyBjbGFtcDogMyB9KTtcclxuICAgIH0pO1xyXG4gICAgY2hlY2tDbGFtcChjYXB0aW9ucyk7XHJcbiAgfVxyXG4gIGlmIChuZXdzY2FwdGlvbi5sZW5ndGgpIHtcclxuICAgIG5ld3NjYXB0aW9uLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICRjbGFtcCh0aGlzLCB7IGNsYW1wOiAzIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGNoZWNrQ2xhbXAoaXRlbSkge1xyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5zaC1idG5cIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICBpZiAoaXRlbS5jbG9zZXN0KFwiLnNoLWhpZGRlblwiKSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgJGNsYW1wKCQoaXRlbSlbaV0sIHsgY2xhbXA6IFwiMTAwMHB4XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbi8vICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjaGVhZGVyIC5tZW51IGEnLCBmdW5jdGlvbihlKXtcclxuLy8gICAgIHZhciBocmVmID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbi8vICAgICBpZiAoaHJlZi5pbmRleE9mKCcvIycpID09PSAwKSB7XHJcbi8vICAgICAgICAgdmFyIGlkID0gaHJlZi5zdWJzdHJpbmcoMiksXHJcbi8vICAgICAgICAgICAgIGJsb2NrID0gJCgnIycraWQpO1xyXG5cclxuLy8gICAgICAgICBpZiAoYmxvY2subGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4vLyAgICAgICAgICAgICAgICAgJ3Njcm9sbFRvcCcgOiBibG9jay5vZmZzZXQoKS50b3AgLSA0MFxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH0pO1xyXG4vL31cclxuXHJcbmZ1bmN0aW9uIHNlY3Rpb25QYWdlKCkge1xyXG4gIHZhciBwdWJzID0gJChcIi5zZWN0aW9uLXB1YnMgLnB1Yi1jb250YWluZXJcIik7XHJcbiAgaWYgKHB1YnMubGVuZ3RoKSB7XHJcbiAgICBwdWJzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBjYXB0aW9uID0gJChcIi5jYXB0aW9uXCIsICQodGhpcykpLFxyXG4gICAgICAgIGFubm90YXRpb24gPSAkKFwiLmFubm90YXRpb25cIiwgJCh0aGlzKSk7XHJcbiAgICAgIGNoZWNrQ2xhbXAoJCh0aGlzKSk7XHJcbiAgICAgIGlmIChjYXB0aW9uLmhlaWdodCgpID4gOTIgfHwgYW5ub3RhdGlvbi5oZWlnaHQoKSA+IDk2KSB7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInNoLWhpZGRlbiBoaWRlYWJsZVwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2gtaGlkZGVuIGhpZGVhYmxlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBwdWJzLm9uKFwiY2xpY2tcIiwgXCIuc2gtYnRuXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBjaGVja0NsYW1wKCQodGhpcykuY2xvc2VzdChcIi5zaC1ibG9ja1wiKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIGZ1bmN0aW9uIGNoZWNrQ2xhbXAoaXRlbSkge1xyXG4gIC8vICAgLy8g0Y3RgtC+0YIg0YHQutGA0LjQv9GCINGB0YDQsNCx0LDRgtGL0LLQsNC10YIg0YDQsNC90YzRiNC1INGH0LXQvCDRgdGC0LDQvdC00LDRgNGC0L3Ri9C5INC00LvRjyBzaC1ibG9jaywg0L/QvtGN0YLQvtC80YMg0YLRg9GCINC90L7QsdC+0YDQvtGCINC/0YDQvtCy0LXRgNC60LBcclxuICAvLyAgIGlmIChpdGVtLmlzKFwiLnNoLWhpZGRlblwiKSkge1xyXG4gIC8vICAgICAkY2xhbXAoJChcIi5jYXB0aW9uXCIsIGl0ZW0pWzBdLCB7IGNsYW1wOiBcIjEwMDBweFwiIH0pO1xyXG4gIC8vICAgICAkY2xhbXAoJChcIi5hbm5vdGF0aW9uXCIsIGl0ZW0pWzBdLCB7IGNsYW1wOiBcIjEwMDBweFwiIH0pO1xyXG4gIC8vICAgfSBlbHNlIHtcclxuICAvLyAgICAgJGNsYW1wKCQoXCIuY2FwdGlvblwiLCBpdGVtKVswXSwgeyBjbGFtcDogMyB9KTtcclxuICAvLyAgICAgJGNsYW1wKCQoXCIuYW5ub3RhdGlvblwiLCBpdGVtKVswXSwgeyBjbGFtcDogMyB9KTtcclxuICAvLyAgIH1cclxuICAvLyB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRpbmdFdmVudHMoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jZWxsIC5udW1iLmV2ZW50XCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB2YXIgYWN0aXZlID0gJChcIi5jZWxsIC5udW1iLmFjdGl2ZVwiKSxcclxuICAgICAgZXZlbnRzSW5mbyA9ICQoXCIuZXZlbnRzLWluZm9cIik7XHJcbiAgICBhY3RpdmUucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIikuYWRkQ2xhc3MoXCJldmVudFwiKTtcclxuICAgICQodGhpcylcclxuICAgICAgLnJlbW92ZUNsYXNzKFwiZXZlbnRcIilcclxuICAgICAgLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgZXZlbnRzSW5mby5lbXB0eSgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiBcIi4vc3JjL2Jsb2Nrcy90ZXN0cy90ZXN0MS5odG1sXCIsXHJcbiAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oaHRtbCkge1xyXG4gICAgICAgICQoZXZlbnRzSW5mbykuaHRtbChodG1sKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
