var photoStickerApp = angular.module('PhotoStickerApp', ['ngFileUpload', 'LocalStorageModule', 'ngDragDrop']);

photoStickerApp.controller('photoStickerController', ['$scope', 'Upload', 'localStorageService', function($scope, Upload, localStorageService) {
	
	$scope.stepsModel = [];
	$scope.imageTitle = null;

	$scope.showMainImage = false;
	$scope.showMainImageBtn = true;

	$scope.mainImageUpload = function(event) {
		var file = event.target.files[0];

		var render = new FileReader();
		render.onload = $scope.mainImageIsLoaded;
		render.readAsDataURL(file);
	}

	$scope.mainImageIsLoaded = function(e) {
		$scope.$apply(function() {
			$scope.mainImage = e.target.result;
			$scope.showMainImage = true;
			$scope.showMainImageBtn = false;
		});
	}

	/*$scope.resetMainImage = function() {
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
	}*/

	// Get list of all stickers from localStorage
	for(var i=0, len=localStorage.length; i<len; i++) {
    	var key = localStorage.key(i);
    	var value = localStorage[key];
    	var allStickers = JSON.parse(value);
    	var stickers = JSON.parse(allStickers);
    	$scope.stepsModel.push(stickers);
 		
    }

    // Uploading all the stickers using form
	$scope.uploadPic = function(file) {

		if(localStorageService.isSupported) {
    		
    		Upload.base64DataUrl(file).then(function (url) {
				// console.log(url);

				var imgInfo = {
					imgTitle: $scope.imageTitle,
					imgUrl: url
				};
				var lsLength = localStorageService.length();
				localStorageService.set("img" + lsLength, JSON.stringify(imgInfo));

				$scope.stepsModel.push(imgInfo);
			});

  		}

	}

}]);

$(document).ready(function() {
	$('.thumb').draggable({
    	appendTo: '#photo-thumb',
    	cursor: 'move',
    	revertDuration: 1,
    	revert:"valid",
    	helper:"clone"
	});
	$('#photo-thumb').droppable({
    	accept: '.thumb',
        drop: function (event, ui) {
			ui.helper.clone().appendTo('#photo-thumb');
    	}
	});
});