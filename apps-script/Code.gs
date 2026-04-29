const SHEET_ID = "12tnomZrwk4w5DHz-7cnMdUn8cHFylgiAlbPzCciPUvg";

function doPost(e) {
  try {
    const data = e.parameter;
    const timestamp = new Date();

    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName("QREA Leads") || spreadsheet.getActiveSheet();

    // Append submitted data
    sheet.appendRow([
      data.name || "",
      data.phone || "",
      data.email || "",
      data.budget || "",
      data.goal || "",
      timestamp
    ]);

    // Admin notification emails
    const adminEmails = ["jale.guseynova@qrea.ae", "Ahmedlotfyy0@gmail.com"];
    const subject = "New QREA Lead";
    const body = "A new lead has been submitted through the QREA landing page.\n\n" +
      "Name: " + (data.name || "") + "\n" +
      "Phone: " + (data.phone || "") + "\n" +
      "Email: " + (data.email || "") + "\n" +
      "Budget: " + (data.budget || "") + "\n" +
      "Goal: " + (data.goal || "") + "\n" +
      "Timestamp: " + timestamp + "\n";

    adminEmails.forEach(function(email) {
      MailApp.sendEmail(email, subject, body);
    });

    // Confirmation email to lead
    const isEnglish = data.lang === "en";
    const confirmSubject = isEnglish
      ? "We received your inquiry — QREA"
      : "تم استلام استفسارك — QREA";

    const confirmBody = isEnglish
      ? "Dear " + (data.name || "") + ",\n\nThank you for reaching out to QREA. We have received your inquiry and one of our real estate consultants will contact you shortly to discuss the best property options that match your budget and goals.\n\nBest regards,\nQREA Team"
      : "مرحباً " + (data.name || "") + "،\n\nشكراً لتواصلك مع QREA. لقد استلمنا استفسارك وسيقوم أحد مستشارينا العقاريين بالتواصل معك قريباً لمناقشة أفضل الخيارات العقارية التي تناسب ميزانيتك وأهدافك.\n\nمع تحيات فريق QREA";

    MailApp.sendEmail({
      to: data.email,
      subject: confirmSubject,
      body: confirmBody,
      name: "QREA"
    });

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
