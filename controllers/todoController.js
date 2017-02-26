var bodyParser = require('body-parser'),
    mongoose = require('mongoose'),

    urlencodedParser = bodyParser.urlencoded({extended: false});
var nodemailer = require('nodemailer');


// setup email data with unicode symbols
var mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object

mongoose.Promise = global.Promise;
// connect to db
mongoose.connect('mongodb://test:test@ds161069.mlab.com:61069/todo-document-objects');

// create schema -this is like a blueprint -what kind of info to expect
var todoSchema = new mongoose.Schema({
    item: String
});
//create model Todo based on schema ^
var Todo = mongoose.model('Todo', todoSchema),
    itemOne = Todo({item: 'buy flowers'}).save(function (err) {
        if (err) throw err;
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            debug: false,
            host: 'smtp.gmail.com',
            requireTLS: true,
            service: 'gmail',
            auth: {
                user: 'ronekambi@gmail.com',
                pass: ''
            },
            port: 25,
            secureConnection: false,
            tls: {
                ciphers:'SSLv3',
                rejectUnauthorized: false
            }
        });
        transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
        });
        console.log('item saved sucessfully');
    });

module.exports = function (app) {

    app.get('/todo', function (req, res) {
        //get data from mongodb and pass to the view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        });

    });

    app.post('/todo', urlencodedParser, function (req, res) {
        //get data from view, add to db
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function (req, res) {
        //delete the requested item from mongo db
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        })
    });

}