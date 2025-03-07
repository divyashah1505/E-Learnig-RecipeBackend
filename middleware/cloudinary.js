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
//     console.log(result);
//     return result;
//   } catch (err) {
//     throw new Error('Error uploading image to Cloudinary: ' + err.message);
//   }
// };

// module.exports = uploadToCloudinary;





const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'recipebackend',
  api_key: '271326862984261',
  api_secret: 'vTuX5RNNEJA1W9uVai94qSz-Crk',
  secure: true,
});

// Function to upload image to Cloudinary with retry logic
const uploadToCloudinary = async (file, retries = 3) => {
  try {
    if (!file) {
      throw new Error('File is undefined or null');
    }

    let result;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        result = await new Promise((resolve, reject) => {
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

        // Break the retry loop if upload succeeds
        break;
      } catch (error) {
        console.error(`Upload attempt ${attempt} failed:`, error.message);
        // Retry if there are remaining attempts
        if (attempt < retries) {
          console.log(`Retrying upload (attempt ${attempt + 1})...`);
        } else {
          // If no more attempts left, rethrow the error
          throw error;
        }
      }
    }

    return result;
  } catch (err) {
    throw new Error('Error uploading image to Cloudinary: ' + err.message);
  }
};

module.exports = uploadToCloudinary;
