<?php
include 'koneksi.php';


if($_SESSION['role']=='admin'){
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

        <div id="content" class="slideshow-container col-6 col-m-9" style="overflow:auto;width:100%">
        <table border="1" width="100%">
        <tr> <th>No</th> <th>Nama</th> <th>E-mail</th> <th>Pertanyaan</th> <th>Delete</th></tr>
        <?php
        $cek = mysqli_query($connect, "SELECT * FROM pertanyaan");
        $i = 1;
        while($hasil = mysqli_fetch_assoc($cek)){
            $id = $hasil['id'];
            $n = $hasil['nama'];
            $email = $hasil['email'];
            $p = $hasil['pertanyaan'];
            echo "<tr> <td>$i</td> <td>$n</td> <td>$email</td> <td>$p</td>
            <td><a href='delete.php?id=$id'><button>Delete</button></a></td></tr>";
            $i++;
        }
        ?>
        </table>
        <a href="logout.php"><input type="button" name="logout" value="Log Out"></a>
    </div>
    <div id="footer" class="col-12 col-m-12">
        <p>Copyright&copy; www.myweddingdreams.com</p>
    </div>
</body>
</html>
<?php
} elseif($_SESSION['role']=='pengguna') {
    header('Location: index.php');
} else {
    header('location: login.php');
}
?>