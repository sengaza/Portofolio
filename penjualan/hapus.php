<?php
include 'koneksi.php';
$id = $_POST['id'];
$tabel = $_POST['tabel'];
if(isset($_POST['hapus'])){
    mysqli_query($connect, "DELETE FROM $tabel WHERE id='$id'");
    header("Location: admin.php");
}
?>

