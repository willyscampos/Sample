var module1 = angular.module('TodoService', ['ngResource','mongolabResourceHttp']).factory('Todo', [
	'$resource', function ($resource) {
		var Todo = $resource('/api/todo/:todoId', {}, {
			update: { method: 'PUT'}
		});
		return Todo;
	}
]);

//var module1 = angular.module('TodoService', ['mongolabResourceHttp']);

module1.constant('MONGOLAB_CONFIG', {
	API_KEY: '-C2VHsm14UZLMS7aP-ZBGJjN-C-er-Qp',
	DB_NAME: 'mysocial'
});

module1.factory('Dica', function ($mongolabResourceHttp) {
	return $mongolabResourceHttp('Dica');
});

module1.factory('Usuario', function ($mongolabResourceHttp) {
	return $mongolabResourceHttp('Usuario');
});