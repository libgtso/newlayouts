function showHideBlock(e){e.preventDefault(),$(this).closest(".sh-block").toggleClass("sh-hidden")}function showHide(){$(document).on("click",".sh-btn, .show-text",showHideBlock),$(document).on("click",".cls-btn",showHideBlock)}function mainslider(){$(".mainslider").owlCarousel({loop:!0,items:1,autoplay:!1,mouseDrag:!1,nav:!0,dots:!1,navText:!1})}function usefullslider(){$(".usefullslider").owlCarousel({loop:!1,items:2,autoplay:!1,mouseDrag:!0,nav:!0,dots:!0,navText:!1,slideBy:2})}function showButt(){for(var e=$(".sh-block.sh-hidden p"),t=0;t<e.length;t++)132<e[t].offsetHeight&&$(e[t]).closest(".sh-block.sh-hidden").addClass("show-button")}function loadComments(){$(document).on("click",".comments .counter-item",function(e){var t=$(".comments-item",$(e.target).closest(".comments"));$.ajax({url:"./src/blocks/tests/test.html",cache:!1,type:"GET",success:function(e){$(t).append(e),showButt(),indexPage()}})})}function openimage(){$(document).on("click",".open-img",function(e){e.preventDefault();var t=$(this).closest(".block"),o=t.find("div.active").find("img"),n=t.find(".popup");n.fadeIn().html($(o[0]).clone()).append('<div class="popup-close"></div>'),$(document).on("click",".popup-close",function(e){n.fadeOut()})})}function textCut(){$(document).find(".news-preview p").each(function(e,t){var o=t.innerText;if(!(98<o.length))return t;var n=o.substring(0,98)+"...";n.replace(/\s{2,}/g," "),t.innerText=n})}function mapsCustom(){ymaps.ready(function(){var e=new ymaps.Map("map",{center:[56.852071,53.213458],zoom:17},{searchControlProvider:"yandex#search"}),t=ymaps.templateLayoutFactory.createClass('<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>');myPlacemarkWithContent=new ymaps.Placemark([56.852071,53.213458],{hintContent:"Лихвинцева, 46"},{iconLayout:"default#imageWithContent",iconImageHref:"./images/icon.png",iconContentLayout:t}),e.geoObjects.add(myPlacemarkWithContent)})}function indexPage(){var e=$(".text-container p");e.length&&e.each(function(){$clamp(this,{clamp:3})})}function showPic(){$(document).on("click",".open-img",function(e){var t=$(".popup",$(e.target).closest(".item")),o=$(".album-prev",$(e.target).closest(".item")),n=$(".veil");n.show(),t.html($(o).clone()).fadeIn().append('<div class="popup-close"></div>'),$(document).on("click",".popup-close",function(e){t.fadeOut(),t.empty(),n.hide()})})}$(document).ready(function(){showHide(),mainslider(),openimage(),textCut(),mapsCustom(),usefullslider(),showButt(),loadComments(),indexPage(),showPic()});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsic2hvd0hpZGVCbG9jayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIiQiLCJ0aGlzIiwiY2xvc2VzdCIsInRvZ2dsZUNsYXNzIiwic2hvd0hpZGUiLCJkb2N1bWVudCIsIm9uIiwibWFpbnNsaWRlciIsIm93bENhcm91c2VsIiwibG9vcCIsIml0ZW1zIiwiYXV0b3BsYXkiLCJtb3VzZURyYWciLCJuYXYiLCJkb3RzIiwibmF2VGV4dCIsInVzZWZ1bGxzbGlkZXIiLCJzbGlkZUJ5Iiwic2hvd0J1dHQiLCJ0ZXh0IiwiaSIsImxlbmd0aCIsIm9mZnNldEhlaWdodCIsImFkZENsYXNzIiwibG9hZENvbW1lbnRzIiwiY29udGFpbmVyIiwidGFyZ2V0IiwiYWpheCIsInVybCIsImNhY2hlIiwidHlwZSIsInN1Y2Nlc3MiLCJodG1sIiwiYXBwZW5kIiwiaW5kZXhQYWdlIiwib3BlbmltYWdlIiwiYmxvY2siLCJhY3RpdmUiLCJmaW5kIiwicG9wdXAiLCJmYWRlSW4iLCJjbG9uZSIsImZhZGVPdXQiLCJ0ZXh0Q3V0IiwiZWFjaCIsIml0ZW0iLCJlbGVtZW50VGV4dCIsImlubmVyVGV4dCIsInJlc3VsdCIsInN1YnN0cmluZyIsInJlcGxhY2UiLCJtYXBzQ3VzdG9tIiwieW1hcHMiLCJyZWFkeSIsIm15TWFwIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsInNlYXJjaENvbnRyb2xQcm92aWRlciIsIk15SWNvbkNvbnRlbnRMYXlvdXQiLCJ0ZW1wbGF0ZUxheW91dEZhY3RvcnkiLCJjcmVhdGVDbGFzcyIsIm15UGxhY2VtYXJrV2l0aENvbnRlbnQiLCJQbGFjZW1hcmsiLCJoaW50Q29udGVudCIsImljb25MYXlvdXQiLCJpY29uSW1hZ2VIcmVmIiwiaWNvbkNvbnRlbnRMYXlvdXQiLCJnZW9PYmplY3RzIiwiYWRkIiwiY2FwdGlvbnMiLCIkY2xhbXAiLCJjbGFtcCIsInNob3dQaWMiLCJpbWciLCJzaG93IiwiZW1wdHkiLCJoaWRlIl0sIm1h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QyxFQUFFLFNBQ2R1QyxFQUFNb0MsT0FDTmxELEVBQ0dPLEtBQUtoQyxFQUFFMEUsR0FBS2pDLFNBQ1pELFNBQ0FQLE9BQU8sbUNBS1JqQyxFQUFFSyxVQUFVQyxHQUFHLFFBQVMsZUFBZ0IsU0FBU1IsR0FDL0MyQixFQUFVaUIsVUFDVmpCLEVBQVVtRCxRQUNWckMsRUFBTXNDLFdBakxkN0UsRUFBRUssVUFBVWdELE1BQU0sV0FDaEJqRCxXQUNBRyxhQUNBNEIsWUFDQVEsVUFDQVEsYUFDQW5DLGdCQUNBRSxXQUNBTSxlQUNBVSxZQUNBdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIHNob3dIaWRlKCk7XHJcbiAgbWFpbnNsaWRlcigpO1xyXG4gIG9wZW5pbWFnZSgpO1xyXG4gIHRleHRDdXQoKTtcclxuICBtYXBzQ3VzdG9tKCk7XHJcbiAgdXNlZnVsbHNsaWRlcigpO1xyXG4gIHNob3dCdXR0KCk7XHJcbiAgbG9hZENvbW1lbnRzKCk7XHJcbiAgaW5kZXhQYWdlKCk7XHJcbiAgc2hvd1BpYygpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNob3dIaWRlQmxvY2soZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgdmFyIGJsb2NrID0gJCh0aGlzKS5jbG9zZXN0KFwiLnNoLWJsb2NrXCIpO1xyXG4gIGJsb2NrLnRvZ2dsZUNsYXNzKFwic2gtaGlkZGVuXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93SGlkZSgpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnNoLWJ0biwgLnNob3ctdGV4dFwiLCBzaG93SGlkZUJsb2NrKTtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmNscy1idG5cIiwgc2hvd0hpZGVCbG9jayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW5zbGlkZXIoKSB7XHJcbiAgJChcIi5tYWluc2xpZGVyXCIpLm93bENhcm91c2VsKHtcclxuICAgIGxvb3A6IHRydWUsXHJcbiAgICBpdGVtczogMSxcclxuICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgIG1vdXNlRHJhZzogZmFsc2UsXHJcbiAgICBuYXY6IHRydWUsXHJcbiAgICBkb3RzOiBmYWxzZSxcclxuICAgIG5hdlRleHQ6IGZhbHNlXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZWZ1bGxzbGlkZXIoKSB7XHJcbiAgJChcIi51c2VmdWxsc2xpZGVyXCIpLm93bENhcm91c2VsKHtcclxuICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgaXRlbXM6IDIsXHJcbiAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICBtb3VzZURyYWc6IHRydWUsXHJcbiAgICBuYXY6IHRydWUsXHJcbiAgICBkb3RzOiB0cnVlLFxyXG4gICAgbmF2VGV4dDogZmFsc2UsXHJcbiAgICBzbGlkZUJ5OiAyXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dCdXR0KCkge1xyXG4gIHZhciBoZWlnaHRUZXh0ID0gMTMyO1xyXG4gIHZhciB0ZXh0ID0gJChcIi5zaC1ibG9jay5zaC1oaWRkZW4gcFwiKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoaGVpZ2h0VGV4dCA8IHRleHRbaV0ub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgICQodGV4dFtpXSlcclxuICAgICAgICAuY2xvc2VzdChcIi5zaC1ibG9jay5zaC1oaWRkZW5cIilcclxuICAgICAgICAuYWRkQ2xhc3MoXCJzaG93LWJ1dHRvblwiKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRDb21tZW50cygpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmNvbW1lbnRzIC5jb3VudGVyLWl0ZW1cIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIGNvbnRhaW5lciA9ICQoXCIuY29tbWVudHMtaXRlbVwiLCAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLmNvbW1lbnRzXCIpKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybDogXCIuL3NyYy9ibG9ja3MvdGVzdHMvdGVzdC5odG1sXCIsXHJcbiAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oaHRtbCkge1xyXG4gICAgICAgICQoY29udGFpbmVyKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgc2hvd0J1dHQoKTsgLy/QtNC+0LHQsNCy0LvRj9C10Lwg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0LrQvtC80LzQtdC90YLQsNGA0LjQuSDQv9GA0LXQstGL0YjQsNC10YIg0LTQtdGE0L7Qu9GC0L3Rg9GOINCy0YvRgdC+0YLRg1xyXG4gICAgICAgIGluZGV4UGFnZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlbmltYWdlKCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIub3Blbi1pbWdcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciBibG9jayA9ICQodGhpcykuY2xvc2VzdChcIi5ibG9ja1wiKTtcclxuICAgIHZhciBhY3RpdmUgPSBibG9jay5maW5kKFwiZGl2LmFjdGl2ZVwiKS5maW5kKFwiaW1nXCIpO1xyXG4gICAgdmFyIHBvcHVwID0gYmxvY2suZmluZChcIi5wb3B1cFwiKTtcclxuXHJcbiAgICBwb3B1cFxyXG4gICAgICAuZmFkZUluKClcclxuICAgICAgLmh0bWwoJChhY3RpdmVbMF0pLmNsb25lKCkpXHJcbiAgICAgIC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJwb3B1cC1jbG9zZVwiPjwvZGl2PicpO1xyXG4gICAgY2xvc2VQb3B1cCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIucG9wdXAtY2xvc2VcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHBvcHVwLmZhZGVPdXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRleHRDdXQoKSB7XHJcbiAgdmFyIHRleHQgPSAkKGRvY3VtZW50KS5maW5kKFwiLm5ld3MtcHJldmlldyBwXCIpO1xyXG4gIHRleHQuZWFjaChmdW5jdGlvbihpLCBpdGVtKSB7XHJcbiAgICB2YXIgc2l6ZSA9IDk4O1xyXG4gICAgdmFyIGVsZW1lbnRUZXh0ID0gaXRlbS5pbm5lclRleHQ7XHJcbiAgICBpZiAoZWxlbWVudFRleHQubGVuZ3RoID4gc2l6ZSkge1xyXG4gICAgICB2YXIgcmVzdWx0ID0gZWxlbWVudFRleHQuc3Vic3RyaW5nKDAsIHNpemUpICsgXCIuLi5cIjtcclxuICAgICAgcmVzdWx0LnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpO1xyXG4gICAgICBpdGVtLmlubmVyVGV4dCA9IHJlc3VsdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBzQ3VzdG9tKCkge1xyXG4gIHltYXBzLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcclxuICAgICAgICBcIm1hcFwiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNlbnRlcjogWzU2Ljg1MjA3MSwgNTMuMjEzNDU4XSxcclxuICAgICAgICAgIHpvb206IDE3XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzZWFyY2hDb250cm9sUHJvdmlkZXI6IFwieWFuZGV4I3NlYXJjaFwiXHJcbiAgICAgICAgfVxyXG4gICAgICApLFxyXG4gICAgICBNeUljb25Db250ZW50TGF5b3V0ID0geW1hcHMudGVtcGxhdGVMYXlvdXRGYWN0b3J5LmNyZWF0ZUNsYXNzKFxyXG4gICAgICAgICc8ZGl2IHN0eWxlPVwiY29sb3I6ICNGRkZGRkY7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPiRbcHJvcGVydGllcy5pY29uQ29udGVudF08L2Rpdj4nXHJcbiAgICAgICk7XHJcbiAgICBteVBsYWNlbWFya1dpdGhDb250ZW50ID0gbmV3IHltYXBzLlBsYWNlbWFyayhcclxuICAgICAgWzU2Ljg1MjA3MSwgNTMuMjEzNDU4XSxcclxuICAgICAge1xyXG4gICAgICAgIGhpbnRDb250ZW50OiBcItCb0LjRhdCy0LjQvdGG0LXQstCwLCA0NlwiXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpY29uTGF5b3V0OiBcImRlZmF1bHQjaW1hZ2VXaXRoQ29udGVudFwiLFxyXG4gICAgICAgIGljb25JbWFnZUhyZWY6IFwiLi9pbWFnZXMvaWNvbi5wbmdcIixcclxuICAgICAgICAvLyBpY29uSW1hZ2VTaXplOiBbNDgsIDcwXSxcclxuICAgICAgICAvLyBpY29uSW1hZ2VPZmZzZXQ6IFstMjQsIC02NF0sXHJcbiAgICAgICAgLy8gaWNvbkNvbnRlbnRPZmZzZXQ6IFsxNSwgMTVdLFxyXG4gICAgICAgIGljb25Db250ZW50TGF5b3V0OiBNeUljb25Db250ZW50TGF5b3V0XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQbGFjZW1hcmtXaXRoQ29udGVudCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZGV4UGFnZSgpIHtcclxuICAvLyDQvtCx0YDQtdC30LDRgtGMINC90LDQt9Cy0LDQvdC40LUg0YDRg9Cx0YDQuNC6INC/0L4g0YjQuNGA0LjQvdC1XHJcbiAgdmFyIGNhcHRpb25zID0gJChcIi50ZXh0LWNvbnRhaW5lciBwXCIpO1xyXG4gIGlmIChjYXB0aW9ucy5sZW5ndGgpIHtcclxuICAgIGNhcHRpb25zLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICRjbGFtcCh0aGlzLCB7IGNsYW1wOiAzIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93UGljKCkge1xyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIub3Blbi1pbWdcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIGNvbnRhaW5lciA9ICQoXCIucG9wdXBcIiwgJChlLnRhcmdldCkuY2xvc2VzdChcIi5pdGVtXCIpKTtcclxuICAgIHZhciBpbWcgPSAkKFwiLmFsYnVtLXByZXZcIiwgJChlLnRhcmdldCkuY2xvc2VzdChcIi5pdGVtXCIpKTtcclxuICAgIHZhciBwb3B1cCA9ICQoXCIudmVpbFwiKTtcclxuICAgIHBvcHVwLnNob3coKTtcclxuICAgIGNvbnRhaW5lclxyXG4gICAgICAuaHRtbCgkKGltZykuY2xvbmUoKSlcclxuICAgICAgLmZhZGVJbigpXHJcbiAgICAgIC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJwb3B1cC1jbG9zZVwiPjwvZGl2PicpO1xyXG5cclxuICAgIGNsb3NlUG9wdXAoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnBvcHVwLWNsb3NlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb250YWluZXIuZmFkZU91dCgpO1xyXG4gICAgICAgIGNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICAgIHBvcHVwLmhpZGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjaGVhZGVyIC5tZW51IGEnLCBmdW5jdGlvbihlKXtcclxuLy8gICAgIHZhciBocmVmID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbi8vICAgICBpZiAoaHJlZi5pbmRleE9mKCcvIycpID09PSAwKSB7XHJcbi8vICAgICAgICAgdmFyIGlkID0gaHJlZi5zdWJzdHJpbmcoMiksXHJcbi8vICAgICAgICAgICAgIGJsb2NrID0gJCgnIycraWQpO1xyXG5cclxuLy8gICAgICAgICBpZiAoYmxvY2subGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4vLyAgICAgICAgICAgICAgICAgJ3Njcm9sbFRvcCcgOiBibG9jay5vZmZzZXQoKS50b3AgLSA0MFxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH0pO1xyXG4vL31cclxuIl19
