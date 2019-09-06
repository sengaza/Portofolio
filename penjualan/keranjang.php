<?php
include 'koneksi.php';
$menu = 'keranjang';
include 'header.php';
if(isset($_GET['delete'])) {
    $id=$_GET['delete'];
    mysqli_query($connect,"DELETE FROM keranjang WHERE id='$id'");
    header('location: keranjang.php');
}
?>
<table class="table table-hover bg-light table-bordered" width=100%>
<thead class="bg-primary text-white"> 
    <tr> <th>No</th> <th>Nama</th> <th>Jumlah</th> <th>Keterangan</th> <th>Harga</th><th>Batal</th></tr>
</thead>
<?php
    $sql=mysqli_query($connect,"SELECT keranjang.*, barang.nama AS nama_b, barang.harga AS harga_b FROM keranjang,barang WHERE keranjang.id_barang=barang.id AND id_bayar='0'");
    if(mysqli_num_rows($sql)) {
        $i=1;
        $total = 0;
        while($keranjang = mysqli_fetch_assoc($sql)) {
            $id = $keranjang['id'];
            $n = $keranjang['nama_b'];
            $j = $keranjang['jumlah'];
            $k = $keranjang['keterangan'];
            $h = $keranjang['harga_b']*$j;
            $total +=$h;
            echo "<tr> <td>$i</td> <td>$n</td> <td>$j</td> <td>".htmlentities($k)."</td> <td>Rp $h</td> 
            <td>
                <a href='?delete=$id'><button class='btn btn-secondary'>Batal</button></a>
            </td>
            </tr>";
            $i++;
        }
        echo '
        <tr> <td colspan=4>Total</td><td colspan="2">Rp '.$total.'</td></tr>';
    } else {
        echo '<tr><td colspan="6">Belum ada barang</td></tr>';
    }
    echo '</table>
    <br><button class="btn btn-primary" onclick="showK()">Bayar</button>';

if(isset($_POST['beli'])){
    $id = $_POST['id'];
    $j = $_POST['jumlah'];
    $k = $_POST['ket'];
    $get = mysqli_fetch_assoc(mysqli_query($connect,"SELECT harga FROM barang WHERE id='$id'"));
    $get_harga = $get['harga'];
    $h = $j*$get_harga;
    mysqli_query($connect,"INSERT INTO keranjang SET id_barang='$id', jumlah='$j', harga='$h', keterangan='$k'");
    header('location: detail.php?id='.$id);
}

include "footer.php";
?>
<form action="pembayaran.php" method="post" class="position-fixed form-popup" style="display:none" id="formBayar"> 
    <div class="card text-center bg-white mx-auto mt-5" style="width: 300px">
        <div class="card-body ">
            <label>Nama </label> <span class="text-secondary"></span>
            <input type="hidden" name="id" value="<?php echo $id;?>">        
            <input class="form-control" type="text" name="nama" >
            <label>Alamat</label>
            <input class="form-control" type="text" name="alamat" >
            <label>No Hp</label>
            <input class="form-control" type="text" name="hp" ><br>
            <input type="submit" name="bayar" value="Bayar" class="btn btn-primary">
            <input type="button" name="batal" value="Kembali" class="btn btn-secondary" onclick="hideB()">
        </div>
    </div>
</form>
<script>
function showK() {      
    document.getElementById('formBayar').style.display='block';
  }
  function hideB(){
    document.getElementById('formBayar').style.display='none';      
  }
</script>