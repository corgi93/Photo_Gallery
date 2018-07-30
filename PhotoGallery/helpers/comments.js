module.exports = {
	newest: function(){
		var comments =[
			{
				image_id: 1,
				email: 'test@testing.com',
				name: 'user1',
				gravatar: 'http://lorempixel.com/75/75/animals/1/',
				comment: 'This is test comment...',
				timestamp: Date.now(),

				image: {
					uniqueId: 1,
					title: 'Sample Image 1',
					description: '',
					filename:'sample1.jpg',
					views: 0,
					likes: 0,
					timestamp: Date.now()
				}
			},
			{
				image_id: 1,
				email: 'gurwls714@naver.com',
				name: 'shinigjean',
				gravatar: 'http://lorempixel.com/75/75/animals/2/',
				comment: 'this is another picture!',
				timestamp: Date.now(),

				image: {
					uniqueId: 1,
					title: 'Sample Image 2',
					description: '',
					filename:'sample2.jpg',
					views: 0,
					likes: 0,
					timestamp: Date.now()
				}				
			}];
		return comments;
	}
};