<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Wedding Dreams</title>
    <link rel="stylesheet" href="CSS/index.css">
    <script src="JS/index.js"></script>
</head>
<body onload="sticky(); addEvent(); sliderNew.showSlides(sliderNew.getSlideIndex());">
    <div id="container">
        <div id="header" >
            <a href="index.php"> My Wedding Dreams </a></div>
        <div id="tmenu">
            <ul id="tnavbar" class="hidden">
                <li class="show" onclick="show()"><a href="#">&#9776;</a></li>
                <li class="col-3 col-m-3 "><a href="about.php">ABOUT</a></li>
                <li class="col-3 col-m-3"><a href="galeri.php">GALERI</a></li>
                <li class="dropdown col-3 col-m-3">
                    <a href="#" onclick="show1()">SERVICES</a>
                    <div id="dropdown-content">
                        <a href="fullpackage.php">Full Package </a>
                        <a href="eventstyling.php">Event Styling</a>
                        <a href="thedayofcoordination.php">The Day Of Coordination</a>
                    </div>
                </li>
                <li class="col-3 col-m-3"><a href="contact.php">CONTACT</a></li>
            </ul>
        </div>

        <div id="content" class="slideshow-container col-6 col-m-9">
            <div class="myGaleri fade">
                <img src="image/prewed1.jpg" alt="">
            </div>

            <div class="myGaleri fade">
                <img src="image/prewed2.jpg" alt="">
            </div>
            
            <div class="myGaleri fade">
                <img src="image/prewed3.jpg" alt="">
            </div>
            
            <div class="myGaleri fade">
               <img src="image/prewed4.jpg" alt="">
            </div>
            
            <div class="myGaleri fade">
                 <img src="image/prewed7.jpg" alt="">
            </div>
            
            <!-- <div class="myGaleri fade">
                <img src="image/prewed9.jpg" alt="">
            </div> -->
          
            <a class="prev" onclick="sliderNew.plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="sliderNew.plusSlides(1)">&#10095;</a>

        </div>

        <div style="text-align:center">
            <span class="dot" onclick="slideNew.currentSlide(1)"></span>
            <span class="dot" onclick="slideNew.currentSlide(2)"></span>
            <span class="dot" onclick="slideNew.currentSlide(3)"></span>
            <span class="dot" onclick="slideNew.currentSlide(4)"></span>
            <span class="dot" onclick="slideNew.currentSlide(5)"></span>
            <!-- <span class="dot" onclick="slideNew.currentSlide(6)"></span> -->
        </div>

		<div id="footer" class="col-12 col-m-12">
            <p>Copyright&copy; www.myweddingdreams.com</p>
        </div>
    </div>
</body>
</html>