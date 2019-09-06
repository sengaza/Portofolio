<?php
include 'koneksi.php';
$id =$_GET['id'];
if($_SESSION['role']=='admin'){

if(isset($_POST['hapus'])){
    $d = mysqli_query($connect, "DELETE FROM pertanyaan WHERE id='$id'");
    header("Location: admin.php");
}

?>
<style>
    table{
        margin:auto;
        padding:20px;
        border:1px solid black;
    }
    
</style>
<form action="delete.php?id=<?php echo $id ?>" method="post">
    <table>
        <tr>
            <td colspan="2"><p>Apakah Anda Yakin?</p></td>
        </tr>
        <tr>
            <td><input type="submit" name="hapus" value="Hapus"></td>
            <td><input type="submit" name="batal" value="Batal"></td>
        </tr>
    </table>
</form>
<?php
} else {
    echo "Mohon untuk Login";
}
?>