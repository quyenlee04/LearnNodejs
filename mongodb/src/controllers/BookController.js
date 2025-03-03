const bookModel = require('../models/bookModel');

class BookController{
    async getAllbooks(req, res){
        try{
            const books = await bookModel.find({});
            res.status(200).json(books);
        }catch(error){
            res.status(500).send(error);
        }
    }

    //post
    async createBook(req, res){
        console.log(req.body);
        const book = new bookModel(req.body);
        try{
            const newbook = await book.save();
            res.status(201).json(newbook);
        }catch (error){
            res.status(500).send(error);
        }

       
    }

    //delete
    async deleteBook(req, res) {
        try {
            const { id } = req.params;
            const book = await bookModel.findById(id);
            if (!book) {
                return res.status(404).send('Book not found');
            }
            await bookModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    //update
    async updateBook(req, res) {
        try {
            const { id } = req.params; // Lấy id từ req.params
            const updatedBook = await bookModel.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedBook) return res.status(404).send('Book not found');
            res.status(200).json(updatedBook);
        } catch (error) {
            res.status(500).send(error);
        }
    }
       
   
async getBookById(req, res) {
    try {
        const { id } = req.params; 
        const book = await bookModel.findById(id);  
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);  
    } catch (error) {
        res.status(500).json({ error: "Invalid book ID format" });  
    }
}

    

}

module.exports = new BookController();