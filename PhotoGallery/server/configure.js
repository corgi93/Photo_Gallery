//Application이 필요로 하는 미들웨어를 불러오는 configure 모듈. 

var path = require('path'),
    routes = require('./routes'),
    exphandlebar = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    moment = require('moment'),
    multer = require('multer');

module.exports = function(app){
	/*핸들바 뷰. 
	동적 html 페이지를 그리기 위한 rendering engine중 핸들바 엔진 사용.
	confiure모듈에서 핸들바를 기본 렌더링 엔진으로 등록한다.
	*/
	app.engine('handlebars', exphandlebar.create({  //handlebars는 확장자.
		//두 번쨰 인자는 express-hbs 모듈의 create 함수를 사용해 렌더링 엔진을 구성.
		//create함수는 option이라는 객체를 받는 데, 이 객체는 서버를 위한 많은 설정 제공. 
		defaultLayout: 'main', //기본 레이아웃 설정
		layoutsDir: app.get('views')+'/layouts', //레이아웃 저장 위치정보.
		partialsDir: [app.get('views')+'/partials'],
		helpers: { //helper사용,
			timeago: function(timestamp){ //timeago라는 method정의. moment라는 모듈 사용.
				console.log(timestamp);
				return moment(timestamp).startOf('minute').fromNow();
			}
		}
	}).engine);
	app.set('view engine', 'handlebars');

	app.use(morgan('dev'));
	
	app.use(multer({ dest: path.join(__dirname,'public/upload/temp')}).single('file'));
	
	app.use(methodOverride());
	app.use(cookieParser('some-secret-value-here'));
	routes(app); // 경로들을 routes 폴더로 이동. express의 특별 구성요소로서, server에서 router를 사용하게 해주고 
	//GET,POST,PUT,UPDATE 같은 요청에 응답할 수 있게 해준다.
	app.use('/public/', express.static(path.join(__dirname, '../public'))); 

	if('development' === app.get('env')){
		app.use(errorHandler());
	}

	return app;
};
