var express = require('express');
var router = express.Router();
var cors = require('cors');
var BooksContoller = require('../../modules/controller/books')

router.get('/', BooksContoller.findAll)
router.get('/:book_id', BooksContoller.findById)
router.put('/:book_id', BooksContoller.update)
router.delete('/:book_id', BooksContoller.delete)
router.post('/', BooksContoller.add)

module.exports = router;
// module.exports.bookId = id;
// module.exports.title = title;
// module.exports.author = author;
// module.exports.price = price;
// module.exports.stock = stock;