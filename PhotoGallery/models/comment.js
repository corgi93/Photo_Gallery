var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
	image_id: {type: ObjectId}, //ObjectId 타입 필드로 정의.
	//이 field를 이용해 image에 표스팅되는 댓글의 관계를 생성.
	// 저장되는 ObjectId는 mongodb에 저장된 이미지 도큐먼트의 _id다.
	email: {type: String},
	name: {type: String},
	gravater: {type: String},
	comment: {type: String},
	timestamp: {type: Date, 'default': Date.now}
});

CommentSchema.virtual('image')
.set(function(image){
	this._image = image;
})
.get(function(){
	return this._image;
});

module.exports = mongoose.model('Comment', CommentSchema); //'Comment'라는 이름으로 내보낸다. 
// 주의: Schema를 모듈로 내보내는 게 아니라 Model을 내보내야한다.
// Schema 자체를 내보내는 건 의미 없기 떄문에.