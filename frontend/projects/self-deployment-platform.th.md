## ภาพรวม

แพลตฟอร์มนี้ให้พนักงานในบริษัท deploy แอปภายในที่สร้างด้วย Claude Code ได้เอง โดยไม่ต้องรอ IT ทำให้ทีละแอป พนักงานแค่สั่ง Claude ว่า "deploy ให้หน่อย" Claude จะทำตาม skill ของบริษัทและเรียก MCP server ของแพลตฟอร์ม จากนั้นแพลตฟอร์มจะตรวจสอบ build สแกน image deploy และดูแลแอปให้ทั้งหมด

```
พนักงาน → Claude Code → Company Deployment Skill → MCP server
        → Platform API → build / สแกน image / deploy → Docker → แอป
```

ระบบใช้ภายในองค์กรเท่านั้น รันบน Linux server เครื่องเดียวที่มี Docker เข้าถึงได้จาก LAN ของบริษัทเท่านั้น ไม่ใช้ cloud และไม่ใช้ Kubernetes ผมพัฒนาช่วงปลาย ส.ค. ถึง ต.ค. 2569 เริ่มจากเขียนเอกสาร BRD, requirements, สถาปัตยกรรม และ decision log ก่อน แล้วจึงลงมือเขียนระบบ

## ส่วนประกอบ

| ส่วน | ภาษา | หน้าที่ |
|---|---|---|
| Platform API | Go | ตัวเดียวที่แตะ PostgreSQL และ Docker ส่วนอื่นเป็น client ของ API นี้ทั้งหมด |
| MCP server + CLI | Python | เครื่องมือ 34 ตัวที่ Claude Code ใช้ เช่น ล็อกอิน เริ่มโปรเจกต์ตามมาตรฐาน รันเทสต์ deploy ดู log และ metrics |
| Company Deployment Skill | Markdown | กติกาที่ Claude ต้องทำตาม, schema ของ `deployment.yaml` และ template เริ่มต้นของแต่ละภาษา |
| Admin Portal | React + TypeScript | หน้าเว็บสำหรับคน: อนุมัติเครื่อง ดูแอป backup แจ้งเตือน และหน้าของผู้ดูแล |
| Gateway | nginx | ใช้พอร์ตเดียวสำหรับ Portal, API, แอปทั้งหมด และตัวติดตั้งของแต่ละเครื่อง |

มาตรฐานของแอปใหม่คือ frontend เป็น React, API ภาษาเดียวเลือกได้จาก Python, Node.js, TypeScript หรือ Go และฐานข้อมูล MySQL ที่แพลตฟอร์มสร้างแยกให้แต่ละแอป

## วงจรชีวิตของแอป

สถานะของแอปถูกบังคับฝั่ง server: Draft → Validated → Build → Deploying → Running → Suspended / Rolled back → Archived → Deleted

- **Build:** แต่ละ runtime มีสูตร build ของตัวเองสูตรเดียว image ที่ใช้รันไม่มี package manager และทุก image ต้องผ่านการสแกน Trivy ระดับ CRITICAL
- **Deploy:** ตรวจ health ก่อนปล่อย traffic เข้า และ deploy ใหม่จะไม่ทำให้เวอร์ชันที่ใช้งานได้อยู่ล่ม
- **Health และ rollback:** ตรวจ instance ที่รันอยู่ต่อเนื่อง ตัวไหนไม่ healthy ก็เปลี่ยนตัวใหม่ ถ้าเวอร์ชันใหม่พังซ้ำ ๆ หลังปล่อย ระบบ rollback ให้อัตโนมัติ
- **Scale-to-zero:** service ที่ไม่มีคนใช้จะหยุด แล้ว request แรกจะปลุกขึ้นมาที่ address เดิม ฐานข้อมูล MySQL ก็หลับไปพร้อมแอปด้วยเพื่อประหยัด memory
- **Dev copy:** ทุกแอปมีสำเนา `<app>-dev` ที่มีฐานข้อมูลและ address ของตัวเอง ทุกการแก้ไข deploy ไปที่ dev ได้ทันทีโดยไม่ต้องรออนุมัติ และข้อมูลไม่หาย

## ความปลอดภัยและการอนุมัติ

- **ยืนยันตัวตน:** พนักงานลงทะเบียนด้วยรหัสผ่านและรหัสลงทะเบียนจาก IT แต่ละเครื่องที่ใช้ Claude Code ต้องขอ API key ของตัวเอง และเจ้าของบัญชีต้องกดอนุมัติใน Portal ก่อน deploy ได้ ระบบเก็บแค่ค่า hash
- **อนุมัติ production ด้วยลายเซ็น:** การ deploy ขึ้น production ต้องรอผู้ดูแลเซ็นด้วย Ed25519 private key ที่มีแค่ผู้ดูแลถือ ลายเซ็นครอบคลุมตัว deployment, image, ไฟล์ source, ผลเทสต์ และ REVIEW.md ของผู้ขอ หน้าอนุมัติจะดาวน์โหลดและตรวจ hash ของ source ก่อนให้เซ็น
- **Secrets:** เขียนได้อย่างเดียว เข้ารหัส AES-256-GCM และใส่ให้ตอน container เริ่ม ไม่มี API หรือ tool ตัวไหนส่งค่ากลับ
- **กุญแจเข้ารหัสของแพลตฟอร์ม:** seal ไว้กับ TPM ของ server แล้ว unseal เข้า RAM ตอนบูต มีสำเนาสำรองแบบ offline

![หน้าอนุมัติ production: ตรวจ source, อ่าน REVIEW.md, ผลเทสต์ และผลสแกน image ก่อนเซ็น (ข้อมูลจำลอง)](images/projects/self-deployment-platform/approval.webp)

## ควบคุมตั้งแต่เริ่มสร้างแอป

มาตรฐานของบริษัทมีผลตั้งแต่เริ่มสร้างแอป ไม่ใช่แค่ตอน deploy

- แอปใหม่ต้องลงทะเบียน profile ก่อน (วัตถุประสงค์ ผู้ใช้ ข้อมูลส่วนบุคคล stack) แล้วเริ่มโค้ดจาก template ของบริษัท
- ถ้าใช้ library ที่บริษัทห้าม build จะไม่ผ่าน
- อะไรที่อยู่นอกมาตรฐานต้องขอ exception ให้ผู้ดูแลตัดสินใน Portal ก่อน
- แพลตฟอร์มรันเทสต์ (Go, Python, Node) ให้ใน sandbox เครื่องพนักงานจึงไม่ต้องติดตั้ง toolchain และ production จะแนบผลเทสต์ได้ก็ต่อเมื่อเทสต์ผ่านบน source เดียวกัน

![หน้า Standards: exception ที่รอตัดสิน และรายการ library ที่บริษัทไม่อนุญาต (ข้อมูลจำลอง)](images/projects/self-deployment-platform/standards.webp)

## งานดูแลระบบที่แพลตฟอร์มทำเอง

- ฐานข้อมูล MySQL หรือ PostgreSQL แยกต่อแอปบน private network ของตัวเอง รหัสผ่านไม่อยู่ใน source และเปลี่ยนได้
- Backup แบบ full ทุกวันอาทิตย์ แบบ differential จันทร์ถึงเสาร์ เข้ารหัสด้วยกุญแจของแพลตฟอร์ม และเจ้าของแอป restore เองได้
- เก็บ log ทุกบรรทัดที่แอปพิมพ์ 90 วัน โดยซ่อนค่า secret ไว้ ส่วน CPU, memory, request, error และ latency แพลตฟอร์มวัดเอง
- แจ้งเตือนเมื่อ error rate, latency, CPU, memory หรือ disk เกินเกณฑ์ ส่งเข้า inbox ใน Portal
- มี audit log แบบ hash-chain ที่เขียนต่อท้ายได้อย่างเดียว
- ผู้ดูแลระงับแอปไหนก็ได้พร้อมเหตุผล และมีแค่ผู้ดูแลที่สั่งให้กลับมาทำงานได้

## การทดสอบ

- **Unit test:** Go 391 ฟังก์ชัน, Python 155 และ Portal 109 test case
- **Script ตรวจกับระบบจริง:** รันกับ stack ที่ทำงานอยู่จริง ทั้ง Docker build, HTTP, ฐานข้อมูล และ headless browser ครอบคลุมการ deploy React + API ทุกภาษา + MySQL จาก template ไปจนใช้งานได้, เครื่องมือ MCP ทั้ง 34 ตัวผ่าน stdio, backup/restore, ลายเซ็นปลอมหรือนำมาใช้ซ้ำต้องถูกปฏิเสธ และการกลับมาทำงานเองหลัง Docker restart

## สิ่งที่ยังไม่มี

- แจ้งเตือนอยู่ใน Portal อย่างเดียว ยังไม่ส่งออกช่องทางอื่น เช่น อีเมลหรือแชต
- ยังหมุนกุญแจเข้ารหัสไม่ได้ เพราะยังไม่มีเครื่องมือเข้ารหัสข้อมูลเดิมใหม่
- script ของ TPM ทดสอบกับ software TPM เท่านั้น ยังไม่ได้รันกับชิปของ server จริง
- ทุกอย่างอยู่บนเครื่องเดียว ไม่มี high availability และ backup อยู่เครื่องเดียวกับฐานข้อมูล
- ยังไม่มีระบบรีเซ็ตรหัสผ่าน และ deploy ทำงานแบบ synchronous ยังไม่มี job queue
