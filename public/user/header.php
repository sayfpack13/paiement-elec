<?php
session_start();
$cart_count=0;
if(isset($_SESSION["cart_count"]))
$cart_count=$_SESSION["cart_count"];

?>
<html>
<head>
	<script src="assets/react/babel.min.js"></script>
	<script src="assets/react/react.development.js"></script>
	<script src="assets/react/react-dom.development.js"></script>
	<script src="assets/js/jquery.js"></script>
	
	
	<link rel="stylesheet" href="assets/css/style.css">
	<script src="assets/js/ripple_btn.js"></script>
	
	
	<script src="assets/js/header.js"></script>

</head>


<body onload="init_header();" class="header">

<nav class="navbar">
<ul>
  <li><button class="ripple-btn" onClick="signup();">Create Account</button></li>
  <li><button class="ripple-btn" onClick="signin();">Sign In</button></li>
  <li><div id="test"><?php echo $cart_count; ?></div></li>
</ul>
</nav>

</body>
</html>
