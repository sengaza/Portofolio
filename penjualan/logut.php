<?php
include 'koneksi.php';
unset($_SESSION['role']);
session_destroy();
header("Location: login.php")
?>