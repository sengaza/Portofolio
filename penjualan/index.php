<?php
include 'koneksi.php';
$menu = 'home';
include 'header.php';

if(isset($_GET['cari'])){
    $c = $_GET['cari'];
    $cek = mysqli_query($connect, "SELECT * FROM barang WHERE nama LIKE '%$c%' ");
} else {
    $cek = mysqli_query($connect, "SELECT * FROM barang");
}
echo '<div class="row">';
while($hasil = mysqli_fetch_assoc($cek)){
    $id = $hasil['id'];
    $n = $hasil['nama'];
    $j = $hasil['jumlah'];
    $h = $hasil['harga'];
    $t = $hasil['terjual'];
    echo "<div class='col-sm-4'>
    <div class='item border p-2 mb-3 bg-white'>
        <img src='image/$id.jpg'/>
        <a href='detail.php?id=$id'><h5>$n</h5></a>
        <span>Stock: $j</span><br>
        <span>Harga: Rp $h</span><br>
        <span>Terjual: $t</span>
    </div>
    </div>";
}
echo '</div>';
include 'footer.php';
?>

