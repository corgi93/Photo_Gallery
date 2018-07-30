var sidebar = require('../helpers/sidebar');
ImageModel = require('../models').Image; 
//Image모델만 사용하도록 선언. 이제 Image모델을 home컨트롤러에서 사용가능

module.exports = {
	index: (req,res)=>{
		var viewModel = {
			images:[] //임의의 고정된 데이터가 아닌 mongoose 모델을 이용해 실제 데이터 입력할 예정.
		};
		//정렬을 timestamp: -1로하면 내림차순. 1로하면 오름차순 정렬을 한다.
		ImageModel.find({},{},{ sort: { timestamp: -1 }}, function(err,images){
			if(err){
				throw err;
			}
			viewModel.images = images;
			
			sidebar(viewModel, (viewModel)=>{
				res.render('index', viewModel);
			});
		});

	}
};