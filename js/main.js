/* JS Document */
// -----------------------------------------------------------//

$(document).ready(function()
{
	"use strict";



	// site menu js start

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	// ///////////////////////////////////////////

	// var windowScrolled = function() {
	// 	$(window).scroll(function() {
	// 		var $w = $(this), st = $w.scrollTop(), navbar = $('.js-site-navbar') ;

	// 		if ( st > 100 ) {
	// 			navbar.addClass('scrolled');
	// 		} else {
	// 			navbar.removeClass('scrolled');
	// 		}
	// 	})
	// }
	// windowScrolled();


	var windowScrolled = function() {
		var currentScroll = 0
		$(window).scroll(function() {
			var navbar = $('.js-site-navbar');
			var nextScroll = $(this).scrollTop();

			if ( nextScroll > 100 ) {
				navbar.addClass('scrolled');
			} else {
				navbar.removeClass('scrolled');
			}

			if ( nextScroll > currentScroll ) {
				navbar.addClass('scroll-bottom');
				navbar.addClass('scroll-static');
			} else {
				navbar.removeClass('scroll-bottom');
			}
			if ( nextScroll === 0  ) {
				navbar.removeClass('scroll-static');
			}
			currentScroll = nextScroll;
		})
	}
	windowScrolled();
	

	// site menu js end

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

















// ////////////////////////////////////////////////////////////////
	// filter
	$(function(){
		// init isotope with default filter
		var $grid = $(".isotope").isotope({
			itemSelector: ".project_type",
			layoutMode: "fitRows",
			filter: ".service"   // ✅ show only "service" items on load
		});

		// filtering on click
		$(".filtering").on("click", "span", function () {
			var filterValue = $(this).attr("data-filter") || "*"; // fallback to all
			$grid.isotope({ filter: filterValue });

			$(this).addClass("active").siblings().removeClass("active");
		});
	});




// ////////////////////////////////////////////////////////////////
// JavaScript for parallax image
    const parallaxImages = document.querySelectorAll(".parallax-img");

    parallaxImages.forEach(img => {
      let currentY = 0;
      let targetY = 0;

      const update = () => {
        // Lerp toward target
        currentY += (targetY - currentY) * 0.1;
        img.style.transform = `translateY(${currentY}%)`;
        requestAnimationFrame(update);
      };

      const onScroll = () => {
        const container = img.parentElement;
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          targetY = scrollProgress * 20 - 10; // from -10% to +10%
        }
      };

      update(); // Start animation loop
      window.addEventListener("scroll", onScroll);
    });



// ////////////////////////////////////////////////////////////////
	// slide

	if ($("#slided_work").length) {
        $("#slided_work").slick({
            infinite: true,
            arrows: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 8000, // Time for slide change
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
			draggable: true,       // 🖱 Enable mouse dragging
        	swipe: true,           // 📱 Enable touch swipe
        	touchMove: true        // 📱 Enable touch move
            // variableWidth: true // Allows each slide to have its own width
        });
    }


	$(document).ready(function(){
        $('.edu_slide').slick({
			infinite: true,
			arrows: true,
			dots: false,
			autoplay: true,
			autoplaySpeed: 8000,
			speed: 1000,
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '60px',
			draggable: true,       // 🖱 Enable mouse dragging
			swipe: true,           // 📱 Enable touch swipe
			touchMove: true,       // 📱 Enable touch move
			pauseOnFocus: true,    // Prevent pause on click/focus
			pauseOnHover: true,
			// cssEase: 'linear',
			// variableWidth: true,
			// rtl: true,          // 👉 Move right-to-left and need -> <div class="edu_slide" dir="rtl">
			responsive: [
				{
				breakpoint: 991.5,
					settings: {
						slidesToShow: 1,
						centerMode: false,
						centerPadding: '40px'
					}
				}
			]
        });

        $('.edu_slide').on('mouseenter', function(){
            $(this).slick('slickPause');
        }).on('mouseleave', function(){
            $(this).slick('slickPlay');
        });
    });



// ////////////////////////////////////////////////////////////////
	// fade start

	function scrollBanner() {
        $(document).on('scroll', function(){
          var scrollPos = $(this).scrollTop();
            $('.parallax-fade-top').css({
              'top' : (scrollPos/2)+'px',
              'opacity' : 1-(scrollPos/700)
            });
            // $('.parallax-00').css({
            //   'top' : (scrollPos/-3.5)+'px'
            // });
            // $('.parallax-01').css({
            //   'top' : (scrollPos/-2.8)+'px'
            // });
            // $('.parallax-top-shadow').css({
            //   'top' : (scrollPos/-2)+'px'
            // });
          });    
        }
    scrollBanner();
	// fade end


// ////////////////////////////////////////////////////////////////
	// fancybox start

	$('.fancybox').on('click', function() {
	  var visibleLinks = $('.fancybox');

	  $.fancybox.open( visibleLinks, {}, visibleLinks.index( this ) );

	  return false;
	});
	// fancybox end




	// onepage scroll start
	// $(document).ready(function(){
	//   // Add smooth scrolling to all links
	//   $("a").on('click', function(event) {

	//     // Make sure this.hash has a value before overriding default behavior
	//     if (this.hash !== "") {
	//       // Prevent default anchor click behavior
	//       event.preventDefault();

	//       // Store hash
	//       var hash = this.hash;

	//       // Using jQuery's animate() method to add smooth page scroll
	//       // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	//       $('html, body').animate({
	//         scrollTop: $(hash).offset().top
	//       }, 300, function(){

	//         // Add hash (#) to URL when done scrolling (default click behavior)
	//         window.location.hash = hash;
	//       });
	//     } // End if
	//   });
	// });

	// onepage scroll end



// ///////////////////////////////////////////////////////////////
	// movetop start

	$(function() {

		$('.move').click(function () {
	        $('html, body').animate({
	            scrollTop: '0px'
	        },
	        500);
	        return false;
	    });
 	});
 	// movetop end



// //////////////////////////////////////////////////////////////////

if (navigator.userAgent.indexOf('Firefox') > -1) {
    document.body.classList.add('firefox');
}
if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {
document.body.classList.add('safari');
}


});

