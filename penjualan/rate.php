<?php
include 'koneksi.php';

if(isset($_GET['id']) && isset($_GET['nilai'])) {
    $id = $_GET['id'];
    $n = $_GET['nilai'];
    mysqli_query($connect, "INSERT INTO rating SET id_barang='$id', nilai='$n'");
    $sql = mysqli_query($connect, "SELECT nilai from rating where id_barang='$id'");
    $i = 0;
    while($rate=mysqli_fetch_assoc($sql)){
        $r += $rate['nilai'];
        $i++;
    }
    $rate = round($r/$i,3);
    mysqli_query($connect, "UPDATE barang SET rating ='$rate' where id='$id'");
    header('location: detail.php?id='.$id);
}
?>