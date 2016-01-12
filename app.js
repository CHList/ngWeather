var app = angular.module('weatherApp', []);
app.constant("apiKey", "2de143494c0b295cca9337e1e96b00e0")
app.controller('weatherController', function($scope,$http,$filter){
	$scope.title = 'What\'s the Temperature';
	$scope.isCity = false;

	$scope.getWeather = function(){
		$http({
			method: 'GET',
			url: 'http://api.openweathermap.org/data/2.5/weather?q='+ $scope.city +'&appid=' + apiKey + '&units=metric'
		}).then(function successCallback(response) {
			var data = response.data;
			var temperature = data.main.temp;
			var city = data.name;
			var min = data.main.temp_min;
			var max = data.main.temp_max;
			if ($filter('lowercase')(city) == $filter('lowercase')($scope.city)) {
				$scope.symbol = '℃';
				$scope.temperature = temperature;
				$scope.min = min;
				$scope.max = max;
				$scope.title = city + ' - ' + temperature + '℃';
				$scope.isCity = true;
			}else{
				$scope.message = 'I am not familiar with that city, Sorry';
				$scope.title = 'What\'s the Temperature'
				$scope.isCity = false;
			}
		});
	}

});
