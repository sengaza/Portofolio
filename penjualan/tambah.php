<?php
include 'koneksi.php';
include 'header.php';

if($_SESSION['role']=='admin'){

if(isset($_POST['tambah'])){
    $n = $_POST['nama'];
    $al = $_POST['alamat'];
    $b = $_POST['barang'];
    $j = $_POST['jumlah'];
    $h = $_POST['hj'];
    $tlp = $_POST['tlp'];
    $hj = $_POST['hj'];
    $k = $_POST['ket'];
    $image = $_FILES['image']['name']; // Nama Gambar

    mysqli_query($connect, "INSERT INTO suplier SET nama='$n',alamat='$al', barang='$b', jumlah='$j', harga='$h', tlp='$tlp'");
    mysqli_query($connect, "INSERT INTO barang SET nama='$b', jumlah='$j', harga='$hj', keterangan='$k'");
    $id_brg = mysqli_insert_id($connect);

    // Proses upload
    $tmp = $_FILES['image']['tmp_name'];
    $folder = 'image/';
    $gambarnya = $id_brg.'.jpg';
    if(move_uploaded_file($tmp, $folder.$gambarnya)) {

    } else {
        header("Location: index.php?error=Upload Gambar gagal");    
    }
    header("Location: index.php");


}
?>
<style>
    table{
	border:1px solid black;
	background-color:grey;
	margin:auto;
	padding:20px;
    }
</style>
<form action="tambah.php" method="post"  enctype="multipart/form-data">
<div  class="row">
    <div class="form-group col-sm-6">
        <label>Nama Suplier</label>
        <input class="form-control" type="text" name="nama">
    </div>
    <div class="form-group col-sm-6">
        <label>Alamat</label>
        <input class="form-control" type="text" name="alamat">
    </div>
    <div class="form-group col-sm-6">
        <label>Barang</label>
        <input class="form-control" type="text" name="barang">
    </div>
    <div class="form-group col-sm-6">
        <label>Jumlah</label>
        <input class="form-control" type="text" name="jumlah">
    </div>
    <div class="form-group col-sm-6">
        <label>Harga Suplier</label>
        <input class="form-control" type="text" name="hs"> 
    </div>
    <div class="form-group col-sm-6">
        <label>Tlp</label>
        <input class="form-control" type="text" name="tlp" >
    </div>
    <div class="form-group col-sm-6">
        <label>Harga Jual</label>
        <input class="form-control" type="text" name="hj"> 
    </div>
    <div class="form-group col-sm-6">
        <label>Keterang</label>
        <input class="form-control" type="text" name="ket">
    </div>
    <div class="form-group col-sm-6">
        <label>Gambar</label>
        <input class="form-control" type="file" name="image">
    </div>
</div>
        <button class="btn btn-primary" type="submit" name="tambah">Tambah</button>
        <a href="admin.php" class="btn btn-primary">Batal</a>
</form>

<?php
include "footer.php";
}else{
    header("Location: login.php");
}
?>