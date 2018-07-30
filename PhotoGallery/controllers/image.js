var fs = require('fs');
var path = require('path');
var sidebar = require('../helpers/sidebar');
var Models = require('../models'); // models모듈을 정의.

module.exports = {
	//index, create, like, comment 는 route.js에서 라우팅한 인덱스들.
	index: (req,res)=>{
		var viewModel ={
			image:{ }, //image 프로퍼티
			comments: [] //comments 프로퍼티도 정의 image는 하나지만 comments는 배열로 여러 개 달 수 있게한다.
		};
		// Image 모델 반환.               $regex는 정규식.
		Models.Image.findOne({filename: {$regex: req.params.image_id}}, function(err,image){
			if(err){ throw err;}
			if(image){ // image객체 또한 null인지 확인. 아니라면 mongodb에서 data가 반환됐다는 뜻.
				image.views = image.views+1; // image 찾으면 조회수 증가.
				viewModel.image = image; // viewModel에 이미지 저장.
				image.save(); // 변경됐으므로 다시 저장.

				//Image와 연결되 있는 Comment모델을 반환하고 이미지에 속한 댓글(같은 image_id를 가진)들을 검색.
				Models.Comment.find({image_id: image._id}, {}, {sort : {'timestamp': 1}}, //올림차순 정렬.
					// findOne의 첫 인자는 viewModel이 참조하는 메인 이미지의 _id 프로퍼티와 일치하는 모든 댓글 
					//반환하도록 명시.
					function(err,comments){ 
						if(err){
							throw err;
						}
						viewModel.comments = comments; //viewModel에 댓글 컬렉션 저장.
						sidebar(viewModel, (viewModel)=>{ //viewModel과 같이 전송되는 sidebar 생성.
							res.render('image', viewModel); // viewModel로 페이지 렌더링.(handlebars)
						});
					}
				);
			}else{
				//redirect() 메소드 사용해서 새 image를 찾지 못하면 홈페이지로 돌아감
				res.redirect('/');
			}
		}); 
	},
	create: (req,res)=>{
		var saveImage = ()=>{ // saveImage를 함수로 선언해서(callback) saveImage 함수 내서 다시 원본 함수 호출이 가능(recursion)
            console.log('saving image');
            console.log(req.body);
            console.log(req.file.path);

			var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
			imgUrl = '';

			for(var i=0; i < 6; i+=1){
				imgUrl += possible.charAt(Math.floor(Math.random()*possible.length));
			}

			Models.Image.find({filename: imgUrl}, function(err,images){
				if(images.length > 0){
					saveImage();
				}else{
					//기존 작업 시작.
				}
			});	

			var tempPath = req.file.path;//업로드 파일이 저장될 임의 장소.
			var	ext = path.extname(req.file.originalname).toLowerCase(); // path.extname(url)파일 확장자 축출.
			var targetPath = path.resolve('./public/upload/' + imgUrl + ext); //업로드한 이미지가 최종 저장될 위치
		
			if(ext ==='.png' || ext === '.jpg' || ext==='.jpeg' || ext ==='.gif'){
				//fs(파일 시스템).rename(원본파일,새로운파일,콜백함수)
				fs.rename(tempPath, targetPath, (err)=>{
					if (err) throw err;

					var newImg = new Models.Image({ //newImage 요청한 변수로 담는다.
						title: req.body.title,
						description: req.body.description,
						filename: imgUrl + ext
					});
					newImg.save(function(err,image){
						console.log('Successfully inserted image: '+ image.filename);
						res.redirect('/images/'+image.uniqueId);
					});

				});	
			} else {
				//파일이 유효하지 않은 경우 원본파일 삭제하고 500 error 전송.
				fs.unlike(tempPath, ()=>{
					if (err) throw err;

					res.json(500, {error: 'Only image files are allowed.'});
				});
			}
		};
		saveImage();
	},
	like: (req,res)=>{
		res.json({likes: 1});
	},
	comment: (req,res)=>{
		res.send('The image: comment POST controller');
	}		
};