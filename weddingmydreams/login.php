<?php
include "koneksi.php";
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



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    table{
        border:1px solid black;
        margin:auto;
        padding:20px;
        background-color: grey;
    }
    </style>
</head>
<body>
    <form action="login.php" method="post">
    <table>
        <tr>
            <td colspan='3'><?php echo $error?></td>
            
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
            <td><input type="submit" name="login" value="Login"></td>
            <td colspan="2"><a href="index.php"><button type="button">Cancel</button></a></td>
        </tr>
    </table>
    </form>
</body>
</html>