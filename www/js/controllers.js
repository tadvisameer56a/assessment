angular.module('starter.controllers', [])

.controller('imageController', function($scope, $cordovaCamera, $cordovaFile) {
    // 1
    $scope.images = [];


    $scope.addImage = function() {
        // 2
        var options = {
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };

        // 3
        $cordovaCamera.getPicture(options).then(function(imageData) {

            // 4
            onImageSuccess(imageData);

            function onImageSuccess(fileURI) {
                createFileEntry(fileURI);
            }

            function createFileEntry(fileURI) {
                window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
            }

            // 5
            function copyFile(fileEntry) {
                var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
                var newName = makeid() + name;

                window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                    fileEntry.copyTo(
                        fileSystem2,
                        newName,
                        onCopySuccess,
                        fail
                    );
                },
                fail);
            }

            // 6
            function onCopySuccess(entry) {
                $scope.$apply(function () {
                    $scope.images.push(entry.nativeURL);
                });
            }

            function fail(error) {
                console.log("fail: " + error.code);
            }

            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i=0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }

        }, function(err) {
            console.log(err);
        });
    }

    $scope ImageUrl = function(imageName) {
        var name = imageName.substr(imageName.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        return trueOrigin;
    }

   
})
.controller('SalesOrderCtrl', function($scope, $http, $stateParams,$localStorage, $ionicPopup, $timeout, $ionicLoading,orderCache) {

 $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        
		
		
		  $ionicLoading.hide();
						 
        $http.get("http://148.251.54.50:8080/testril/org.openbravo.service.json.jsonrest/Order?l=prateek&p=123456&_startRow=0&_endRow=1").
	  //  $http.get("/data/data.json").

					success(function(data,status,headers,config)
					{  orderCache.remove("orderData");
							$scope.oList=data.response.data;
							$scope.salesOrder=$scope.oList;
						   orderCache.put('orderData',$scope.oList);
						   $ionicLoading.hide();
					}).
					error(function(data,status,headers,config)
					{
						 $ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
     						title: 'Connection Error',
    						 template: 'Sorry!! Please check connection'
  							 });
  							 
					});
       
       

   
  



})
.controller('detailsSalesOrderCtrl', function($scope, $http, $stateParams,$localStorage, $ionicPopup, $timeout, $ionicLoading,orderCache) {
  $scope.salesOrderID = ($stateParams.id);
 
  if($scope.salesOrderID !=0)
        {
        	 var soCache = orderCache.get('orderData');
            
             
        	   for (i in soCache) {
                   if (soCache[i].documentNo == $scope.salesOrderID) {
                	  
                       $scope.detailData = angular.copy(soCache[i]);
                   }
               }
                	
        	}

});