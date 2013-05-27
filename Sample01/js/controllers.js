function TodoController($scope, Todo, Dica, Usuario) {
    
    $scope.Usuario = { Email: '', Senha: '' };    		    
	$scope.todos = Todo.query();

	$scope.selectTodo = function (id) {
		$scope.todo = _.where($scope.todos, {_id: id})[0];
	}

	$scope.newTodo = function () {
		$scope.todo = new Todo();
	}
    
	$scope.teste = function () {
		$.mobile.changePage('#teste-list');
	}
    
	$scope.TelaLogin = function () {
		$.mobile.changePage('#login');
	}
    
	$scope.Experimente = function () {
		$.mobile.changePage('#dicas');
  
		$scope.ListaDica = Dica.all({
			limit: 3,
			sort: {
				_id: -1
			}
		});
	}
    
	$scope.doLogin = function () {		
		$scope.qtd = Usuario.count({
			Email: $scope.Usuario.Email,
			Senha: $scope.Usuario.Senha
		}, retorno);                				
	}
    
	function retorno(result) {		
		if (result == 0) {
			$.mobile.changePage('#dicas');
		}
		else {
			$.mobile.changePage('#teste-list');
		}
	}
	
	$scope.saveTodo = function () {
		if ($scope.todo._id == null) {
			Todo.save({}, $scope.todo, function (data) {
				$scope.todos.push(data);
			});
		}
		else {
			Todo.update({todoId: $scope.todo._id}, $scope.todo, function (data) {
			});
		}
	}

	$scope.completeTodo = function (id) {
		Todo
		.delete({todoId: id}, function () {
			$scope.todos = _.without($scope.todos, $scope.todo);
		});
	}
}