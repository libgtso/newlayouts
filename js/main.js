function showHideBlock(e){e.preventDefault(),$(this).closest(".sh-block").toggleClass("sh-hidden")}function showHide(){$(document).on("click",".sh-btn, .rylo",showHideBlock),$(document).on("click",".cls-btn",showHideBlock)}function mainslider(){$(".mainslider").owlCarousel({loop:!0,items:1,autoplay:!1,mouseDrag:!1,nav:!0,dots:!1,navText:!1})}function usefullslider(){$(".usefullslider").owlCarousel({loop:!1,items:2,autoplay:!1,mouseDrag:!0,nav:!0,dots:!0,navText:!1,slideBy:2})}function showButt(){var e=$(document).find(".discussions-item.sh-block.sh-hidden");132<$(document).find(".discussions-item.sh-block.sh-hidden p").height()&&e.toggleClass("show-button")}function openimage(){$(document).on("click",".open-img",function(e){e.preventDefault();var n=$(this).closest(".block"),o=n.find("div.active").find("img"),t=n.find(".popup");t.fadeIn().html($(o[0]).clone()).append('<div class="popup-close"></div>'),$(document).on("click",".popup-close",function(e){t.fadeOut()})})}function textCut(){$(document).find(".news-preview p").each(function(e,n){var o=n.innerText;if(!(98<o.length))return n;var t=o.substring(0,98)+"...";t.replace(/\s{2,}/g," "),n.innerText=t})}function mapsCustom(){ymaps.ready(function(){var e=new ymaps.Map("map",{center:[56.852071,53.213458],zoom:17},{searchControlProvider:"yandex#search"}),n=ymaps.templateLayoutFactory.createClass('<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>');myPlacemarkWithContent=new ymaps.Placemark([56.852071,53.213458],{hintContent:"Лихвинцева, 46"},{iconLayout:"default#imageWithContent",iconImageHref:"./images/icon.png",iconContentLayout:n}),e.geoObjects.add(myPlacemarkWithContent)})}$(document).ready(function(){showHide(),mainslider(),openimage(),textCut(),mapsCustom(),usefullslider(),showButt()});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsic2hvd0hpZGVCbG9jayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIiQiLCJ0aGlzIiwiY2xvc2VzdCIsInRvZ2dsZUNsYXNzIiwic2hvd0hpZGUiLCJkb2N1bWVudCIsIm9uIiwibWFpbnNsaWRlciIsIm93bENhcm91c2VsIiwibG9vcCIsIml0ZW1zIiwiYXV0b3BsYXkiLCJtb3VzZURyYWciLCJuYXYiLCJkb3RzIiwibmF2VGV4dCIsInVzZWZ1bGxzbGlkZXIiLCJzbGlkZUJ5Iiwic2hvd0J1dHQiLCJkZWZhdWx0Q2xhc3MiLCJmaW5kIiwiaGVpZ2h0Iiwib3BlbmltYWdlIiwiYmxvY2siLCJhY3RpdmUiLCJwb3B1cCIsImZhZGVJbiIsImh0bWwiLCJjbG9uZSIsImFwcGVuZCIsImZhZGVPdXQiLCJ0ZXh0Q3V0IiwiZWFjaCIsImkiLCJpdGVtIiwiZWxlbWVudFRleHQiLCJpbm5lclRleHQiLCJsZW5ndGgiLCJyZXN1bHQiLCJzdWJzdHJpbmciLCJyZXBsYWNlIiwibWFwc0N1c3RvbSIsInltYXBzIiwicmVhZHkiLCJteU1hcCIsIk1hcCIsImNlbnRlciIsInpvb20iLCJzZWFyY2hDb250cm9sUHJvdmlkZXIiLCJNeUljb25Db250ZW50TGF5b3V0IiwidGVtcGxhdGVMYXlvdXRGYWN0b3J5IiwiY3JlYXRlQ2xhc3MiLCJteVBsYWNlbWFya1dpdGhDb250ZW50IiwiUGxhY2VtYXJrIiwiaGludENvbnRlbnQiLCJpY29uTGF5b3V0IiwiaWNvbkltYWdlSHJlZiIsImljb25Db250ZW50TGF5b3V0IiwiZ2VvT2JqZWN0cyIsImFkZCJdLCJtYXBwaW5ncyI6IkFBVUEsU0FBU0EsY0FBY0MsR0FDckJBLEVBQUVDLGlCQUVVQyxFQUFFQyxNQUFNQyxRQUFRLGFBQ3RCQyxZQUFZLGFBR3BCLFNBQVNDLFdBQ1BKLEVBQUVLLFVBQVVDLEdBQUcsUUFBUyxpQkFBa0JULGVBQzFDRyxFQUFFSyxVQUFVQyxHQUFHLFFBQVMsV0FBWVQsZUFHdEMsU0FBU1UsYUFDUFAsRUFBRSxlQUFlUSxZQUFZLENBQzNCQyxNQUFNLEVBQ05DLE1BQU8sRUFDUEMsVUFBVSxFQUNWQyxXQUFXLEVBQ1hDLEtBQUssRUFDTEMsTUFBTSxFQUNOQyxTQUFTLElBSWIsU0FBU0MsZ0JBQ1BoQixFQUFFLGtCQUFrQlEsWUFBWSxDQUM5QkMsTUFBTSxFQUNOQyxNQUFPLEVBQ1BDLFVBQVUsRUFDVkMsV0FBVyxFQUNYQyxLQUFLLEVBQ0xDLE1BQU0sRUFDTkMsU0FBUyxFQUNURSxRQUFTLElBSWIsU0FBU0MsV0FDUCxJQUNJQyxFQUFlbkIsRUFBRUssVUFBVWUsS0FBSyx3Q0FEbkIsSUFFTnBCLEVBQUVLLFVBQVVlLEtBQUssMENBRU5DLFVBQ3BCRixFQUFhaEIsWUFBWSxlQUk3QixTQUFTbUIsWUFDUHRCLEVBQUVLLFVBQVVDLEdBQUcsUUFBUyxZQUFhLFNBQVNSLEdBQzVDQSxFQUFFQyxpQkFFRixJQUFJd0IsRUFBUXZCLEVBQUVDLE1BQU1DLFFBQVEsVUFDeEJzQixFQUFTRCxFQUFNSCxLQUFLLGNBQWNBLEtBQUssT0FDdkNLLEVBQVFGLEVBQU1ILEtBQUssVUFFdkJLLEVBQ0dDLFNBQ0FDLEtBQUszQixFQUFFd0IsRUFBTyxJQUFJSSxTQUNsQkMsT0FBTyxtQ0FJUjdCLEVBQUVLLFVBQVVDLEdBQUcsUUFBUyxlQUFnQixTQUFTUixHQUMvQzJCLEVBQU1LLGNBTWQsU0FBU0MsVUFDSS9CLEVBQUVLLFVBQVVlLEtBQUssbUJBQ3ZCWSxLQUFLLFNBQVNDLEVBQUdDLEdBQ3BCLElBQ0lDLEVBQWNELEVBQUtFLFVBRXZCLEtBSFcsR0FHUEQsRUFBWUUsUUFNZCxPQUFPSCxFQUxQLElBQUlJLEVBQVNILEVBQVlJLFVBQVUsRUFKMUIsSUFJcUMsTUFDOUNELEVBQU9FLFFBQVEsVUFBVyxLQUUxQk4sRUFBS0UsVUFBWUUsSUFPdkIsU0FBU0csYUFDUEMsTUFBTUMsTUFBTSxXQUNWLElBQUlDLEVBQVEsSUFBSUYsTUFBTUcsSUFDbEIsTUFDQSxDQUNFQyxPQUFRLENBQUMsVUFBVyxXQUNwQkMsS0FBTSxJQUVSLENBQ0VDLHNCQUF1QixrQkFHM0JDLEVBQXNCUCxNQUFNUSxzQkFBc0JDLFlBQ2hELG1GQUVKQyx1QkFBeUIsSUFBSVYsTUFBTVcsVUFDakMsQ0FBQyxVQUFXLFdBQ1osQ0FDRUMsWUFBYSxrQkFFZixDQUNFQyxXQUFZLDJCQUNaQyxjQUFlLG9CQUlmQyxrQkFBbUJSLElBSXZCTCxFQUFNYyxXQUFXQyxJQUFJUCwwQkE5SHpCcEQsRUFBRUssVUFBVXNDLE1BQU0sV0FDaEJ2QyxXQUNBRyxhQUNBZSxZQUNBUyxVQUNBVSxhQUNBekIsZ0JBQ0FFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICBzaG93SGlkZSgpO1xyXG4gIG1haW5zbGlkZXIoKTtcclxuICBvcGVuaW1hZ2UoKTtcclxuICB0ZXh0Q3V0KCk7XHJcbiAgbWFwc0N1c3RvbSgpO1xyXG4gIHVzZWZ1bGxzbGlkZXIoKTtcclxuICBzaG93QnV0dCgpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNob3dIaWRlQmxvY2soZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgdmFyIGJsb2NrID0gJCh0aGlzKS5jbG9zZXN0KFwiLnNoLWJsb2NrXCIpO1xyXG4gIGJsb2NrLnRvZ2dsZUNsYXNzKFwic2gtaGlkZGVuXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93SGlkZSgpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnNoLWJ0biwgLnJ5bG9cIiwgc2hvd0hpZGVCbG9jayk7XHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jbHMtYnRuXCIsIHNob3dIaWRlQmxvY2spO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWluc2xpZGVyKCkge1xyXG4gICQoXCIubWFpbnNsaWRlclwiKS5vd2xDYXJvdXNlbCh7XHJcbiAgICBsb29wOiB0cnVlLFxyXG4gICAgaXRlbXM6IDEsXHJcbiAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICBtb3VzZURyYWc6IGZhbHNlLFxyXG4gICAgbmF2OiB0cnVlLFxyXG4gICAgZG90czogZmFsc2UsXHJcbiAgICBuYXZUZXh0OiBmYWxzZVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1c2VmdWxsc2xpZGVyKCkge1xyXG4gICQoXCIudXNlZnVsbHNsaWRlclwiKS5vd2xDYXJvdXNlbCh7XHJcbiAgICBsb29wOiBmYWxzZSxcclxuICAgIGl0ZW1zOiAyLFxyXG4gICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgbW91c2VEcmFnOiB0cnVlLFxyXG4gICAgbmF2OiB0cnVlLFxyXG4gICAgZG90czogdHJ1ZSxcclxuICAgIG5hdlRleHQ6IGZhbHNlLFxyXG4gICAgc2xpZGVCeTogMlxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93QnV0dCgpIHtcclxuICB2YXIgaGVpZ2h0VGV4dCA9IDEzMjtcclxuICB2YXIgZGVmYXVsdENsYXNzID0gJChkb2N1bWVudCkuZmluZChcIi5kaXNjdXNzaW9ucy1pdGVtLnNoLWJsb2NrLnNoLWhpZGRlblwiKTtcclxuICB2YXIgdGV4dCA9ICQoZG9jdW1lbnQpLmZpbmQoXCIuZGlzY3Vzc2lvbnMtaXRlbS5zaC1ibG9jay5zaC1oaWRkZW4gcFwiKTtcclxuXHJcbiAgaWYgKGhlaWdodFRleHQgPCB0ZXh0LmhlaWdodCgpKSB7XHJcbiAgICBkZWZhdWx0Q2xhc3MudG9nZ2xlQ2xhc3MoXCJzaG93LWJ1dHRvblwiKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5pbWFnZSgpIHtcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLm9wZW4taW1nXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB2YXIgYmxvY2sgPSAkKHRoaXMpLmNsb3Nlc3QoXCIuYmxvY2tcIik7XHJcbiAgICB2YXIgYWN0aXZlID0gYmxvY2suZmluZChcImRpdi5hY3RpdmVcIikuZmluZChcImltZ1wiKTtcclxuICAgIHZhciBwb3B1cCA9IGJsb2NrLmZpbmQoXCIucG9wdXBcIik7XHJcblxyXG4gICAgcG9wdXBcclxuICAgICAgLmZhZGVJbigpXHJcbiAgICAgIC5odG1sKCQoYWN0aXZlWzBdKS5jbG9uZSgpKVxyXG4gICAgICAuYXBwZW5kKCc8ZGl2IGNsYXNzPVwicG9wdXAtY2xvc2VcIj48L2Rpdj4nKTtcclxuICAgIGNsb3NlUG9wdXAoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnBvcHVwLWNsb3NlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBwb3B1cC5mYWRlT3V0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXh0Q3V0KCkge1xyXG4gIHZhciB0ZXh0ID0gJChkb2N1bWVudCkuZmluZChcIi5uZXdzLXByZXZpZXcgcFwiKTtcclxuICB0ZXh0LmVhY2goZnVuY3Rpb24oaSwgaXRlbSkge1xyXG4gICAgdmFyIHNpemUgPSA5ODtcclxuICAgIHZhciBlbGVtZW50VGV4dCA9IGl0ZW0uaW5uZXJUZXh0O1xyXG4gICAgLy9jb25zb2xlLmxvZyhlbGVtZW50VGV4dC5sZW5ndGgpO1xyXG4gICAgaWYgKGVsZW1lbnRUZXh0Lmxlbmd0aCA+IHNpemUpIHtcclxuICAgICAgdmFyIHJlc3VsdCA9IGVsZW1lbnRUZXh0LnN1YnN0cmluZygwLCBzaXplKSArIFwiLi4uXCI7XHJcbiAgICAgIHJlc3VsdC5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKTtcclxuICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICBpdGVtLmlubmVyVGV4dCA9IHJlc3VsdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBzQ3VzdG9tKCkge1xyXG4gIHltYXBzLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcclxuICAgICAgICBcIm1hcFwiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNlbnRlcjogWzU2Ljg1MjA3MSwgNTMuMjEzNDU4XSxcclxuICAgICAgICAgIHpvb206IDE3XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzZWFyY2hDb250cm9sUHJvdmlkZXI6IFwieWFuZGV4I3NlYXJjaFwiXHJcbiAgICAgICAgfVxyXG4gICAgICApLFxyXG4gICAgICBNeUljb25Db250ZW50TGF5b3V0ID0geW1hcHMudGVtcGxhdGVMYXlvdXRGYWN0b3J5LmNyZWF0ZUNsYXNzKFxyXG4gICAgICAgICc8ZGl2IHN0eWxlPVwiY29sb3I6ICNGRkZGRkY7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPiRbcHJvcGVydGllcy5pY29uQ29udGVudF08L2Rpdj4nXHJcbiAgICAgICk7XHJcbiAgICBteVBsYWNlbWFya1dpdGhDb250ZW50ID0gbmV3IHltYXBzLlBsYWNlbWFyayhcclxuICAgICAgWzU2Ljg1MjA3MSwgNTMuMjEzNDU4XSxcclxuICAgICAge1xyXG4gICAgICAgIGhpbnRDb250ZW50OiBcItCb0LjRhdCy0LjQvdGG0LXQstCwLCA0NlwiXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpY29uTGF5b3V0OiBcImRlZmF1bHQjaW1hZ2VXaXRoQ29udGVudFwiLFxyXG4gICAgICAgIGljb25JbWFnZUhyZWY6IFwiLi9pbWFnZXMvaWNvbi5wbmdcIixcclxuICAgICAgICAvLyBpY29uSW1hZ2VTaXplOiBbNDgsIDcwXSxcclxuICAgICAgICAvLyBpY29uSW1hZ2VPZmZzZXQ6IFstMjQsIC02NF0sXHJcbiAgICAgICAgLy8gaWNvbkNvbnRlbnRPZmZzZXQ6IFsxNSwgMTVdLFxyXG4gICAgICAgIGljb25Db250ZW50TGF5b3V0OiBNeUljb25Db250ZW50TGF5b3V0XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQbGFjZW1hcmtXaXRoQ29udGVudCk7XHJcbiAgfSk7XHJcbn1cclxuIl19
