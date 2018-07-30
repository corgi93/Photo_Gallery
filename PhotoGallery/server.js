var express = require('express');
var config = require('./server/configure'); // config 변수에 경로를 불러온다.
var app = express();
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/stylegallery';

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views'); //html템플릿(view)의 위치를 작업 폴더 내의 views 폴더로 설정.
app = config(app); //내가 작성한 config 모듈을 작동하게 한다.

mongoose.connect(url); // local에서 구동 중인 몽고db의url과 사용할 컬렉션의 경로.
mongoose.connection.on('open', function(){ // open event listener를 추가해 db와 연결시 간단한 log출력.
    console.log('Mongoose connected.');
});

var server = app.listen(app.get('port'), function(){
	console.log('Server up: http://localhost:'+ app.get('port'));
});