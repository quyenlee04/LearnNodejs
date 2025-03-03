

const router = require('express').Router();
const bookController = require('../controllers/BookController');

//GET /books
router.get('/',bookController.getAllbooks);

router.post('/',bookController.createBook );

router.delete('/:id',bookController.deleteBook );

router.put('/:id', bookController.updateBook);

router.get('/:id', bookController.getBookById);
module.exports = router;