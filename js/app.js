var photoStickerApp = angular.module('PhotoStickerApp', []);
photoStickerApp.controller('photoStickerController', function($scope) {
	
	$scope.stepsModel = [];

	$scope.showMainImage = false;
	$scope.showMainImageBtn = true;

	$scope.mainImageUpload = function(event) {
		// var files = event.target.files; // FileList object
		var file = event.target.files[0];

		var render = new FileReader();
		render.onload = $scope.mainImageIsLoaded;
		alert(render.onload);
		render.readAsDataURL(file);
	}

	$scope.mainImageIsLoaded = function(e) {
		$scope.$apply(function() {
			$scope.mainImage = e.target.result;
			$scope.showMainImage = true;
			$scope.showMainImageBtn = false;
		});
	}

	$scope.resetMainImage = function() {
		if ($scope.mainImage) {
			$scope.mainImage = " ";
		}
	}

	$scope.stickerImageUpload = function(event) {
		var files = event.target.files; // FileList object

		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var render = new FileReader();
			render.onload = $scope.stickerImageIsLoaded;
			render.readAsDataURL(file);
		}
	}

	$scope.stickerImageIsLoaded = function(e) {
		$scope.$apply(function() {
			$scope.stepsModel.push(e.target.result);
		});
	}

});

(function() {
	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');

	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var imageType = /image.*/;

		if (file.type.match(imageType)) {
			var reader = new FileReader();

			reader.onload = function(e) {
				fileDisplayArea.innerHTML = "";

				var img = new Image();
				img.src = reader.result;

				fileDisplayArea.appendChild(img);
			}

			render.readAsDataURL(file);
		}
		else {
			fileDisplayArea.innerHTML = "File not supported!";
		}

	});
});