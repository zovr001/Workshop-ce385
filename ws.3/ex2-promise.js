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

fetchStudentByIdAsync("6501")
  .then((data) => console.log("Found:", data))
  .catch((err) => console.log("Error:", err.message))
  .finally(() => console.log("Done checking 6501"));

fetchStudentByIdAsync("9999")
  .then((data) => console.log("Found:", data))
  .catch((err) => console.log("Error:", err.message))
  .finally(() => console.log("Done checking 9999"));

fetchStudentByIdAsync(42)
  .then((data) => console.log("Found:", data))
  .catch((err) => console.log("Error:", err.message))
  .finally(() => console.log("Done checking invalid id"));

fetchStudentByIdAsync("6501")
  .then((student) => {
    return {
      name: student.name,
      grade: calculateGrade(student.score)
    };
  })
  .then((info) => {
    return `นักศึกษาชื่อ ${info.name} ได้เกรด ${info.grade}`;
  })
  .then((report) => {
    console.log(report);
  })
  .catch((err) => {
    console.log("Chain Error:", err.message);
  });

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  };
}

function dummyCallbackApi(val, callback) {
  setTimeout(() => {
    if (!val) return callback(new Error("No value provided"));
    callback(null, `Processed: ${val}`);
  }, 100);
}

const dummyPromiseApi = promisify(dummyCallbackApi);

dummyPromiseApi("Hello World")
  .then((res) => console.log("Promisify Result:", res))
  .catch((err) => console.log("Promisify Error:", err.message));