const studentList = [
  { id: "STD-101", name: "กิตติพงษ์", major: "CS", score: 82 },
  { id: "STD-102", name: "ณัฐวุฒิ", major: "IT", score: 75 },
  { id: "STD-103", name: "วิภาดา", major: "SE", score: 90 },
  { id: "STD-104", name: "ธนกฤต", major: "DS", score: 68 }
];

function fetchStudentById(id, callback) {
  if (typeof id !== "string" || !id.trim()) {
    return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
  }

  setTimeout(() => {
    const result = studentList.find((item) => item.id === id);

    if (!result) {
      return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    }

    return callback(null, { ...result });
  }, 300);
}

fetchStudentById("STD-101", (err, data) => {
  if (err) return console.log(err.message);
  console.log("Found:", data);
});

fetchStudentById("STD-999", (err, data) => {
  if (err) return console.log(err.message);
  console.log("Found:", data);
});

fetchStudentById(42, (err, data) => {
  if (err) return console.log(err.message);
  console.log("Found:", data);
});