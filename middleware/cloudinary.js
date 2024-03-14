// // // cloudinary.js
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: 'recipebackend',
//   api_key: '271326862984261',
//   api_secret: 'vTuX5RNNEJA1W9uVai94qSz-Crk',
//   secure: true,
// });

// // Function to upload image to Cloudinary
// const uploadToCloudinary = async (file) => {
//   console.log("File received:", file); // Add this line

//   try {
//     if (!file) {
//       throw new Error('File is undefined or null');
//     }

//     const result = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { resource_type: 'auto' },
//         (error, result) => {
//           if (error) {
//             reject(new Error('Error uploading image to Cloudinary: ' + error.message));
//           } else {
//             console.log('Cloudinary upload result:', result);
//             resolve(result.secure_url);
//           }
//         }
//       );

//       // Handle both Buffer and non-Buffer file objects
//       if (Buffer.isBuffer(file)) {
//         stream.write(file);
//       } else if (file.data) {
//         const buffer = Buffer.from(file.data);
//         stream.write(buffer);
//       } else {
//         reject(new Error('File is not a Buffer or does not contain data'));
//       }
//       stream.end();
//     });
//     return result;
//   } catch (err) {
//     throw new Error('Error uploading image to Cloudinary: ' + err.message);
//   }
// };

// module.exports = uploadToCloudinary;
// cloudinary.js (middleware)
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'recipebackend',
  api_key: '271326862984261',
  api_secret: 'vTuX5RNNEJA1W9uVai94qSz-Crk',
  secure: true,
});

// Function to upload image to Cloudinary
const uploadToCloudinary = async (file) => {
  console.log("File received:", file); // Add this line

  try {
    if (!file) {
      throw new Error('File is undefined or null');
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(new Error('Error uploading image to Cloudinary: ' + error.message));
          } else {
            console.log('Cloudinary upload result:', result);
            resolve(result.secure_url);
          }
        }
      );

      // Handle both Buffer and non-Buffer file objects
      if (Buffer.isBuffer(file)) {
        stream.write(file);
      } else if (file.data) {
        const buffer = Buffer.from(file.data);
        stream.write(buffer);
      } else {
        reject(new Error('File is not a Buffer or does not contain data'));
      }
      stream.end();
    });
    console.log(result);
    return result;
  } catch (err) {
    throw new Error('Error uploading image to Cloudinary: ' + err.message);
  }
};

module.exports = uploadToCloudinary;
