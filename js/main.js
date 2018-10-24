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
    console.log(this);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIHNob3dIaWRlKCk7XHJcbiAgbWFpbnNsaWRlcigpO1xyXG4gIG9wZW5TbGlkZXJJbWFnZSgpO1xyXG4gIG1hcHNDdXN0b20oKTtcclxuICB1c2VmdWxsc2xpZGVyKCk7XHJcbiAgc2hvd0J1dHQoKTtcclxuICBsb2FkQ29tbWVudHMoKTtcclxuICBpbmRleFBhZ2UoKTtcclxuICBzaG93UGljKCk7XHJcbiAgaGlkZU1lbnVJdGVtcygpO1xyXG4gIGxvYWRpbmdFdmVudHMoKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBoaWRlTWVudUl0ZW1zKCkge1xyXG4gIC8v0LvQuNC80LjRgiDQv9C+0LrQsNC30YvQstCw0LXQvNGL0YUg0Y3Qu9C10LzQtdC90YLQvtCyXHJcbiAgdmFyIGxpbWl0ID0gNjtcclxuICB2YXIgYnVyZ2VyTWVudSA9ICQoXCIuYnVyZ2VyLXRpbWUgLm1lbnUtY29udGFpbmVyIC5tYWluLW1lbnVcIik7XHJcbiAgLy/QuNGB0LrQu9GO0YfQsNC10Lwg0LzQvtCx0LjQu9GM0L3QvtC1INC80LXQvdGOXHJcbiAgdmFyIGNvbnRhaW5lciA9ICQoXCIubWFpbi1tZW51XCIpLm5vdChidXJnZXJNZW51KTtcclxuICB2YXIgaGlkZUNvbnRhaW5lciA9ICQoXCIuaGlkZGVuLWxpc3RcIik7XHJcbiAgaWYgKCFjb250YWluZXIubGVuZ3RoIHx8ICQoXCJhXCIsIGNvbnRhaW5lcikubGVuZ3RoIDw9IGxpbWl0ICsgMSkgcmV0dXJuIHRydWU7XHJcblxyXG4gIGluaXQoKTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICQoXCJsaTpndChcIiArIChsaW1pdCAtIDEpICsgXCIpXCIsIGNvbnRhaW5lcikuYXBwZW5kVG8oaGlkZUNvbnRhaW5lcik7XHJcbiAgICBjb250YWluZXIuYWRkQ2xhc3MoXCJzaC1ibG9jayBzaC1oaWRkZW5cIik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93SGlkZUJsb2NrKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIHZhciBibG9jayA9ICQodGhpcykuY2xvc2VzdChcIi5zaC1ibG9ja1wiKTtcclxuICBibG9jay50b2dnbGVDbGFzcyhcInNoLWhpZGRlblwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0hpZGUoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5zaC1idG4sIC5zaG93LXRleHRcIiwgc2hvd0hpZGVCbG9jayk7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jbHMtYnRuXCIsIHNob3dIaWRlQmxvY2spO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWluc2xpZGVyKCkge1xyXG4gICQoXCIubWFpbnNsaWRlclwiKS5vd2xDYXJvdXNlbCh7XHJcbiAgICBsb29wOiB0cnVlLFxyXG4gICAgaXRlbXM6IDEsXHJcbiAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICBtb3VzZURyYWc6IGZhbHNlLFxyXG4gICAgbmF2OiB0cnVlLFxyXG4gICAgZG90czogZmFsc2UsXHJcbiAgICBuYXZUZXh0OiBmYWxzZVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1c2VmdWxsc2xpZGVyKCkge1xyXG4gICQoXCIudXNlZnVsbHNsaWRlclwiKS5vd2xDYXJvdXNlbCh7XHJcbiAgICBsb29wOiBmYWxzZSxcclxuICAgIGl0ZW1zOiAyLFxyXG4gICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgbW91c2VEcmFnOiB0cnVlLFxyXG4gICAgbmF2OiB0cnVlLFxyXG4gICAgZG90czogdHJ1ZSxcclxuICAgIG5hdlRleHQ6IGZhbHNlLFxyXG4gICAgc2xpZGVCeTogMlxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93QnV0dCgpIHtcclxuICB2YXIgaGVpZ2h0VGV4dCA9IDEzMjtcclxuICB2YXIgdGV4dCA9ICQoXCIuc2gtYmxvY2suc2gtaGlkZGVuIHBcIik7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGhlaWdodFRleHQgPCB0ZXh0W2ldLm9mZnNldEhlaWdodCkge1xyXG4gICAgICAkKHRleHRbaV0pXHJcbiAgICAgICAgLmNsb3Nlc3QoXCIuc2gtYmxvY2suc2gtaGlkZGVuXCIpXHJcbiAgICAgICAgLmFkZENsYXNzKFwic2hvdy1idXR0b25cIik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkQ29tbWVudHMoKSB7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jb21tZW50cyAuY291bnRlci1pdGVtXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKFwiLmNvbW1lbnRzLWl0ZW1cIiwgJChlLnRhcmdldCkuY2xvc2VzdChcIi5jb21tZW50c1wiKSk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB1cmw6IFwiLi9zcmMvYmxvY2tzL3Rlc3RzL3Rlc3QuaHRtbFwiLFxyXG4gICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGh0bWwpIHtcclxuICAgICAgICAkKGNvbnRhaW5lcikuYXBwZW5kKGh0bWwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblNsaWRlckltYWdlKCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIub3Blbi1pbWdcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciBibG9jayA9ICQodGhpcykuY2xvc2VzdChcIi5ibG9ja1wiKTtcclxuICAgIHZhciBhY3RpdmUgPSBibG9jay5maW5kKFwiZGl2LmFjdGl2ZVwiKS5maW5kKFwiaW1nXCIpO1xyXG4gICAgdmFyIHBvcHVwID0gYmxvY2suZmluZChcIi5wb3B1cFwiKTtcclxuXHJcbiAgICBwb3B1cFxyXG4gICAgICAuZmFkZUluKClcclxuICAgICAgLmh0bWwoJChhY3RpdmVbMF0pLmNsb25lKCkpXHJcbiAgICAgIC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJwb3B1cC1jbG9zZVwiPjwvZGl2PicpO1xyXG4gICAgY2xvc2VQb3B1cCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIucG9wdXAtY2xvc2VcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHBvcHVwLmZhZGVPdXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIHRleHRDdXQoKSB7XHJcbi8vICAgdmFyIHRleHQgPSAkKGRvY3VtZW50KS5maW5kKFwiLm5ld3MtcHJldmlldyBwXCIpO1xyXG4vLyAgIHRleHQuZWFjaChmdW5jdGlvbihpLCBpdGVtKSB7XHJcbi8vICAgICB2YXIgc2l6ZSA9IDk4O1xyXG4vLyAgICAgdmFyIGVsZW1lbnRUZXh0ID0gaXRlbS5pbm5lclRleHQ7XHJcbi8vICAgICBpZiAoZWxlbWVudFRleHQubGVuZ3RoID4gc2l6ZSkge1xyXG4vLyAgICAgICB2YXIgcmVzdWx0ID0gZWxlbWVudFRleHQuc3Vic3RyaW5nKDAsIHNpemUpICsgXCIuLi5cIjtcclxuLy8gICAgICAgcmVzdWx0LnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpO1xyXG4vLyAgICAgICBpdGVtLmlubmVyVGV4dCA9IHJlc3VsdDtcclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgIHJldHVybiBpdGVtO1xyXG4vLyAgICAgfVxyXG4vLyAgIH0pO1xyXG4vLyB9XHJcblxyXG5mdW5jdGlvbiBtYXBzQ3VzdG9tKCkge1xyXG4gIHltYXBzLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcclxuICAgICAgICBcIm1hcFwiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNlbnRlcjogWzU2Ljg1MjA3MSwgNTMuMjEzNDU4XSxcclxuICAgICAgICAgIHpvb206IDE3XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzZWFyY2hDb250cm9sUHJvdmlkZXI6IFwieWFuZGV4I3NlYXJjaFwiXHJcbiAgICAgICAgfVxyXG4gICAgICApLFxyXG4gICAgICBNeUljb25Db250ZW50TGF5b3V0ID0geW1hcHMudGVtcGxhdGVMYXlvdXRGYWN0b3J5LmNyZWF0ZUNsYXNzKFxyXG4gICAgICAgICc8ZGl2IHN0eWxlPVwiY29sb3I6ICNGRkZGRkY7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPiRbcHJvcGVydGllcy5pY29uQ29udGVudF08L2Rpdj4nXHJcbiAgICAgICk7XHJcbiAgICBteVBsYWNlbWFya1dpdGhDb250ZW50ID0gbmV3IHltYXBzLlBsYWNlbWFyayhcclxuICAgICAgWzU2Ljg1MjA3MSwgNTMuMjEzNDU4XSxcclxuICAgICAge1xyXG4gICAgICAgIGhpbnRDb250ZW50OiBcItCb0LjRhdCy0LjQvdGG0LXQstCwLCA0NlwiXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpY29uTGF5b3V0OiBcImRlZmF1bHQjaW1hZ2VXaXRoQ29udGVudFwiLFxyXG4gICAgICAgIGljb25JbWFnZUhyZWY6IFwiLi9pbWFnZXMvaWNvbi5wbmdcIixcclxuICAgICAgICAvLyBpY29uSW1hZ2VTaXplOiBbNDgsIDcwXSxcclxuICAgICAgICAvLyBpY29uSW1hZ2VPZmZzZXQ6IFstMjQsIC02NF0sXHJcbiAgICAgICAgLy8gaWNvbkNvbnRlbnRPZmZzZXQ6IFsxNSwgMTVdLFxyXG4gICAgICAgIGljb25Db250ZW50TGF5b3V0OiBNeUljb25Db250ZW50TGF5b3V0XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQbGFjZW1hcmtXaXRoQ29udGVudCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8v0LfQsNC60YDQvtC10Lwg0L/QvtC/0LDQvyDQv9C+INC60LvQuNC60YMg0LLQvdC1INC10LPQvlxyXG5mdW5jdGlvbiBjbG9zZURpdigpIHtcclxuICAkKGRvY3VtZW50KS5vbihcIm1vdXNldXBcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIGNvbnRhaW5lciA9ICQoXCIucG9wdXBcIiwgJChlLnRhcmdldCkuY2xvc2VzdChcIi5pdGVtXCIpKTtcclxuICAgIHZhciBwb3B1cCA9ICQoXCIudmVpbFwiKTtcclxuICAgIHZhciBkaXYgPSAkKFwiLnBvcHVwXCIpO1xyXG4gICAgaWYgKCFkaXYuaXMoZS50YXJnZXQpICYmIGRpdi5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBkaXYuaGlkZSgpO1xyXG4gICAgICBjb250YWluZXIuZW1wdHkoKTtcclxuICAgICAgcG9wdXAuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93UGljKCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIub3Blbi1pbWdcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIGNvbnRhaW5lciA9ICQoXCIucG9wdXBcIiwgJChlLnRhcmdldCkuY2xvc2VzdChcIi5pdGVtXCIpKTtcclxuICAgIHZhciBpbWcgPSAkKFwiLmltZy1wcmV2XCIsICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuaXRlbVwiKSk7XHJcbiAgICB2YXIgcG9wdXAgPSAkKFwiLnZlaWxcIik7XHJcbiAgICBwb3B1cC5zaG93KCk7XHJcbiAgICBjb250YWluZXJcclxuICAgICAgLmh0bWwoJChpbWcpLmNsb25lKCkpXHJcbiAgICAgIC5mYWRlSW4oKVxyXG4gICAgICAuYXBwZW5kKCc8ZGl2IGNsYXNzPVwicG9wdXAtY2xvc2VcIj48L2Rpdj4nKTtcclxuXHJcbiAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICBjbG9zZURpdigpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIucG9wdXAtY2xvc2VcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnRhaW5lci5mYWRlT3V0KCk7XHJcbiAgICAgICAgY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICAgICAgcG9wdXAuaGlkZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5kZXhQYWdlKCkge1xyXG4gIC8vINC+0LHRgNC10LfQsNGC0Ywg0L3QsNC30LLQsNC90LjQtSDRgNGD0LHRgNC40Log0L/QviDRiNC40YDQuNC90LVcclxuICB2YXIgY2FwdGlvbnMgPSAkKFwiLnRleHQtY29udGFpbmVyIHBcIik7XHJcbiAgaWYgKGNhcHRpb25zLmxlbmd0aCkge1xyXG4gICAgY2FwdGlvbnMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgJGNsYW1wKHRoaXMsIHsgY2xhbXA6IDMgfSk7XHJcbiAgICB9KTtcclxuICAgIGNoZWNrQ2xhbXAoY2FwdGlvbnMpO1xyXG4gIH1cclxuICBmdW5jdGlvbiBjaGVja0NsYW1wKGl0ZW0pIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuc2gtYnRuXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgaWYgKGl0ZW0uY2xvc2VzdChcIi5zaC1oaWRkZW5cIikpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICRjbGFtcCgkKGl0ZW0pW2ldLCB7IGNsYW1wOiBcIjEwMDBweFwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2hlYWRlciAubWVudSBhJywgZnVuY3Rpb24oZSl7XHJcbi8vICAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4vLyAgICAgaWYgKGhyZWYuaW5kZXhPZignLyMnKSA9PT0gMCkge1xyXG4vLyAgICAgICAgIHZhciBpZCA9IGhyZWYuc3Vic3RyaW5nKDIpLFxyXG4vLyAgICAgICAgICAgICBibG9jayA9ICQoJyMnK2lkKTtcclxuXHJcbi8vICAgICAgICAgaWYgKGJsb2NrLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuLy8gICAgICAgICAgICAgICAgICdzY3JvbGxUb3AnIDogYmxvY2sub2Zmc2V0KCkudG9wIC0gNDBcclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9KTtcclxuLy99XHJcblxyXG5mdW5jdGlvbiBzZWN0aW9uUGFnZSgpIHtcclxuICB2YXIgcHVicyA9ICQoXCIuc2VjdGlvbi1wdWJzIC5wdWItY29udGFpbmVyXCIpO1xyXG4gIGlmIChwdWJzLmxlbmd0aCkge1xyXG4gICAgcHVicy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgY2FwdGlvbiA9ICQoXCIuY2FwdGlvblwiLCAkKHRoaXMpKSxcclxuICAgICAgICBhbm5vdGF0aW9uID0gJChcIi5hbm5vdGF0aW9uXCIsICQodGhpcykpO1xyXG4gICAgICBjaGVja0NsYW1wKCQodGhpcykpO1xyXG4gICAgICBpZiAoY2FwdGlvbi5oZWlnaHQoKSA+IDkyIHx8IGFubm90YXRpb24uaGVpZ2h0KCkgPiA5Nikge1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJzaC1oaWRkZW4gaGlkZWFibGVcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcInNoLWhpZGRlbiBoaWRlYWJsZVwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcHVicy5vbihcImNsaWNrXCIsIFwiLnNoLWJ0blwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgY2hlY2tDbGFtcCgkKHRoaXMpLmNsb3Nlc3QoXCIuc2gtYmxvY2tcIikpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBmdW5jdGlvbiBjaGVja0NsYW1wKGl0ZW0pIHtcclxuICAvLyAgIC8vINGN0YLQvtGCINGB0LrRgNC40L/RgiDRgdGA0LDQsdCw0YLRi9Cy0LDQtdGCINGA0LDQvdGM0YjQtSDRh9C10Lwg0YHRgtCw0L3QtNCw0YDRgtC90YvQuSDQtNC70Y8gc2gtYmxvY2ssINC/0L7RjdGC0L7QvNGDINGC0YPRgiDQvdC+0LHQvtGA0L7RgiDQv9GA0L7QstC10YDQutCwXHJcbiAgLy8gICBpZiAoaXRlbS5pcyhcIi5zaC1oaWRkZW5cIikpIHtcclxuICAvLyAgICAgJGNsYW1wKCQoXCIuY2FwdGlvblwiLCBpdGVtKVswXSwgeyBjbGFtcDogXCIxMDAwcHhcIiB9KTtcclxuICAvLyAgICAgJGNsYW1wKCQoXCIuYW5ub3RhdGlvblwiLCBpdGVtKVswXSwgeyBjbGFtcDogXCIxMDAwcHhcIiB9KTtcclxuICAvLyAgIH0gZWxzZSB7XHJcbiAgLy8gICAgICRjbGFtcCgkKFwiLmNhcHRpb25cIiwgaXRlbSlbMF0sIHsgY2xhbXA6IDMgfSk7XHJcbiAgLy8gICAgICRjbGFtcCgkKFwiLmFubm90YXRpb25cIiwgaXRlbSlbMF0sIHsgY2xhbXA6IDMgfSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkaW5nRXZlbnRzKCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuY2VsbCAubnVtYi5ldmVudFwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdmFyIGFjdGl2ZSA9ICQoXCIuY2VsbCAubnVtYi5hY3RpdmVcIiksXHJcbiAgICAgIGV2ZW50c0luZm8gPSAkKFwiLmV2ZW50cy1pbmZvXCIpO1xyXG4gICAgYWN0aXZlLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLmFkZENsYXNzKFwiZXZlbnRcIik7XHJcbiAgICAkKHRoaXMpXHJcbiAgICAgIC5yZW1vdmVDbGFzcyhcImV2ZW50XCIpXHJcbiAgICAgIC5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgIGV2ZW50c0luZm8uZW1wdHkoKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiBcIi4vc3JjL2Jsb2Nrcy90ZXN0cy90ZXN0MS5odG1sXCIsXHJcbiAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oaHRtbCkge1xyXG4gICAgICAgICQoZXZlbnRzSW5mbykuaHRtbChodG1sKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
