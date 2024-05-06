import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import fs from 'fs';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () => {
  console.log('Express Server läuft unter http://localhost:' + PORT);
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'unsafe-inline'", 'https://cdn.jsdelivr.net'],
    },
  })
);

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Statische Webseite ausliefern
app.use(express.static('www'));
// app.use('/', express.static('www'));
app.use('/uploads', express.static('uploads'));
// -> Hyperlink zb: http://localhost:8005/uploads/file_1701849952447.jpeg

// BACKEND
// POST Route für einkommende Requests. Files befinden sich im Body.
app.post('/upload', async (req, res) => {
  // Take in the request & filepath, stream the file to the filePath
  const timestamp = new Date().getTime();

  // TODO: Dateinamen direkt in der URL des Requests übergeben oder als Query-Parameter
  console.log('req.headers:', req.headers);
  console.log(
    'req.headers[content-disposition]:',
    req.headers['content-disposition']
  );

  // content-type aus den request headers holen
  const fileExtension = req.headers['content-type'].split('/')[1]; // 'image/jpeg' => 'jpeg'
  const filePath = `./uploads/file_${timestamp}.${fileExtension}`;

  const uploadFile = () => {
    return new Promise((resolve, reject) => {
      // Stream erzeugen: 2 Arten von streaming-methods: createReadStream oder createwriteStream
      const stream = fs.createWriteStream(filePath);
      // Streams emittieren Events: open, drain, colos, error
      // With the open - event, data will start being written
      // from the request to the stream's destination path
      stream.on('open', () => {
        console.log('Stream open ...  0.00%');
        req.pipe(stream);
      });

      // Drain is fired whenever a data chunk is written.
      // When that happens, print how much data has been written yet.
      stream.on('drain', () => {
        const written = parseInt(stream.bytesWritten);
        const total = parseInt(req.headers['content-length']);
        const pWritten = ((written / total) * 100).toFixed(2);
        console.log(`Processing  ...  ${pWritten}% done`);
      });

      // When the stream is finished, print a final message
      // Also, resolve the location of the file to calling function
      stream.on('close', () => {
        console.log('Processing  ...  100%');
        resolve(filePath);
      });
      // If something goes wrong, reject the promise
      stream.on('error', (err) => {
        console.error(err);
        reject(err);
      });
    });
  };

  const response = await uploadFile();

  res.json({ filePaths: response });
});
