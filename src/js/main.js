$(document).ready(function() {
  showHide();
  mainslider();
  openimage();
  textCut();
  mapsCustom();
  usefullslider();
  showButt();
  loadComments();
  indexPage();
  showPic();
});

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
        showButt(); //добавляем класс, если комментарий превышает дефолтную высоту
        indexPage();
      }
    });
  });
}

function openimage() {
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

function textCut() {
  var text = $(document).find(".news-preview p");
  text.each(function(i, item) {
    var size = 98;
    var elementText = item.innerText;
    if (elementText.length > size) {
      var result = elementText.substring(0, size) + "...";
      result.replace(/\s{2,}/g, " ");
      item.innerText = result;
    } else {
      return item;
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

function indexPage() {
  // обрезать название рубрик по ширине
  var captions = $(".text-container p");
  if (captions.length) {
    captions.each(function() {
      $clamp(this, { clamp: 3 });
    });
  }
}

function showPic() {
  $(document).on("click", ".open-img", function(e) {
    var container = $(".popup", $(e.target).closest(".item"));
    var img = $(".album-prev", $(e.target).closest(".item"));
    var popup = $(".veil");
    popup.show();
    container
      .html($(img).clone())
      .fadeIn()
      .append('<div class="popup-close"></div>');

    closePopup();

    function closePopup() {
      $(document).on("click", ".popup-close", function(e) {
        container.fadeOut();
        container.empty();
        popup.hide();
      });
    }
  });
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
