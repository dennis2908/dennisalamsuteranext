# Instalasi dan running project di localhost:

>>>Front End : </br>

- install npm 7.12.1, node v16.1.0, next
- git clone https://github.com/dennis2908/dennisalamsuteranext </br>
- buka cmd dan lalu ketik yarn install </br>
- setelah selesai install, ketik  yarn dev <br>
- buka localhost:3000<br>
	
# Bukti running : (project frontend + backend ini yg sudah di deploy online)

  https://alamsuteradennis.herokuapp.com
  
# Notes :

  - Login : </br>
     
	Username : dana88 </br>
	
	Passsword : dana88 </br>
	
	Role : Super Admin </br>
	
	================== </br>
	
	Username : dina88 </br>
	
	Passsword : dina88 </br>
	
	Role : Admin </br>  
	
	
# Fill Data :

  - Php version : 7.32 64 Bit
     
  - Framework : Laravel 8.31.0 </br>
	
  - Database selection : mysql mariaDB 10.1.37 </br>
	
  - Database Configuration used : root = "root", </br> 
  
    password = "", port = "3306", database name = "alamsutera", host = "" </br>
	
  - Library dipake : JWT Token Tymon </br>	
  
  - Keterangan : Laravel menggunakan token untuk authentifikasi <br>
    
	Begitu login maka user akan dapat token yang akan </br>
	
	dimasukkan otomatis ke bearer token untuk auth nya sehingga </br>
	
	penggunaan tidak bisa sembarangan.</br>
	
	Dibangun 4 data master :  role, user, barang, customer </br>
	
	dan 1 data order transaksi </br>
	
	Untuk role, bisa memilih menu otorisasi di assign </br>
	
	Untuk data user, field email : unique <br>
	
	Untuk data customer, field name , code : unique <br>
	
	Untuk data barang, field name , code : unique <br>
	
	Untuk order barang, item bisa banyak, auto total & sum<br>
	
	Untuk role superadmin : semua menu unlock <br>
	
	Untuk role admin : menu barang, order <br>