<?php
include 'koneksi.php';
include 'header.php';


if(isset($_POST['bayar'])) {
    $n = $_POST['nama'];
    $a = $_POST['alamat'];
    $h = $_POST['hp'];
    $ker =mysqli_fetch_assoc(mysqli_query($connect,"SELECT SUM(harga) AS harga_total FROM keranjang WHERE id_bayar='0'"));
    $total = $ker['harga_total'];
    mysqli_query($connect,"INSERT INTO pembayaran SET nama='$n', alamat='$a', hp='$h', total='$total'");
    $id = mysqli_insert_id($connect);
    mysqli_query($connect,"UPDATE keranjang SET id_bayar='$id' WHERE id_bayar='0'");
    header('location:pembayaran.php?id='.$id);
}
if(isset($_GET['id'])) {
    $id = $_GET['id'];
    echo "<h2>ID Pembayaran: #$id</h2>
    <table border=1 width=100%>
        <tr> <th>No</th> <th>Nama</th> <th>Jumlah</th> <th>Keterangan</th> <th>Harga</th></tr>
    ";
    $sql=mysqli_query($connect,"SELECT keranjang.*, barang.nama AS nama_b, barang.harga AS harga_b FROM keranjang,barang WHERE keranjang.id_barang=barang.id AND id_bayar='$id'");
    $i=1;
    $total = 0;
    while($keranjang = mysqli_fetch_assoc($sql)) {
        $n = $keranjang['nama_b'];
        $j = $keranjang['jumlah'];
        $k = $keranjang['keterangan'];
        $h = $keranjang['harga_b']*$j;
        $total += $h;
        echo "<tr> <td>$i</td> <td>$n</td> <td>$j</td> <td>$k</td> <td>Rp $h</td> </tr>";
        $i++;
    }
    echo "<tr> <td colspan=4>Total</td><td>Rp $total</td></tr>
    </table><p>1. Lakukan pembayaran <b>Rp $total</b> ke No. Rek 122225739002 (Bank BCA A.n. Sampurna)<br>
    2. Masukan berita <b>ID-$id</b><br>
    3. Lakukan konfirmasi, kirim ke Whatsapp 089611726628 format <b>Konfirmasi ID-$id A.n Pengirim / Bank
    </p>";
} else {
    if($all_k==0) {
        echo '<p>Keranjang kosong. Tidak bisa melakukan pembayaran';
    } else {
    }
}
include 'footer.php';

?>