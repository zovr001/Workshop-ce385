const studentList = [
  { id: "6501", name: "กิตติพงษ์", major: "CS", score: 82 },
  { id: "6502", name: "ณัฐวุฒิ", major: "IT", score: 75 },
  { id: "6503", name: "วิภาดา", major: "SE", score: 45 },
  { id: "6504", name: "ธนกฤต", major: "DS", score: 68 }
];

function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || !id.trim()) {
      return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    }

    setTimeout(() => {
      const result = studentList.find((item) => item.id === id);

      if (!result) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      }

      return resolve({ ...result });
    }, 300);
  });
}

function calculateGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

async function reportSequential() {
  const ids = ["6501", "6502", "6503"];
  const startTime = Date.now();

  for (const id of ids) {
    const student = await fetchStudentByIdAsync(id);
    console.log(`พบข้อมูล: ${student.name}`);
  }

  const duration = Date.now() - startTime;
  console.log(`แบบลำดับใช้เวลา: ${duration} ms`);
  return duration;
}

async function reportParallel(seqTime) {
  const ids = ["6501", "6502", "6503"];
  const startTime = Date.now();

  const results = await Promise.all(
    ids.map((id) => fetchStudentByIdAsync(id))
  );

  results.forEach((student) => {
    console.log(`พบข้อมูล: ${student.name}`);
  });

  const duration = Date.now() - startTime;
  const speedUp = (seqTime / duration).toFixed(2);

  console.log(`แบบขนานใช้เวลา: ${duration} ms`);
  console.log(`เร็วขึ้นประมาณ ${speedUp} เท่า`);
}

async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    const grade = calculateGrade(student.score);
    console.log(`พบข้อมูล: ${student.name} (เกรด ${grade})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}

async function main() {
  const seqTime = await reportSequential();
  await reportParallel(seqTime);

  await safeReport("6501");
  await safeReport("9999");
}

main();