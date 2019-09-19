const Books = require("../../models/").Books
var response = require("../respone")

var BooksController = function () {

}
//--------------------------------------------------------------//
BooksController.findById = function (req, res, next) {
    var book_id = req.params.book_id

    Books.findOne({
        where: { book_id: book_id }
    }).then(data => {
        if (data) {
            res.json(response.success(data))
        } else {
            res.json(response.error(404, "Book Not Found Coy"))
        }

    })
}
//--------------------------------------------------------------//
BooksController.findAll = function (req, res, next) {
    Books.findAll().then(result => {
        if (result) {
            res.json(response.success(result))
        } else {
            res.json(response.error(404, "Book Not Found Coy"))
        }
    })
}
//------------------------------------------------------------//
BooksController.delete = function (req, res, next) {
    var book_id = req.params.book_id

    Books.destroy({
        where: { book_id: book_id }
    }).then(result => {
        if (result) {
            res.json(response.success(result))
        } else {
            res.json(response.error(404, "Book Not Found Coy"))
        }
    })
}
//--------------------------------------------------------//
BooksController.add = function (req, res, next) {
    let data = {
        book_id: req.body.book_id,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        stock: req.body.stock
    }
    console.log("Ini Post "+JSON.stringify(data))
    Books.create(data).then(result => {
        console.log(result)
        if (result) {
            res.json(response.messagge(result))
        } else {
            console.log(error)
            res.json(response.error(404, "Book Not Found Coy"))
        }
    })
}
//--------------------------------------------------------//
BooksController.update = function (req, res, next) {
    var book_id = req.params.book_id
    var data = {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        stock: req.body.stock
    }
    Books.findOne({
        where: { book_id: book_id }
    }).then(result => {
        if (result) {
            return result.update(data)
        } else {
            throw Error('Books not Found')
        }
    }).then(result => {
        res.json(response.success(result))
    }).catch(error => {
        res.json(response.error(500, error.message))
    })
}
//----------------------------------------------------------//


module.exports = BooksController