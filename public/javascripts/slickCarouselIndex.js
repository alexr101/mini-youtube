//Settings for the carousel in the index page
//Slick-Carousel plugin used for this

$(document).on('ready', function () {
		
 	$('.multiple-items').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		lazyLoad: true,
		navigation: true,
		draggable: true,
		arrow: true,
		prevArrow:"<img class='a-left control-c prev slick-prev' src='../images/arrow-left.png'>",
		nextArrow:"<img class='a-right control-c next slick-next' src='../images/arrow-right.png'>",
		responsive: [
			{
				breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
		    },
		    {
				breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
		    },
		    {
				breakpoint: 650,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
		    },
		    {
				breakpoint: 430,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false
					}
		    },
 		],
	});
});