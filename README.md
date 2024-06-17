up โปรเจกไปที่ github
1 ไปยังโฟลเดอร์โปรเจกต์ของคุณ

     cd path/to/your/project

เริ่มต้น Git repository

     git init

เพิ่มไฟล์ทั้งหมดลงใน repository

     git add .

คอมมิตไฟล์

     git commit -m "Initial commit"

สร้าง Repository บน GitHub

เชื่อมต่อ Git Repository ในเครื่องกับ GitHub

     git remote add origin https://github.com/somsaknuankaew/nodejs-mysql-sa.git

อัปโหลดโปรเจกต์ไปยัง GitHub

     git push -u origin main

เท่านี้โปรเจกต์ของคุณก็จะถูกอัปโหลดขึ้น GitHub เรียบร้อยแล้ว!

 ดึง git nodejs-mysql-sa ลงเครื่องตนเอง

8.เปิด path ที่ต้องการ ติดตั้ง 

9. กด Ship + คลิกขวา เลือก Open PowerShell window here
 
10. 
           git cline https://github.com/somsaknuankaew/nodejs-mysql-sa.git -b main


                              update file to git hub 
เชื่อมต่อ local repository กับ remote repository: 

               git remote add origin https://github.com/username/repository.git

ตรวจสอบสถานะของ repository:

               git status

พิ่มไฟล์ที่มีการเปลี่ยนแปลงไปยัง staging area:

                    git add .

ทำการ commit การเปลี่ยนแปลง:

                    git commit -m "อัปเดตไฟล์และเพิ่มฟีเจอร์ใหม่"

อัปเดตการเปลี่ยนแปลงไปยัง remote repository:

                    git push origin main
----------------------------------------------
ดึงการเปลี่ยนแปลงจาก remote repository:
                
                git pull origin main         
