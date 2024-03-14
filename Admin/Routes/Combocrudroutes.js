const express = require('express');
const router = express.Router();
const comboController = require('../Controllers/Combocruds');

// Route to add a new combo
router.post('/acombos', ()=> {
    console.log('come  ');
});

// Route to get all combos
router.get('/combos', comboController.getAllCombos);

// Route to edit a combo
router.put('/combos/:comboId', comboController.editCombo);

// Route to soft delete a combo
router.delete('/combos/:comboId', comboController.deleteCombo);

module.exports = router;
