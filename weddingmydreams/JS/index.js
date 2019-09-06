// --------------UNTUK STICKY----------------
function sticky(){
	var tmenu = document.getElementById("tmenu");
	var sticky = tmenu.offsetTop;
	return window.onscroll = function(){
		if (window.pageYOffset >= sticky){
			tmenu.classList.add("sticky")
		} else {
			tmenu.classList.remove("sticky");
		}
	};
}

// --------------UNTUK SLIDE INDEX----------------

var t;
var showSlides = (function() {
	var slideIndex = 0;

		return function() {
			var i=0;
			var slides = document.getElementsByClassName("mySlides");
			var dots = document.getElementsByClassName("dot");
			while (i < slides.length){
				slides[i].style.display = "none";
				i++;
			}

			/* tampilan awal sudah tersedia, tp tidak bisa digeser*/
			i = 0;
			slideIndex++;
			if (slideIndex > slides.length){slideIndex = 1}
			while (i < dots.length){
				dots[i].className=dots[i].className.replace(" active","");
				i++;

			} /* tampilan kemudian bisa di slide*/
			slides[slideIndex-1].style.display="block";
			dots[slideIndex-1].className += " active";
			t=setTimeout(function(){showSlides()}, 3000);
			}
})();

function addEvent(){
	document.getElementById("content").addEventListener("mouseover", stop);
	document.getElementById("content").addEventListener("mouseleave", start);
}

function stop(){
	clearTimeout(t);
}

function start(){
	showSlides();
}


// --------------UNTUK DROPDOWN SLIDE IN/OUT----------------

function show(){
	var slideMenu = document.getElementById("tnavbar"); 
	var style = window.getComputedStyle(slideMenu);
	var display = style.getPropertyValue("height");
	var x = display;
	if(x == "40px"){
		slideMenu.classList.remove("slide-out");
		slideMenu.classList.add("slide-in");
				setTimeout(function(){
			slideMenu.style.height = "auto";
		}, 400);
	} else {
		slideMenu.classList.remove("slide-in");
		slideMenu.classList.add("slide-out");
		setTimeout(function(){
			slideMenu.style.height = "40px";
		}, 400);
	}

}

function show1(){
	var slideMenu = document.getElementById("dropdown-content"); 

	if (slideMenu.style.display == "block") {
		slideMenu.style.display = "none";
	} else {
		slideMenu.style.display = "block";
	}

}

// --------------UNTUK GALERI----------------
//var showSlides = slider();
var sliderNew = slider();
function slider(){
    var slideIndex = 1;

    return {
        getSlideIndex: function(){
            return slideIndex;
        },

        showSlides:function(n){
            var i = 0;
            var slides = document.getElementsByClassName("myGaleri");
            var dots = document.getElementsByClassName("dot");
            if (n > slides.length) {slideIndex = 1}
            if (n < 1){slideIndex = slides.length}
            while (i < slides.length){
                slides[i].style.display ="none";
                i++;
            }
            i = 0;
            while (i < dots.length){
                dots[i].className = dots[i].className.replace(" active", "");
                i++;
            }
            slides[slideIndex-1].style.display = "block";
            dots[slideIndex-1].className += " active";
        },
        plusSlides: function(n) {
            this.showSlides(slideIndex += n);
        },
        currentSlide: function(n) {
            this.showSlides(slideIndex = n);
        }
    }
}