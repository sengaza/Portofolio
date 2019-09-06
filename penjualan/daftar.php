<?php
include "koneksi.php";
include "header.php";
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
	background-color:grey;
	margin:auto;
	padding:20px;
}
    </style>
</head>
<body>
    <form action="daftar.php">
        <table>
            <tr>
                <td>Nama</td>
                <td>:</td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td>Email</td>
                <td>:</td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td>Password</td>
                <td>:</td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td>Role</td>
                <td>:</td>
                <td>
                    <select name="" id="">
                        <option value="anggota">User</option>
                        <option value="seler">Reseler</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><input type="submit" value="Daftar"></td>
                <td colspan="2"><input type="submit" value="Batal"></td>
            </tr>
        </table>
    </form>
    
</body>
</html>
<?php
include "footer.php";
?>