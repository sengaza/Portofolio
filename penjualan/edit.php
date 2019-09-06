<?php
include 'koneksi.php';
include 'header.php';

if($_SESSION['role']=='admin'){

if(isset($_POST['edit'])){
    $id =$_POST['id'];
    $nb = $_POST['enama'];
    $s = $_POST['ejumlah'];
    $hj = $_POST['eharga'];

    mysqli_query($connect, "UPDATE barang SET nama='$nb', jumlah='$s', harga='$hj' WHERE id='$id'");
    header("Location: admin.php");
}
?>
<?php
} else {
    echo "Silakan Login Terlebih Dahulu";
}
?>