<?php
include 'koneksi.php';

// $id =$_GET['id'];
// if($_SESSION['role']=='admin');

if(isset($_POST['tambah'])){
    $n = $_POST['nama'];
    $email = $_POST['email'];
    $p = $_POST['pertanyaan'];
    $d = mysqli_query($connect, "INSERT INTO pertanyaan SET nama='$n', email='$email', pertanyaan='$p'");
    header("Location: index.php");
}

?>
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
       
        <div id="content" class="">
                <div id="isi">
                    <h1>About Us</h1>
                    <p>
                    At My Wedding Dream, fun and stylish celeberations are our passion. <br>
                    From Indonesia, Malaysia and Singapore,<br>
                    design and organize all kinds of events-weddings being our favorite! <br>
                    Planning a wedding or an event can be a hair-pulling experience especially if you are doing it from a far.
                    </p>
                    <br><br>
                   
                </div>
        </div>

        <div id="form" class="">
        <form action="contact.php" method="post" class="nama">
    
        
        <div class="Pertanyaan">
            <fieldset>
            <legend>Pertanyaan</legend>
            <label for="nama">Nama</label>
            <br>
            <input type="text" name="nama" id="nama" >
            <br><br>
            <label for="email">Email</label>
            <br>
            <input type="text" name="email" id="email" >
            <br>
            <br>
            <label for="alamat">Isi Pesan</label><br>
            <textarea name="pertanyaan" id="p" cols="100" rows="10" placeholder=""></textarea>
            <br><br>

        <div id="tombol">
            <a href="login.php"><button type="button">Log In</button></a>
            <button type="submit" name="tambah">Submit</button>
            <button type="reset">Reset</button>
        </div>
            </fieldset>
        </div>
        </form>
        </div>
     
        <div id="footer" class="col-12 col-m-12">
            <p>Copyright&copy; www.myweddingdreams.com</p>
        </div>
</div>
</body>
</html>