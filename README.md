# File Uploader

## Description:

This project is a simple file uploader web application built using Node.js and Express. It allows users to upload multiple files of various formats and provides a user-friendly interface allowing users to select files from their local machine.

## Technologies Used

- The backend of the application utilizes Express.js along with middleware such as Helmet for enhanced security, CORS for enabling cross-origin resource sharing, and the 'dotenv' package for environment variable management.

- On the server side, implemented in Node.js and running on http://localhost:8005, the uploaded files are stored in the "uploads" folder using **Pipelines / Writable Stream**.

- In the HTML UI, all uploaded files are listed, and users can access them via hyperlinks.

- To ensure functionality across different file formats, testing includes uploading and downloading of the following formats:

  - Image (jpeg)
  - Video (mp4)
  - Audio (mp3)
  - Excel (xlsx or csv)
  - Text (txt)
  - JSON (.json)
  - PDF (.pdf)

## ToDo List

- Additionally, files can be added through a drag-and-drop feature onto the browser window.
- Users can track the progress of their uploads through a progress bar displayed on the UI.
