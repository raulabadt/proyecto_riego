const express = require('express');
const router = express.Router();


const riegoController=require('../controllers/riegoControllers');

router.get('/', riegoController.list);
router.post('/add', riegoController.save);
router.get('/exportarPDF', riegoController.exportarPDF);
router.get('/delete/:id', riegoController.delete);
router.get('/update/:id', riegoController.edit);
router.post('/update/:id', riegoController.update);

module.exports = router;