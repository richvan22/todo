/**
 * Created by Richy on 2017-02-25.
 */
module.exports = function (app) {

    app.get('/mail', function (req, res) {
        //get data from mongodb and pass to the view
res.render('mail');
    });

    app.post('/mail', function (req, res) {
        //get data from mongodb and pass to the view

    });


}