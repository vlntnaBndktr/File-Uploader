# BLOB / UPLOAD via STREAM

## Server:

- wir müssen das file binär schicken, damit es ein blob wird
- das heißt es wird zerstückelt und wieder zusammengesetzt
- wir kopieren den großteil des Codes aus
  https://dev.to/tqbit/how-to-use-node-js-streams-for-fileupload-4m1n#code

- wir bauen uns den filePath
- wir bauen auch selbst ein Promise mit reject/resolve (Axios etc hat das Promise immer schon eingebaut)
- bei vielen Uploads wäre es gut mehrere Prozesse zu haben:
- Stichwort MULTITHREADING https://dev.to/appsignal/an-introduction-to-multithreading-in-nodejs-3i46

## Client:

- FETCH API verwenden: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

- mit fetch API oder AXIOS, Dateien können dann im Body gesendet werden
- FileList; jeder file ist schon ein BLOB man muss ihn nichtmehr umwandeln
- https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
- eine Schleife durch und jedes Element an den Node.js Server schicken
- Das wäre mit fetch API: https://www.geeksforgeeks.org/how-can-javascript-upload-a-blob/

- download muss kein stream sein, man könnte auch einfach für die Übung einen Link darauf machen. Ansonsten anschauen wie man streaming alla Netflix.

- damit die Prozentsätze dem Client angezeigt werden könnte man Websockets verwenden

## INFOS/SCHRITTE

### Upload mit XHR(XMLHttpRequest)/Fetch als Blob

- XHR (XMLHttpRequest) und Fetch sind Techniken in JavaScript, die es ermöglichen, Daten asynchron zwischen dem Browser und dem Server auszutauschen.
- Ein Blob ist ein Binärdatentyp, der es erlaubt, Daten als zusammenhängende Blöcke zu behandeln.

_Client (Frontend):_

1.  HTML-Datei erstellen: Erstelle eine HTML-Datei mit einem Formular, das es dem Benutzer ermöglicht, Dateien auszuwählen.

2.  JavaScript-Code, der auf das Formular zugreift, die ausgewählten Dateien in Blobs umwandelt.

- In einer **FileList**, die von einem <input type="file">-Element zurückgegeben wird, sind die einzelnen Elemente bereits vom **Typ Blob**(Binary Large Objects) .
- Ein Blob ist ein binärer Datentyp(Binäre Dateien können verschiedene Arten von Daten enthalten, darunter _Bilder, Audio, Video, ausführbare Programme_ und mehr.)
- Die beiden Teile in der binären Darstellung sind die Ziffern "0" und "1"
- Jede dieser Ziffern wird als "Bit" (Binary Digit) bezeichnet
  zB: 10001001 01010000 01001110 01000111 00001101 00001010 00011010 00001010 00000000 00000000 00000000 00001101 01001001 01001000 01000100 01010010

- In Hexadezimalzahlen gibt es neben den Ziffern 0 bis 9 auch Buchstaben von A bis F.
- Jede Hexadezimalziffer entspricht 4 Bits im Binärsystem:

  - Hexadezimal: 0
    Binär: 0000
  - Hexadezimal: A
    Binär: 1010

- Um binäre Daten leichter lesbar zu machen kann man es so darstellen:
  zB: Zeichenfolge 89 50 4E 47 0D 0A 1A 0A 00 00 00 0D 49 48 44 52

3. Blobs mit Fetch oder XMLHttpRequest an den Server senden. Du kannst dazu die FormData-API verwenden, um Dateien als Blobs zu sammeln und zu senden.

#### FETCH

1. GET-Request für **json-file**
   // let myfile = 'myfile.json';
   fetch('myfile.json')
   // 1. Status der Anfrage, Header-Info und Inhalt checken
   // Der body einer HTTP-Response wird als ReadableStream abstrakt dargestellt
   .then((response) => {
   console.log('Response:', response);
   // Welches Datenformat wird erwartet?
   return response.json(); // .text()/.blob() etc.
   })
   // 2. den eigentlichen Inhalt der Response verarbeiten
   .then((data) => {
   console.log('data:', data);
   document.getElementById('info').innerHTML = data.name;
   })
   .catch((error) => {
   console.error('Error', error);
   });

2. GET-Request für jpeg

## node07-image-files.js

=> Im UI (HTML) werden alle Dateien (Dateiname) angezeigt und sind per Hyperlink ansprechbar.

CODE:

// Statische Webseite ausleifern
// app.use(express.static('www'));
app.use('/bilder', express.static('www/images'));

// man braucht kein \_\_dirname etc
// jetzt kann man einzelne Bilder aufrufen: http://localhost:8000/bilder/gina/gina-1.jpg

app.get('/', (req, res) => {
res.send('Willkommen in der Bildergalerie');
});

app.get('/api/gallery', (req, res) => {
const json = [];

const folders = fs.readdirSync('www/images');
console.log(folders);

folders.forEach((item, index, array) => {
json.push({
foldername: item,
});
});

res.json(json);
});

## Progressbar

- eingebaute Methode in XHR die den progress dann anzeigt
- komplett auf der Clientseite gelöst
