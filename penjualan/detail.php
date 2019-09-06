<?php
include 'koneksi.php';
include 'header.php';

$id = $_GET['id'];
$hasil = mysqli_fetch_assoc(mysqli_query($connect,"SELECT * FROM barang WHERE id='$id'"));
if($hasil['nama']) {
    $id = $hasil['id'];
    $n = $hasil['nama'];
    $j = $hasil['jumlah'];
    $h = $hasil['harga'];
    $t = $hasil['terjual'];
    $k = $hasil['keterangan'];

    echo "
    <div class='card text-center'>
        <div class='card-header'>
            <img src='image/$id.jpg'/>
        </div>
        <div class='card-body'>        
            <h5 class='card-title'>$n</h5>
            <p class='card-text'>$k
                <span>Stock: $j</span><br>
                <span>Rp $h</span><br>
                <span>Terjual: $t</span>
            </p>
        </div>
        <div class='card-footer'>
            <button class='btn btn-primary' onclick='showK()'>Beli Sekarang</button>
        </div>
    </div>";
?>
<!-- Form Edit -->
<form action="keranjang.php" method="post" class="position-fixed form-popup" style="display:none" id="formKeranjang"> 
    <div class="card text-center bg-white mx-auto mt-5" style="width: 300px">
        <div class="card-body ">
            <label>Jumlah </label> <span class="text-secondary">(Tersedia: <?php echo $j;?>)</span>
            <input type="hidden" name="id" value="<?php echo $id;?>">        
            <input class="form-control" type="text" name="jumlah" >
            <label>Keterangan</label>
            <input class="form-control" type="text" name="ket" ><br>
            <input type="submit" name="beli" value="Tambah Ke Kerangjang" class="btn btn-primary">
            <input type="button" name="batal" value="Kembali" class="btn btn-secondary" onclick="hideK()">
        </div>
    </div>
</form>
<script>
function showK() {      
    document.getElementById('formKeranjang').style.display='block';
  }
  function hideK(){
    document.getElementById('formKeranjang').style.display='none';      
  }
  </script>
<?php
}
include 'footer.php';
?>