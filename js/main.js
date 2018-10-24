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
  loadingEvents();
  navigation();
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
        $(eventsInfo).append(html);
      }
    });
  });
}

function navigation() {
  var container = $(".section");
  var header = $("h3").closest(container);
  var navigation = $(".navigation li a");

  for (var i = 0; i < navigation.length; i++) {
    console.log(navigation[i]);
  }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIHNob3dIaWRlKCk7XHJcbiAgbWFpbnNsaWRlcigpO1xyXG4gIG9wZW5TbGlkZXJJbWFnZSgpO1xyXG4gIC8vdGV4dEN1dCgpO1xyXG4gIG1hcHNDdXN0b20oKTtcclxuICB1c2VmdWxsc2xpZGVyKCk7XHJcbiAgc2hvd0J1dHQoKTtcclxuICBsb2FkQ29tbWVudHMoKTtcclxuICBpbmRleFBhZ2UoKTtcclxuICBzaG93UGljKCk7XHJcbiAgaGlkZU1lbnVJdGVtcygpO1xyXG4gIGxvYWRpbmdFdmVudHMoKTtcclxuICBuYXZpZ2F0aW9uKCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaGlkZU1lbnVJdGVtcygpIHtcclxuICAvL9C70LjQvNC40YIg0L/QvtC60LDQt9GL0LLQsNC10LzRi9GFINGN0LvQtdC80LXQvdGC0L7QslxyXG4gIHZhciBsaW1pdCA9IDY7XHJcbiAgdmFyIGJ1cmdlck1lbnUgPSAkKFwiLmJ1cmdlci10aW1lIC5tZW51LWNvbnRhaW5lciAubWFpbi1tZW51XCIpO1xyXG4gIC8v0LjRgdC60LvRjtGH0LDQtdC8INC80L7QsdC40LvRjNC90L7QtSDQvNC10L3RjlxyXG4gIHZhciBjb250YWluZXIgPSAkKFwiLm1haW4tbWVudVwiKS5ub3QoYnVyZ2VyTWVudSk7XHJcbiAgdmFyIGhpZGVDb250YWluZXIgPSAkKFwiLmhpZGRlbi1saXN0XCIpO1xyXG4gIGlmICghY29udGFpbmVyLmxlbmd0aCB8fCAkKFwiYVwiLCBjb250YWluZXIpLmxlbmd0aCA8PSBsaW1pdCArIDEpIHJldHVybiB0cnVlO1xyXG5cclxuICBpbml0KCk7XHJcblxyXG4gIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAkKFwibGk6Z3QoXCIgKyAobGltaXQgLSAxKSArIFwiKVwiLCBjb250YWluZXIpLmFwcGVuZFRvKGhpZGVDb250YWluZXIpO1xyXG4gICAgY29udGFpbmVyLmFkZENsYXNzKFwic2gtYmxvY2sgc2gtaGlkZGVuXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0hpZGVCbG9jayhlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICB2YXIgYmxvY2sgPSAkKHRoaXMpLmNsb3Nlc3QoXCIuc2gtYmxvY2tcIik7XHJcbiAgYmxvY2sudG9nZ2xlQ2xhc3MoXCJzaC1oaWRkZW5cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dIaWRlKCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuc2gtYnRuLCAuc2hvdy10ZXh0XCIsIHNob3dIaWRlQmxvY2spO1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuY2xzLWJ0blwiLCBzaG93SGlkZUJsb2NrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFpbnNsaWRlcigpIHtcclxuICAkKFwiLm1haW5zbGlkZXJcIikub3dsQ2Fyb3VzZWwoe1xyXG4gICAgbG9vcDogdHJ1ZSxcclxuICAgIGl0ZW1zOiAxLFxyXG4gICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgbW91c2VEcmFnOiBmYWxzZSxcclxuICAgIG5hdjogdHJ1ZSxcclxuICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgbmF2VGV4dDogZmFsc2VcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXNlZnVsbHNsaWRlcigpIHtcclxuICAkKFwiLnVzZWZ1bGxzbGlkZXJcIikub3dsQ2Fyb3VzZWwoe1xyXG4gICAgbG9vcDogZmFsc2UsXHJcbiAgICBpdGVtczogMixcclxuICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgIG1vdXNlRHJhZzogdHJ1ZSxcclxuICAgIG5hdjogdHJ1ZSxcclxuICAgIGRvdHM6IHRydWUsXHJcbiAgICBuYXZUZXh0OiBmYWxzZSxcclxuICAgIHNsaWRlQnk6IDJcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0J1dHQoKSB7XHJcbiAgdmFyIGhlaWdodFRleHQgPSAxMzI7XHJcbiAgdmFyIHRleHQgPSAkKFwiLnNoLWJsb2NrLnNoLWhpZGRlbiBwXCIpO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChoZWlnaHRUZXh0IDwgdGV4dFtpXS5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgJCh0ZXh0W2ldKVxyXG4gICAgICAgIC5jbG9zZXN0KFwiLnNoLWJsb2NrLnNoLWhpZGRlblwiKVxyXG4gICAgICAgIC5hZGRDbGFzcyhcInNob3ctYnV0dG9uXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZENvbW1lbnRzKCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuY29tbWVudHMgLmNvdW50ZXItaXRlbVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICB2YXIgY29udGFpbmVyID0gJChcIi5jb21tZW50cy1pdGVtXCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuY29tbWVudHNcIikpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiBcIi4vc3JjL2Jsb2Nrcy90ZXN0cy90ZXN0Lmh0bWxcIixcclxuICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihodG1sKSB7XHJcbiAgICAgICAgJChjb250YWluZXIpLmFwcGVuZChodG1sKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5TbGlkZXJJbWFnZSgpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLm9wZW4taW1nXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB2YXIgYmxvY2sgPSAkKHRoaXMpLmNsb3Nlc3QoXCIuYmxvY2tcIik7XHJcbiAgICB2YXIgYWN0aXZlID0gYmxvY2suZmluZChcImRpdi5hY3RpdmVcIikuZmluZChcImltZ1wiKTtcclxuICAgIHZhciBwb3B1cCA9IGJsb2NrLmZpbmQoXCIucG9wdXBcIik7XHJcblxyXG4gICAgcG9wdXBcclxuICAgICAgLmZhZGVJbigpXHJcbiAgICAgIC5odG1sKCQoYWN0aXZlWzBdKS5jbG9uZSgpKVxyXG4gICAgICAuYXBwZW5kKCc8ZGl2IGNsYXNzPVwicG9wdXAtY2xvc2VcIj48L2Rpdj4nKTtcclxuICAgIGNsb3NlUG9wdXAoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnBvcHVwLWNsb3NlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBwb3B1cC5mYWRlT3V0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiB0ZXh0Q3V0KCkge1xyXG4vLyAgIHZhciB0ZXh0ID0gJChkb2N1bWVudCkuZmluZChcIi5uZXdzLXByZXZpZXcgcFwiKTtcclxuLy8gICB0ZXh0LmVhY2goZnVuY3Rpb24oaSwgaXRlbSkge1xyXG4vLyAgICAgdmFyIHNpemUgPSA5ODtcclxuLy8gICAgIHZhciBlbGVtZW50VGV4dCA9IGl0ZW0uaW5uZXJUZXh0O1xyXG4vLyAgICAgaWYgKGVsZW1lbnRUZXh0Lmxlbmd0aCA+IHNpemUpIHtcclxuLy8gICAgICAgdmFyIHJlc3VsdCA9IGVsZW1lbnRUZXh0LnN1YnN0cmluZygwLCBzaXplKSArIFwiLi4uXCI7XHJcbi8vICAgICAgIHJlc3VsdC5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKTtcclxuLy8gICAgICAgaXRlbS5pbm5lclRleHQgPSByZXN1bHQ7XHJcbi8vICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICByZXR1cm4gaXRlbTtcclxuLy8gICAgIH1cclxuLy8gICB9KTtcclxuLy8gfVxyXG5cclxuZnVuY3Rpb24gbWFwc0N1c3RvbSgpIHtcclxuICB5bWFwcy5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXHJcbiAgICAgICAgXCJtYXBcIixcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjZW50ZXI6IFs1Ni44NTIwNzEsIDUzLjIxMzQ1OF0sXHJcbiAgICAgICAgICB6b29tOiAxN1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc2VhcmNoQ29udHJvbFByb3ZpZGVyOiBcInlhbmRleCNzZWFyY2hcIlxyXG4gICAgICAgIH1cclxuICAgICAgKSxcclxuICAgICAgTXlJY29uQ29udGVudExheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcclxuICAgICAgICAnPGRpdiBzdHlsZT1cImNvbG9yOiAjRkZGRkZGOyBmb250LXdlaWdodDogYm9sZDtcIj4kW3Byb3BlcnRpZXMuaWNvbkNvbnRlbnRdPC9kaXY+J1xyXG4gICAgICApO1xyXG4gICAgbXlQbGFjZW1hcmtXaXRoQ29udGVudCA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoXHJcbiAgICAgIFs1Ni44NTIwNzEsIDUzLjIxMzQ1OF0sXHJcbiAgICAgIHtcclxuICAgICAgICBoaW50Q29udGVudDogXCLQm9C40YXQstC40L3RhtC10LLQsCwgNDZcIlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWNvbkxheW91dDogXCJkZWZhdWx0I2ltYWdlV2l0aENvbnRlbnRcIixcclxuICAgICAgICBpY29uSW1hZ2VIcmVmOiBcIi4vaW1hZ2VzL2ljb24ucG5nXCIsXHJcbiAgICAgICAgLy8gaWNvbkltYWdlU2l6ZTogWzQ4LCA3MF0sXHJcbiAgICAgICAgLy8gaWNvbkltYWdlT2Zmc2V0OiBbLTI0LCAtNjRdLFxyXG4gICAgICAgIC8vIGljb25Db250ZW50T2Zmc2V0OiBbMTUsIDE1XSxcclxuICAgICAgICBpY29uQ29udGVudExheW91dDogTXlJY29uQ29udGVudExheW91dFxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGxhY2VtYXJrV2l0aENvbnRlbnQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vL9C30LDQutGA0L7QtdC8INC/0L7Qv9Cw0L8g0L/QviDQutC70LjQutGDINCy0L3QtSDQtdCz0L5cclxuZnVuY3Rpb24gY2xvc2VEaXYoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJtb3VzZXVwXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKFwiLnBvcHVwXCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuaXRlbVwiKSk7XHJcbiAgICB2YXIgcG9wdXAgPSAkKFwiLnZlaWxcIik7XHJcbiAgICB2YXIgZGl2ID0gJChcIi5wb3B1cFwiKTtcclxuICAgIGlmICghZGl2LmlzKGUudGFyZ2V0KSAmJiBkaXYuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcclxuICAgICAgZGl2LmhpZGUoKTtcclxuICAgICAgY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICAgIHBvcHVwLmhpZGUoKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1BpYygpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLm9wZW4taW1nXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKFwiLnBvcHVwXCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuaXRlbVwiKSk7XHJcbiAgICB2YXIgaW1nID0gJChcIi5pbWctcHJldlwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLml0ZW1cIikpO1xyXG4gICAgdmFyIHBvcHVwID0gJChcIi52ZWlsXCIpO1xyXG4gICAgcG9wdXAuc2hvdygpO1xyXG4gICAgY29udGFpbmVyXHJcbiAgICAgIC5odG1sKCQoaW1nKS5jbG9uZSgpKVxyXG4gICAgICAuZmFkZUluKClcclxuICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cInBvcHVwLWNsb3NlXCI+PC9kaXY+Jyk7XHJcblxyXG4gICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgY2xvc2VEaXYoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnBvcHVwLWNsb3NlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb250YWluZXIuZmFkZU91dCgpO1xyXG4gICAgICAgIGNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICAgIHBvcHVwLmhpZGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZGV4UGFnZSgpIHtcclxuICAvLyDQvtCx0YDQtdC30LDRgtGMINC90LDQt9Cy0LDQvdC40LUg0YDRg9Cx0YDQuNC6INC/0L4g0YjQuNGA0LjQvdC1XHJcbiAgdmFyIGNhcHRpb25zID0gJChcIi50ZXh0LWNvbnRhaW5lciBwXCIpO1xyXG4gIGlmIChjYXB0aW9ucy5sZW5ndGgpIHtcclxuICAgIGNhcHRpb25zLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICRjbGFtcCh0aGlzLCB7IGNsYW1wOiAzIH0pO1xyXG4gICAgfSk7XHJcbiAgICBjaGVja0NsYW1wKGNhcHRpb25zKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gY2hlY2tDbGFtcChpdGVtKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnNoLWJ0blwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmIChpdGVtLmNsb3Nlc3QoXCIuc2gtaGlkZGVuXCIpKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAkY2xhbXAoJChpdGVtKVtpXSwgeyBjbGFtcDogXCIxMDAwcHhcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuLy8gJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNoZWFkZXIgLm1lbnUgYScsIGZ1bmN0aW9uKGUpe1xyXG4vLyAgICAgdmFyIGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuLy8gICAgIGlmIChocmVmLmluZGV4T2YoJy8jJykgPT09IDApIHtcclxuLy8gICAgICAgICB2YXIgaWQgPSBocmVmLnN1YnN0cmluZygyKSxcclxuLy8gICAgICAgICAgICAgYmxvY2sgPSAkKCcjJytpZCk7XHJcblxyXG4vLyAgICAgICAgIGlmIChibG9jay5sZW5ndGgpIHtcclxuLy8gICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbi8vICAgICAgICAgICAgICAgICAnc2Nyb2xsVG9wJyA6IGJsb2NrLm9mZnNldCgpLnRvcCAtIDQwXHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfSk7XHJcbi8vfVxyXG5cclxuZnVuY3Rpb24gc2VjdGlvblBhZ2UoKSB7XHJcbiAgdmFyIHB1YnMgPSAkKFwiLnNlY3Rpb24tcHVicyAucHViLWNvbnRhaW5lclwiKTtcclxuICBpZiAocHVicy5sZW5ndGgpIHtcclxuICAgIHB1YnMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGNhcHRpb24gPSAkKFwiLmNhcHRpb25cIiwgJCh0aGlzKSksXHJcbiAgICAgICAgYW5ub3RhdGlvbiA9ICQoXCIuYW5ub3RhdGlvblwiLCAkKHRoaXMpKTtcclxuICAgICAgY2hlY2tDbGFtcCgkKHRoaXMpKTtcclxuICAgICAgaWYgKGNhcHRpb24uaGVpZ2h0KCkgPiA5MiB8fCBhbm5vdGF0aW9uLmhlaWdodCgpID4gOTYpIHtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwic2gtaGlkZGVuIGhpZGVhYmxlXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJzaC1oaWRkZW4gaGlkZWFibGVcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHB1YnMub24oXCJjbGlja1wiLCBcIi5zaC1idG5cIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNoZWNrQ2xhbXAoJCh0aGlzKS5jbG9zZXN0KFwiLnNoLWJsb2NrXCIpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gZnVuY3Rpb24gY2hlY2tDbGFtcChpdGVtKSB7XHJcbiAgLy8gICAvLyDRjdGC0L7RgiDRgdC60YDQuNC/0YIg0YHRgNCw0LHQsNGC0YvQstCw0LXRgiDRgNCw0L3RjNGI0LUg0YfQtdC8INGB0YLQsNC90LTQsNGA0YLQvdGL0Lkg0LTQu9GPIHNoLWJsb2NrLCDQv9C+0Y3RgtC+0LzRgyDRgtGD0YIg0L3QvtCx0L7RgNC+0YIg0L/RgNC+0LLQtdGA0LrQsFxyXG4gIC8vICAgaWYgKGl0ZW0uaXMoXCIuc2gtaGlkZGVuXCIpKSB7XHJcbiAgLy8gICAgICRjbGFtcCgkKFwiLmNhcHRpb25cIiwgaXRlbSlbMF0sIHsgY2xhbXA6IFwiMTAwMHB4XCIgfSk7XHJcbiAgLy8gICAgICRjbGFtcCgkKFwiLmFubm90YXRpb25cIiwgaXRlbSlbMF0sIHsgY2xhbXA6IFwiMTAwMHB4XCIgfSk7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICAkY2xhbXAoJChcIi5jYXB0aW9uXCIsIGl0ZW0pWzBdLCB7IGNsYW1wOiAzIH0pO1xyXG4gIC8vICAgICAkY2xhbXAoJChcIi5hbm5vdGF0aW9uXCIsIGl0ZW0pWzBdLCB7IGNsYW1wOiAzIH0pO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZGluZ0V2ZW50cygpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmNlbGwgLm51bWIuZXZlbnRcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciBhY3RpdmUgPSAkKFwiLmNlbGwgLm51bWIuYWN0aXZlXCIpLFxyXG4gICAgICBldmVudHNJbmZvID0gJChcIi5ldmVudHMtaW5mb1wiKTtcclxuICAgIGFjdGl2ZS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKS5hZGRDbGFzcyhcImV2ZW50XCIpO1xyXG4gICAgJCh0aGlzKVxyXG4gICAgICAucmVtb3ZlQ2xhc3MoXCJldmVudFwiKVxyXG4gICAgICAuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICBldmVudHNJbmZvLmVtcHR5KCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB1cmw6IFwiLi9zcmMvYmxvY2tzL3Rlc3RzL3Rlc3QxLmh0bWxcIixcclxuICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihodG1sKSB7XHJcbiAgICAgICAgJChldmVudHNJbmZvKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBuYXZpZ2F0aW9uKCkge1xyXG4gIHZhciBjb250YWluZXIgPSAkKFwiLnNlY3Rpb25cIik7XHJcbiAgdmFyIGhlYWRlciA9ICQoXCJoM1wiKS5jbG9zZXN0KGNvbnRhaW5lcik7XHJcbiAgdmFyIG5hdmlnYXRpb24gPSAkKFwiLm5hdmlnYXRpb24gbGkgYVwiKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYXZpZ2F0aW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zb2xlLmxvZyhuYXZpZ2F0aW9uW2ldKTtcclxuICB9XHJcbn1cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
