// Función para analizar todas las respuestas a la vez y generar un análisis FODA consolidado
function analyzeFODAAllResponses() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow(); // Obtiene la última fila con datos (total de respuestas)
  var lastColumn = sheet.getLastColumn(); // Obtiene el número de columnas (total de preguntas)
  var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0]; // Obtiene los encabezados (preguntas)
  var allResponses = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues(); // Obtiene todas las respuestas desde la fila 2

  var responses = ""; // Aquí se concatenarán todas las respuestas
  
  // Recorre cada respuesta y construye un bloque de texto para el prompt
  for (var i = 0; i < allResponses.length; i++) {
    responses += "Respuestas del participante " + (i + 1) + ":\n";
    for (var j = 0; j < headers.length; j++) {
      responses += headers[j] + ": " + allResponses[i][j] + "\n";
    }
    responses += "\n"; // Separador entre cada participante
  }

  // Definición del prompt que se enviará a OpenAI
  var prompt = "Realiza un análisis FODA basado en las siguientes respuestas de una encuesta por múltiples participantes:\n" + responses;

  // Llamada a la API de OpenAI
  var apiKey = "TU_API_KEY_AQUÍ"; // Reemplaza con tu API Key de OpenAI
  var url = "https://api.openai.com/v1/chat/completions";
  var options = {
    "method": "post",
    "headers": {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/json"
    },
    "payload": JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": prompt}],
      "temperature": 0.7
    })
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var json = JSON.parse(response.getContentText());
  var fodaResult = json.choices[0].message.content;  // Resultado del análisis FODA

  // Crear un nuevo Google Doc con el análisis FODA consolidado
  var doc = DocumentApp.create('Análisis FODA Consolidado - ' + new Date());
  var body = doc.getBody();
  body.appendParagraph('Análisis FODA basado en todas las respuestas de la encuesta:');
  body.appendParagraph(fodaResult);
  
  doc.saveAndClose();

  // Enviar un correo con el enlace al documento generado
  var docUrl = doc.getUrl();
  MailApp.sendEmail({
    to: 'tu-correo@gmail.com',  // Reemplaza con tu correo
    subject: 'Análisis FODA Generado',
    body: 'El análisis FODA consolidado se ha completado. Puedes verlo aquí: ' + docUrl
  });
}
