var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home'),
    image = require('../controllers/image');

module.exports = function(app) {
    router.get('/', home.index); //두번 쨰 인자는 callback 함수.
    router.get('/images/:image_id', image.index);
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
    app.use(router);
};

//렌더링 엔진에는 jade, EJS, express-handlebars 같은 것이 잘 알려져 있다.