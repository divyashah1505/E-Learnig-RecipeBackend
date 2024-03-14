const { Admin } = require('../models'); // Assuming you have defined the Admin model
const adminSeedData = require('./adminSeedData');

const seedAdmins = async () => {
  try {
    for (const adminData of await adminSeedData()) {
      await Admin.create(adminData);
    }
    console.log('Admins seeded successfully.');
  } catch (error) {
    console.error('Error seeding admins:', error);
  }
};

module.exports = seedAdmins;
