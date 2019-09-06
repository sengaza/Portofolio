<?php
include 'koneksi.php';
include 'header.php';

//if($_SESSION['role']=='admin'){
//$id =$_GET['id'];
if($_SESSION['role']=='admin'){

if(isset($_GET['status'])){
    $id = $_GET['id'];
    $krj = mysqli_query($connect, "SELECT * FROM keranjang WHERE id_bayar='$id'");
    while($kranjang = mysqli_fetch_assoc($krj)) {
        $j = $kranjang['jumlah'];
        $idb = $kranjang['id_barang'];
        mysqli_query($connect,"UPDATE barang SET jumlah=jumlah-$j, terjual=terjual+$j WHERE id='$idb'");
    }
    mysqli_query($connect, "UPDATE pembayaran SET status='lunas' WHERE id='$id'");
    header('location: admin.php');
}

?>
    <h1>Tabel Barang</h1>
    <table width="100%" class="table table-hover bg-light table-bordered">
    <thead class="bg-primary">
        <tr> <th>No</th> <th>Nama</th> <th>Jumlah</th> <th>Harga</th> <th colspan="2">CRUD</th></tr>
    </thead>
    <?php
    $cek = mysqli_query($connect, "SELECT * FROM barang");
    $i = 1;
    while($hasil = mysqli_fetch_assoc($cek)){
        $id = $hasil['id'];
        $n = $hasil['nama'];
        $j = $hasil['jumlah'];
        $h = $hasil['harga'];
        echo "<tr> <td>$i</td> <td>$n</td> <td>$j</td> <td>$h</td>
        <td><button class='btn btn-primary' onclick='showEdit($id,\"$n\",\"$j\",\"$h\")'>Edit</button></td>
        <td><button class='btn btn-primary' onclick='showDelete($id,\"barang\")'>Delete</button></td>
        </tr>";
        $i++;
    }
    ?>
    </table><br><br>
    <h1>Tabel Suplier</h1>
    <table width="100%" class="table table-hover bg-light table-bordered">
    <thead class="bg-primary">        
        <tr> <th>No</th> <th>Nama</th> <th>Alamat</th><th>Barang</th> <th>Jumlah</th><th>Harga</th><th>Telp</th> <th>CRUD</th></tr>
    </thead>
    <?php
    $cek = mysqli_query($connect, "SELECT * FROM suplier");
    $i = 1;
    while($hasil = mysqli_fetch_assoc($cek)){
        $id = $hasil['id'];
        $n = $hasil['nama'];
        $al = $hasil['alamat'];
        $b = $hasil['barang'];
        $j = $hasil['jumlah'];
        $h = $hasil['harga'];
        $tlp = $hasil['tlp'];
        echo "<tr> <td>$i</td> <td>$n</td> <td>$al</td> <td>$b</td> <td>$j</td> <td>$h</td><td>$tlp</td>
        <td><button class='btn btn-primary' onclick='showDelete($id,\"suplier\")'>Delete</button></td></tr>";               
        $i++;
    }
    ?>
    </table><br><br>
    <a href="tambah.php"><button type="button" class='btn btn-primary'>Tambah</button></a>
    <h1>Tabel Pembayaran</h1>
    <table width="100%" class="table table-hover bg-light table-bordered">
    <thead class="bg-primary">                
        <tr> <th>No</th> <th>Nama</th> <th>Alamat</th> <th>No.Hp</th><th>Total</th> <th>Status</th></tr>
    </thead>
    <?php
    $cek = mysqli_query($connect, "SELECT * FROM pembayaran");
    $i = 1;
    while($hasil = mysqli_fetch_assoc($cek)){
        $id = $hasil['id'];
        $np = $hasil['nama'];
        $al = $hasil['alamat'];
        $hp = $hasil['hp'];
        $t = $hasil['total'];   
        echo "<tr> <td>$i</td> <td>$np</td> <td>$al</td> <td>$hp</td><td>$t</td>";
        if(empty($hasil['status'])){
        echo "<td><a href='admin.php?status=lunas&id=$id'><button class='btn btn-primary'>Lunas</button></a> 
        <button class='btn btn-primary' onclick='showDelete($id,\"pembayaran\")'>Delete</button></td>";
        } else {
            echo "<td>Sudah Bayar</td>";
        }
        echo "</tr>";
        $i++;
    }
    ?>
    </table><br><br>
    <a href="logut.php"><input class="btn btn-primary" type="button" name="logout" value="Log Out"></a>  
<!-- Form Hapus -->
    <form action="hapus.php" method="post" class="position-fixed form-popup" style="display:none" id="formHapus">
        
        <div class="card text-center bg-white mx-auto mt-5" style="width: 300px">
            <div class="card-body ">
                <h5 class="card-title">Apakah Anda yakin?</h5>
                <p class="card-text">Anda akan menghapus barang 'Sepatu'?</p>
                <input type="hidden" name="id" id="idHapus">
                <input type="hidden" name="tabel" id="tabelHapus">
                <input type="submit" name="hapus" value="Hapus" class="btn btn-primary">
                <input type="button" name="batal" value="Batal" class="btn btn-secondary" onclick="hideDelete()">
            </div>
        </div>

    </form>
    <!-- Form Edit -->
    <form action="edit.php" method="post" class="position-fixed form-popup" style="display:none" id="formEdit"> 
    <div class="card text-center bg-white mx-auto mt-5" style="width: 300px">
        <div class="card-body ">
            <label>Nama</label>
            <input type="hidden" name="id" id="idedit">        
            <input class="form-control" type="text" name="enama" id="enama">
            <label>Jumlah</label>
            <input class="form-control" type="text" name="ejumlah" id="ejumlah">
            <label>Harga</label>
            <input class="form-control" type="text" name="eharga" id="eharga"><br>
            <input type="submit" name="edit" value="Edit" class="btn btn-primary">
            <input type="button" name="batal" value="Batal" class="btn btn-secondary" onclick="hideEdit()">
        </div>
    </div>
    </form>
  <script>
  function showDelete(id,tabel) {      
    document.getElementById('formHapus').style.display='block';
      document.getElementById('idHapus').value=id;
      document.getElementById('tabelHapus').value=tabel;
  }
  function hideDelete(){
    document.getElementById('formHapus').style.display='none';      
  }
  function showEdit(id,nama,jumlah,harga) {      
    document.getElementById('formEdit').style.display='block';
    document.getElementById('idedit').value=id;
      document.getElementById('enama').value=nama;
      document.getElementById('ejumlah').value=jumlah;
      document.getElementById('eharga').value=harga;
  }
  function hideEdit(){
    document.getElementById('formEdit').style.display='none';      
  }
  </script>
</body>
</html>
<?php

include "footer.php";
} elseif($_SESSION['role']=='anggota') {
    header('Location: index.php');
} else {
    header('location: login.php');
}
?>