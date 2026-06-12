import { mkdir, writeFile } from "node:fs/promises";

const lines = [
  ["Aviral Shukla", 22],
  ["FULL STACK DEVELOPER", 10],
  ["Noida, India  |  shuklaaviral403@gmail.com  |  github.com/getchaviral", 9],
  ["", 9],
  ["PROFILE", 11],
  ["Full Stack Developer experienced in React.js, Node.js, Express.js, MongoDB,", 9],
  ["Redis, OAuth 2.0, JWT authentication, Razorpay, and scalable backend systems.", 9],
  ["", 9],
  ["PROJECTS", 11],
  ["BloodBond Platform", 10],
  ["Donor matching, Google OAuth, Redis caching, RBAC, and REST APIs.", 9],
  ["Stack: React.js, Node.js, Express.js, MongoDB, Redis", 9],
  ["", 9],
  ["Reservify", 10],
  ["Booking system, Razorpay payments, admin dashboard, RBAC, and JWT auth.", 9],
  ["Stack: React.js, Node.js, Express.js, MongoDB", 9],
  ["", 9],
  ["MUGGAM", 10],
  ["Text-to-video workflow, responsive UI, FFmpeg processing, and Google OAuth.", 9],
  ["", 9],
  ["SKILLS", 11],
  ["Frontend: React, Next.js, JavaScript, TypeScript, Tailwind CSS", 9],
  ["Backend: Node.js, Express.js, REST APIs, OAuth 2.0, JWT", 9],
  ["Data: MongoDB, MySQL, Redis", 9],
  ["Core: DSA, OOP, DBMS, Operating Systems, Computer Networks", 9],
  ["", 9],
  ["ACHIEVEMENTS", 11],
  ["300+ DSA problems solved", 9],
  ["Frontend Developer Internship", 9],
  ["Top 30 among 200+ teams at Build With Delhi Hackathon", 9],
  ["Smart India Hackathon Participant", 9],
];

const escapePdf = (value) =>
  value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");

let y = 760;
const commands = ["BT", "/F1 10 Tf", "50 760 Td"];
for (const [line, size] of lines) {
  commands.push(`/${size >= 11 ? "F2" : "F1"} ${size} Tf`);
  commands.push(`0 ${y === 760 ? 0 : -18} Td`);
  commands.push(`(${escapePdf(line)}) Tj`);
  y -= 18;
}
commands.push("ET");
const stream = commands.join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const offset of offsets.slice(1)) {
  pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

await mkdir("public", { recursive: true });
await writeFile("public/aviral-shukla-resume.pdf", pdf, "binary");
console.log("Generated public/aviral-shukla-resume.pdf");
