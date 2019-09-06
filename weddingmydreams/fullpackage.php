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
<body>

<body onload="sticky(); addEvent(); showSlides();">
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

       
    <div id="content" class="col-m-6">
            <img src="image/fullpackage.jpg">
            <div class="isi">
                <h1>The Full package</h1>
                <p>From A to Z and from dat of contact till 12 midnight on the night of your wedding,<br>
                think of us as your Fairy Godmother!<br>
                We will waive our magic wand, helping you from sourcing of location to the after-party.<br>
                Let us find the most talented vendors to fit your budget, personality and aesthetics. <br>
                Be it tradisional or modern, intimate or lavish, <br>
                we are here to hold your hand every step of the way without fuss or drama.
                </p>
            </div>

    </div>
       <br><br>     

        <div id="footer" class="col-12 col-m-12">
            <p>Copyright&copy; www.myweddingdreams.com</p>
        </div>
    </div>

</body>
</html>