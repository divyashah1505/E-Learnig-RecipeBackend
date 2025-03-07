const bcrypt = require('bcrypt');

// Function to generate hashed passwords
const generateHashedPassword = async (password) => {
  const saltRounds = 10; // Number of salt rounds for bcrypt hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const adminSeedData = async () => {
  const hashedPassword = await generateHashedPassword('Divya@1505Shah');
  
  return [
    {
      name: 'Divya',
      email_id: 'divya.1505shah@example.com',
      contact_no: '9429359601',
      password: hashedPassword
    }
  ];
};

module.exports = adminSeedData;


// const bcrypt = require('bcrypt');

// // Function to generate hashed passwords
// const generateHashedPassword = async (password) => {
//   const saltRounds = 10; // Number of salt rounds for bcrypt hashing
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   return hashedPassword;
// };

// const adminSeedData = async () => {
//   const hashedPasswordDivya = await generateHashedPassword('Divya@1505Shah');
//   const hashedPasswordYash = await generateHashedPassword('Yash@122');

//   return [
//     {
//       name: 'Divya',
//       email_id: 'divya.1505shah@example.com',
//       contact_no: '9429359601',
//       password: hashedPasswordDivya
//     },
//     {
//       name: 'Yash',
//       email_id: 'yash@gmail.com',
//       contact_no: '9429670723',
//       password: hashedPasswordYash
//     }
//   ];
// };

// module.exports = adminSeedData;
