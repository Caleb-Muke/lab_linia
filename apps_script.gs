// Same Web App URL used in scripts.js
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyW3N_ZILg0nzk6dDwHG_CZ6IiUQH98LGSQ7GT-dOlv-iH7_QzjIO_KoRLJhJT2W8KU/exec';

// Replace SHEET_ID with your Google Sheet ID (the long id in the sheet URL)
const SHEET_ID = '156RZQc7Utg-yf6JDtGUZy-cmSxxuh4IzB4sR0wp7VFs';
const SHEET_NAME = 'Feuille1';

function doPost(e) {
  try {
    var contentType = e.postData && e.postData.type ? e.postData.type : '';
    var payload = {};

    if (contentType.indexOf('application/json') !== -1) {
      payload = JSON.parse(e.postData.contents);
    } else {
      // fallback for form-encoded data
      payload = e.parameter || {};
    }

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // Define the order of columns you want to append
    var row = [
      new Date(),
      payload.nom || '',
      payload.prenom || '',
      payload.email || '',
      payload.tel || '',
      payload.sujet || '',
      payload.message || ''
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/*
Deployment steps:
1. Open script.google.com and create a new Apps Script project.
2. Paste this file, set SHEET_ID to your sheet's ID and (optionally) SHEET_NAME.
3. Save and Deploy > New deployment > Select "Web app".
   - Execute as: Me
   - Who has access: Anyone (or Anyone with link)
4. Copy the Web App URL and replace the `URL` constant in `scripts.js`.
*/
