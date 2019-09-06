<?php
include "koneksi.php";
$menu = 'login';
include "header.php";
$error = '';
if(isset($_POST['login'])) {
	$un = $_POST['un'];
	$p = $_POST['pass'];
	$cek = mysqli_query($connect, "SELECT * FROM user WHERE username='$un' AND password='$p'");
	if(mysqli_num_rows($cek)) {
        $user = mysqli_fetch_assoc($cek);
        $_SESSION['role'] = $user['role'];
		header('location: admin.php');
	} else {
		$error = '<b>Username atau Password salah!</b><br>';
	}
}
//echo $_SESSION['role'].'!';
?>
<style>
table{
	border:1px solid black;
	background-color:grey;
	margin:auto;
	padding:20px;
}
p{
	text-align:center;
	color:white;
}
</style>
<form action="login.php" method="post">
<div  class="row">
    <div class="form-group col-sm-6 m-auto">
        <label>Username</label>
        <input class="form-control" type="text" name="un">
        <label>Password</label>
		<input class="form-control" type="text" name="pass"><br>
		<button class="btn btn-primary" type="submit" name="login">Login</button>
		<a href="index.php" class="btn btn-primary">Batal</a>
		<a href="daftar.php" class="btn btn-primary">Daftar</a>
	</div>
</div>

</form>
<!-- <form action="login.php" method="post">
<table>
	<tr>
		<td colspan="3"><P><?php echo $error ?></P></td>
	</tr>
	<tr>
		<td>Username</td>
		<td>:</td>
		<td><input type="text" name="un"></td>
	</tr>
	<tr>
		<td>Password</td>
		<td>:</td>
		<td><input type="password" name="pass"></td>
	</tr>
	<tr>
		<td><input type="submit" name="login" value="Masuk"></td>
		<td colspan="2"><input type="submit" value="Batal"></td>
	</tr>
	<tr>
		<td color="black"><a href="daftar.php">Daftar</a></td>
	</tr>
</table>
</form> -->
<?php
include "footer.php";
?>