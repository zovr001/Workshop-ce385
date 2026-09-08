const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

function timeoutPromise(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), ms);
  });
}

async function main() {
  // สถานการณ์ที่ 1: Promise.all
  try {
    const res1 = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ")
    ]);
    console.log("เปิดหน้าแรก:", res1.join(", "));
  } catch (err) {
    console.log("หน้าแรกเปิดไม่ได้:", err.message);
  }

  try {
    const res1Fail = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ", true)
    ]);
    console.log("เปิดหน้าแรก:", res1Fail.join(", "));
  } catch (err) {
    console.log("หน้าแรกเปิดไม่ได้:", err.message);
  }

  // สถานการณ์ที่ 2: Promise.allSettled
  // เหตุผล: ต้องการทราบผลลัพธ์ของทุกช่องทาง แม้บางช่องทางจะล้มเหลวก็ไม่ทำให้รายงานพัง
  const res2 = await Promise.allSettled([
    wait(300, "อีเมล"),
    wait(500, "SMS", true),
    wait(400, "แอป")
  ]);
  console.log("รายงานผลส่งแจ้งเตือน:", res2);

  // สถานการณ์ที่ 3: Promise.any
  // เหตุผล: ต้องการข้อมูลตัวแรกที่สำเร็จ โดยมองข้าม Server ตัวที่ล้มเหลว
  try {
    const res3 = await Promise.any([
      wait(300, "mirror-A", true),
      wait(600, "mirror-B")
    ]);
    console.log("ใช้ข้อมูลจาก:", res3);
  } catch (err) {
    console.log("ไม่มี server ใดสำเร็จ");
  }

  // สถานการณ์ที่ 4: Promise.race
  // เหตุผล: วัดใจความเร็วระหว่างการดึงข้อมูลกับเวลาคุม Timeout ตัวไหนเสร็จก่อนเอาตัวนั้น
  try {
    const res4 = await Promise.race([
      wait(1200, "ข้อมูลจาก DB"),
      timeoutPromise(800)
    ]);
    console.log("ดึงสำเร็จ:", res4);
  } catch (err) {
    console.log("ใช้แคชเก่าแทน");
  }
}

main();