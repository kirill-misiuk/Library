const bookService = require('./book.service');

module.exports = function (app) {
    app.get('/:library/books/all', (req, res)=> {
        try {
         let data =  bookService.getAll();
            res.status(200).json({status: 200,  data, message: 'Succesfull GET All'})
        } catch (e) {
            return res.status(400).json({status: 400, message: e.message})
        }
    });
    app.get('/:library/books/:id',(req,res)=>{
        try{
            let data =  bookService.getOne(req.params.id);
            res.status(200).json({status: 200,  data})

        }catch (e) {
            return res.status(400).json({status: 400, message: e.message})
        }
    });
    app.post('/:library/books/create',(req,res)=>{
        try{
            let data =  bookService.create(req.body);
            res.status(201).json({status: 201,  data})

        }catch (e) {
            return res.status(400).json({status: 400, message: e.message})
        }

    })

};