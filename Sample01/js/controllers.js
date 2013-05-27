function TodoController($scope, Todo, Dica, Usuario) {
	$scope.Usuario = { Nome: '', Email: '', Senha: '' };    
    $scope.objeto = { DicaDesc: '' };              
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
		$scope.Usuario = new Usuario();
		$.mobile.changePage('#login');
	}
    
	$scope.TelaCadastro = function () {
		$.mobile.changePage('#cadastro');
	}
    
	$scope.Experimente = function () {
		$.mobile.changePage('#dicas');
  
		$scope.ListaDica = Dica.all({
			limit: 10,
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
    
	$scope.SalvarUsuario = function () {		
		oUsuario = new Usuario();
		oUsuario.Nome = $scope.Usuario.Nome;        
		oUsuario.Email = $scope.Usuario.Email;
		oUsuario.Senha = $scope.Usuario.Senha;
		oUsuario.$saveOrUpdate(changeSuccess);
	}
      
	function changeSuccess() {				
		$.mobile.changePage('#todo-list');
	}
    
    $scope.saveDica = function () {		
		oDica = new Dica();
        console.log($scope.objeto.DicaDesc);        
		oDica.DicaDesc = $scope.objeto.DicaDesc;        
		oDica.$saveOrUpdate(DicaSuccess);
        oDica = new Dica();
	}
      
	function DicaSuccess() {				
		AtualizaDicas(5);        
	}
    
	function retorno(result) {		
		if (result == 1) {
			$.mobile.changePage('#dicas');
            AtualizaDicas(7);
		}
		else {
			$.mobile.changePage('#todo-list');
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
		Todo.delete({todoId: id}, function () {
			$scope.todos = _.without($scope.todos, $scope.todo);
		});                
	}
    
	function AtualizaDicas(qtd) {
		$scope.ListaDica = Dica.all({
			limit: qtd,
			sort: {
				_id: -1
			}
		});
	}
}