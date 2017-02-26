/**
 * Created by Richy on 2017-02-24.
 */
var express = require('express'),
    expressVue = require('express-vue'),
    app = express(),
    todoController = require('./controllers/todoController');
/*
 app.set('views', __dirname + '/app/views');
 //Optional if you want to specify the components directory seperate to your views, and/or specify a custom layout.
 app.set('vue', {
 //ComponentsDir is optional if you are storing your components in a different directory than your views
 componentsDir: __dirname + '/components',
 //Default layout is optional it's a file and relative to the views path, it does not require a .vue extention.
 //If you want a custom layout set this to the location of your layout.vue file.
 defaultLayout: 'layout'
 });

 app.engine('vue', expressVue);
 app.set('view engine', 'vue');
 */


app.set('view engine', 'ejs');

app.use(express.static('./public'));

todoController(app);

app.listen(3000);
