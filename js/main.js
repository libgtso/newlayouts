$(document).ready(function() {
  showHide();
  mainslider();
  openSliderImage();
  //textCut();
  mapsCustom();
  usefullslider();
  showButt();
  loadComments();
  indexPage();
  showPic();
  hideMenuItems();
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

// function textCut() {
//   var text = $(document).find(".news-preview p");
//   text.each(function(i, item) {
//     var size = 98;
//     var elementText = item.innerText;
//     if (elementText.length > size) {
//       var result = elementText.substring(0, size) + "...";
//       result.replace(/\s{2,}/g, " ");
//       item.innerText = result;
//     } else {
//       return item;
//     }
//   });
// }

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
  var captions = $(".text-container p");
  if (captions.length) {
    captions.each(function() {
      $clamp(this, { clamp: 3 });
    });
    checkClamp(captions);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIHNob3dIaWRlKCk7XHJcbiAgbWFpbnNsaWRlcigpO1xyXG4gIG9wZW5TbGlkZXJJbWFnZSgpO1xyXG4gIC8vdGV4dEN1dCgpO1xyXG4gIG1hcHNDdXN0b20oKTtcclxuICB1c2VmdWxsc2xpZGVyKCk7XHJcbiAgc2hvd0J1dHQoKTtcclxuICBsb2FkQ29tbWVudHMoKTtcclxuICBpbmRleFBhZ2UoKTtcclxuICBzaG93UGljKCk7XHJcbiAgaGlkZU1lbnVJdGVtcygpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGhpZGVNZW51SXRlbXMoKSB7XHJcbiAgLy/Qu9C40LzQuNGCINC/0L7QutCw0LfRi9Cy0LDQtdC80YvRhSDRjdC70LXQvNC10L3RgtC+0LJcclxuICB2YXIgbGltaXQgPSA2O1xyXG4gIHZhciBidXJnZXJNZW51ID0gJChcIi5idXJnZXItdGltZSAubWVudS1jb250YWluZXIgLm1haW4tbWVudVwiKTtcclxuICAvL9C40YHQutC70Y7Rh9Cw0LXQvCDQvNC+0LHQuNC70YzQvdC+0LUg0LzQtdC90Y5cclxuICB2YXIgY29udGFpbmVyID0gJChcIi5tYWluLW1lbnVcIikubm90KGJ1cmdlck1lbnUpO1xyXG4gIHZhciBoaWRlQ29udGFpbmVyID0gJChcIi5oaWRkZW4tbGlzdFwiKTtcclxuICBpZiAoIWNvbnRhaW5lci5sZW5ndGggfHwgJChcImFcIiwgY29udGFpbmVyKS5sZW5ndGggPD0gbGltaXQgKyAxKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgaW5pdCgpO1xyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgJChcImxpOmd0KFwiICsgKGxpbWl0IC0gMSkgKyBcIilcIiwgY29udGFpbmVyKS5hcHBlbmRUbyhoaWRlQ29udGFpbmVyKTtcclxuICAgIGNvbnRhaW5lci5hZGRDbGFzcyhcInNoLWJsb2NrIHNoLWhpZGRlblwiKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dIaWRlQmxvY2soZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgdmFyIGJsb2NrID0gJCh0aGlzKS5jbG9zZXN0KFwiLnNoLWJsb2NrXCIpO1xyXG4gIGJsb2NrLnRvZ2dsZUNsYXNzKFwic2gtaGlkZGVuXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93SGlkZSgpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnNoLWJ0biwgLnNob3ctdGV4dFwiLCBzaG93SGlkZUJsb2NrKTtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmNscy1idG5cIiwgc2hvd0hpZGVCbG9jayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW5zbGlkZXIoKSB7XHJcbiAgJChcIi5tYWluc2xpZGVyXCIpLm93bENhcm91c2VsKHtcclxuICAgIGxvb3A6IHRydWUsXHJcbiAgICBpdGVtczogMSxcclxuICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgIG1vdXNlRHJhZzogZmFsc2UsXHJcbiAgICBuYXY6IHRydWUsXHJcbiAgICBkb3RzOiBmYWxzZSxcclxuICAgIG5hdlRleHQ6IGZhbHNlXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZWZ1bGxzbGlkZXIoKSB7XHJcbiAgJChcIi51c2VmdWxsc2xpZGVyXCIpLm93bENhcm91c2VsKHtcclxuICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgaXRlbXM6IDIsXHJcbiAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICBtb3VzZURyYWc6IHRydWUsXHJcbiAgICBuYXY6IHRydWUsXHJcbiAgICBkb3RzOiB0cnVlLFxyXG4gICAgbmF2VGV4dDogZmFsc2UsXHJcbiAgICBzbGlkZUJ5OiAyXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dCdXR0KCkge1xyXG4gIHZhciBoZWlnaHRUZXh0ID0gMTMyO1xyXG4gIHZhciB0ZXh0ID0gJChcIi5zaC1ibG9jay5zaC1oaWRkZW4gcFwiKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoaGVpZ2h0VGV4dCA8IHRleHRbaV0ub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgICQodGV4dFtpXSlcclxuICAgICAgICAuY2xvc2VzdChcIi5zaC1ibG9jay5zaC1oaWRkZW5cIilcclxuICAgICAgICAuYWRkQ2xhc3MoXCJzaG93LWJ1dHRvblwiKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRDb21tZW50cygpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmNvbW1lbnRzIC5jb3VudGVyLWl0ZW1cIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIGNvbnRhaW5lciA9ICQoXCIuY29tbWVudHMtaXRlbVwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLmNvbW1lbnRzXCIpKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybDogXCIuL3NyYy9ibG9ja3MvdGVzdHMvdGVzdC5odG1sXCIsXHJcbiAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oaHRtbCkge1xyXG4gICAgICAgICQoY29udGFpbmVyKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuU2xpZGVySW1hZ2UoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5vcGVuLWltZ1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdmFyIGJsb2NrID0gJCh0aGlzKS5jbG9zZXN0KFwiLmJsb2NrXCIpO1xyXG4gICAgdmFyIGFjdGl2ZSA9IGJsb2NrLmZpbmQoXCJkaXYuYWN0aXZlXCIpLmZpbmQoXCJpbWdcIik7XHJcbiAgICB2YXIgcG9wdXAgPSBibG9jay5maW5kKFwiLnBvcHVwXCIpO1xyXG5cclxuICAgIHBvcHVwXHJcbiAgICAgIC5mYWRlSW4oKVxyXG4gICAgICAuaHRtbCgkKGFjdGl2ZVswXSkuY2xvbmUoKSlcclxuICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cInBvcHVwLWNsb3NlXCI+PC9kaXY+Jyk7XHJcbiAgICBjbG9zZVBvcHVwKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5wb3B1cC1jbG9zZVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcG9wdXAuZmFkZU91dCgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gdGV4dEN1dCgpIHtcclxuLy8gICB2YXIgdGV4dCA9ICQoZG9jdW1lbnQpLmZpbmQoXCIubmV3cy1wcmV2aWV3IHBcIik7XHJcbi8vICAgdGV4dC5lYWNoKGZ1bmN0aW9uKGksIGl0ZW0pIHtcclxuLy8gICAgIHZhciBzaXplID0gOTg7XHJcbi8vICAgICB2YXIgZWxlbWVudFRleHQgPSBpdGVtLmlubmVyVGV4dDtcclxuLy8gICAgIGlmIChlbGVtZW50VGV4dC5sZW5ndGggPiBzaXplKSB7XHJcbi8vICAgICAgIHZhciByZXN1bHQgPSBlbGVtZW50VGV4dC5zdWJzdHJpbmcoMCwgc2l6ZSkgKyBcIi4uLlwiO1xyXG4vLyAgICAgICByZXN1bHQucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIik7XHJcbi8vICAgICAgIGl0ZW0uaW5uZXJUZXh0ID0gcmVzdWx0O1xyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgcmV0dXJuIGl0ZW07XHJcbi8vICAgICB9XHJcbi8vICAgfSk7XHJcbi8vIH1cclxuXHJcbmZ1bmN0aW9uIG1hcHNDdXN0b20oKSB7XHJcbiAgeW1hcHMucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKFxyXG4gICAgICAgIFwibWFwXCIsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY2VudGVyOiBbNTYuODUyMDcxLCA1My4yMTM0NThdLFxyXG4gICAgICAgICAgem9vbTogMTdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNlYXJjaENvbnRyb2xQcm92aWRlcjogXCJ5YW5kZXgjc2VhcmNoXCJcclxuICAgICAgICB9XHJcbiAgICAgICksXHJcbiAgICAgIE15SWNvbkNvbnRlbnRMYXlvdXQgPSB5bWFwcy50ZW1wbGF0ZUxheW91dEZhY3RvcnkuY3JlYXRlQ2xhc3MoXHJcbiAgICAgICAgJzxkaXYgc3R5bGU9XCJjb2xvcjogI0ZGRkZGRjsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+JFtwcm9wZXJ0aWVzLmljb25Db250ZW50XTwvZGl2PidcclxuICAgICAgKTtcclxuICAgIG15UGxhY2VtYXJrV2l0aENvbnRlbnQgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFxyXG4gICAgICBbNTYuODUyMDcxLCA1My4yMTM0NThdLFxyXG4gICAgICB7XHJcbiAgICAgICAgaGludENvbnRlbnQ6IFwi0JvQuNGF0LLQuNC90YbQtdCy0LAsIDQ2XCJcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGljb25MYXlvdXQ6IFwiZGVmYXVsdCNpbWFnZVdpdGhDb250ZW50XCIsXHJcbiAgICAgICAgaWNvbkltYWdlSHJlZjogXCIuL2ltYWdlcy9pY29uLnBuZ1wiLFxyXG4gICAgICAgIC8vIGljb25JbWFnZVNpemU6IFs0OCwgNzBdLFxyXG4gICAgICAgIC8vIGljb25JbWFnZU9mZnNldDogWy0yNCwgLTY0XSxcclxuICAgICAgICAvLyBpY29uQ29udGVudE9mZnNldDogWzE1LCAxNV0sXHJcbiAgICAgICAgaWNvbkNvbnRlbnRMYXlvdXQ6IE15SWNvbkNvbnRlbnRMYXlvdXRcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBsYWNlbWFya1dpdGhDb250ZW50KTtcclxuICB9KTtcclxufVxyXG5cclxuLy/Qt9Cw0LrRgNC+0LXQvCDQv9C+0L/QsNC/INC/0L4g0LrQu9C40LrRgyDQstC90LUg0LXQs9C+XHJcbmZ1bmN0aW9uIGNsb3NlRGl2KCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwibW91c2V1cFwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICB2YXIgY29udGFpbmVyID0gJChcIi5wb3B1cFwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLml0ZW1cIikpO1xyXG4gICAgdmFyIHBvcHVwID0gJChcIi52ZWlsXCIpO1xyXG4gICAgdmFyIGRpdiA9ICQoXCIucG9wdXBcIik7XHJcbiAgICBpZiAoIWRpdi5pcyhlLnRhcmdldCkgJiYgZGl2LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGRpdi5oaWRlKCk7XHJcbiAgICAgIGNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICBwb3B1cC5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dQaWMoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5vcGVuLWltZ1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICB2YXIgY29udGFpbmVyID0gJChcIi5wb3B1cFwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLml0ZW1cIikpO1xyXG4gICAgdmFyIGltZyA9ICQoXCIuaW1nLXByZXZcIiwgJChlLnRhcmdldCkuY2xvc2VzdChcIi5pdGVtXCIpKTtcclxuICAgIHZhciBwb3B1cCA9ICQoXCIudmVpbFwiKTtcclxuICAgIHBvcHVwLnNob3coKTtcclxuICAgIGNvbnRhaW5lclxyXG4gICAgICAuaHRtbCgkKGltZykuY2xvbmUoKSlcclxuICAgICAgLmZhZGVJbigpXHJcbiAgICAgIC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJwb3B1cC1jbG9zZVwiPjwvZGl2PicpO1xyXG5cclxuICAgIGNsb3NlUG9wdXAoKTtcclxuICAgIGNsb3NlRGl2KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5wb3B1cC1jbG9zZVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29udGFpbmVyLmZhZGVPdXQoKTtcclxuICAgICAgICBjb250YWluZXIuZW1wdHkoKTtcclxuICAgICAgICBwb3B1cC5oaWRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbmRleFBhZ2UoKSB7XHJcbiAgLy8g0L7QsdGA0LXQt9Cw0YLRjCDQvdCw0LfQstCw0L3QuNC1INGA0YPQsdGA0LjQuiDQv9C+INGI0LjRgNC40L3QtVxyXG4gIHZhciBjYXB0aW9ucyA9ICQoXCIudGV4dC1jb250YWluZXIgcFwiKTtcclxuICBpZiAoY2FwdGlvbnMubGVuZ3RoKSB7XHJcbiAgICBjYXB0aW9ucy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAkY2xhbXAodGhpcywgeyBjbGFtcDogMyB9KTtcclxuICAgIH0pO1xyXG4gICAgY2hlY2tDbGFtcChjYXB0aW9ucyk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGNoZWNrQ2xhbXAoaXRlbSkge1xyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5zaC1idG5cIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICBpZiAoaXRlbS5jbG9zZXN0KFwiLnNoLWhpZGRlblwiKSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgJGNsYW1wKCQoaXRlbSlbaV0sIHsgY2xhbXA6IFwiMTAwMHB4XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbi8vICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjaGVhZGVyIC5tZW51IGEnLCBmdW5jdGlvbihlKXtcclxuLy8gICAgIHZhciBocmVmID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbi8vICAgICBpZiAoaHJlZi5pbmRleE9mKCcvIycpID09PSAwKSB7XHJcbi8vICAgICAgICAgdmFyIGlkID0gaHJlZi5zdWJzdHJpbmcoMiksXHJcbi8vICAgICAgICAgICAgIGJsb2NrID0gJCgnIycraWQpO1xyXG5cclxuLy8gICAgICAgICBpZiAoYmxvY2subGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4vLyAgICAgICAgICAgICAgICAgJ3Njcm9sbFRvcCcgOiBibG9jay5vZmZzZXQoKS50b3AgLSA0MFxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH0pO1xyXG4vL31cclxuXHJcbmZ1bmN0aW9uIHNlY3Rpb25QYWdlKCkge1xyXG4gIHZhciBwdWJzID0gJChcIi5zZWN0aW9uLXB1YnMgLnB1Yi1jb250YWluZXJcIik7XHJcbiAgaWYgKHB1YnMubGVuZ3RoKSB7XHJcbiAgICBwdWJzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBjYXB0aW9uID0gJChcIi5jYXB0aW9uXCIsICQodGhpcykpLFxyXG4gICAgICAgIGFubm90YXRpb24gPSAkKFwiLmFubm90YXRpb25cIiwgJCh0aGlzKSk7XHJcbiAgICAgIGNoZWNrQ2xhbXAoJCh0aGlzKSk7XHJcbiAgICAgIGlmIChjYXB0aW9uLmhlaWdodCgpID4gOTIgfHwgYW5ub3RhdGlvbi5oZWlnaHQoKSA+IDk2KSB7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInNoLWhpZGRlbiBoaWRlYWJsZVwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2gtaGlkZGVuIGhpZGVhYmxlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBwdWJzLm9uKFwiY2xpY2tcIiwgXCIuc2gtYnRuXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBjaGVja0NsYW1wKCQodGhpcykuY2xvc2VzdChcIi5zaC1ibG9ja1wiKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIGZ1bmN0aW9uIGNoZWNrQ2xhbXAoaXRlbSkge1xyXG4gIC8vICAgLy8g0Y3RgtC+0YIg0YHQutGA0LjQv9GCINGB0YDQsNCx0LDRgtGL0LLQsNC10YIg0YDQsNC90YzRiNC1INGH0LXQvCDRgdGC0LDQvdC00LDRgNGC0L3Ri9C5INC00LvRjyBzaC1ibG9jaywg0L/QvtGN0YLQvtC80YMg0YLRg9GCINC90L7QsdC+0YDQvtGCINC/0YDQvtCy0LXRgNC60LBcclxuICAvLyAgIGlmIChpdGVtLmlzKFwiLnNoLWhpZGRlblwiKSkge1xyXG4gIC8vICAgICAkY2xhbXAoJChcIi5jYXB0aW9uXCIsIGl0ZW0pWzBdLCB7IGNsYW1wOiBcIjEwMDBweFwiIH0pO1xyXG4gIC8vICAgICAkY2xhbXAoJChcIi5hbm5vdGF0aW9uXCIsIGl0ZW0pWzBdLCB7IGNsYW1wOiBcIjEwMDBweFwiIH0pO1xyXG4gIC8vICAgfSBlbHNlIHtcclxuICAvLyAgICAgJGNsYW1wKCQoXCIuY2FwdGlvblwiLCBpdGVtKVswXSwgeyBjbGFtcDogMyB9KTtcclxuICAvLyAgICAgJGNsYW1wKCQoXCIuYW5ub3RhdGlvblwiLCBpdGVtKVswXSwgeyBjbGFtcDogMyB9KTtcclxuICAvLyAgIH1cclxuICAvLyB9XHJcbn1cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
