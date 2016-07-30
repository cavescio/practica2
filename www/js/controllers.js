angular.module('starter.controllers', [])

.controller('controlPuntoUno', function($scope, $cordovaVibration, $cordovaToast, $ionicPlatform) {
	$scope.punto="1";

	$ionicPlatform.ready(function() {
		$scope.vibrar = function() {
			console.log("vibrando");
			$cordovaVibration.vibrate(1000000);
		}
		$scope.noVibrar = function() {
			console.log("sin vibrar");
			$cordovaVibration.vibrate(0);
		}
	});
})




.controller('controlPuntoCuatro', function($scope, $ionicPlatform, $window, $cordovaDeviceMotion, $cordovaFlashlight, $cordovaToast){
  $scope.punto="4";

  $scope.mensaje= "NO";

  $scope.options = { 
        frequency: 50, // mide cada 50ms
        deviation : 25  // usamos el deviation para determinar el evento de movimiento, valores recomendados entre 25 y 30
    };

  $scope.datos = {};

  $scope.datos.pantallaAlto = $window.innerHeight;

  $scope.datos.pantallaAncho = $window.innerWidth;

  // Medidas previas    
    $scope.datos = {
        X : 80,
        Y : 10,
        Z : null,
        pantallaAlto : $window.innerHeight,
        pantallaAncho : $window.innerWidth, 
        timestamp : null
    }

  $ionicPlatform.ready(function () {

    $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);
    $scope.watch.then(
      null,
      function(error) {
      // An error occurred
      },
      function(result) {


       if(result.x > 1)
        {
          $scope.datos.X = $scope.datos.X-result.x;
          if($scope.datos.X<0) //si se va a la izquierda lo para en 0
          {
             $scope.datos.X=0;
          }
        }else
        {
          if(result.x < -1)
          {
             $scope.datos.X = $scope.datos.X-result.x;
             if($scope.datos.X >190)
             {
               $scope.datos.X=190;
             }
          }
        }



      if(result.y < -1)//cuando va para arriba el icono
      {
        $scope.datos.Y = $scope.datos.Y + result.y;
         if ($scope.datos.Y < 150)//si no pasa la mitad de la pantalla
          {
            $scope.mensaje= "NO";
            $cordovaFlashlight.switchOff();
          }
      }
      if(result.y > 1)//cuando va para abajo el icono
        {
          $scope.datos.Y = $scope.datos.Y + result.y;
          if ($scope.datos.Y >= 150)//si pasa la mitad de la pantalla 
          {
            $scope.mensaje= "SI";
            $cordovaFlashlight.switchOn();
            $cordovaToast.showShortCenter('Pasó la mitad de la pantalla');
          }
        }
    }); //fin del ionicPlatform.ready

  }, false);

})






.controller('controlPuntoCinco', function($scope) {
	$scope.punto="5";
})

.controller('controlPuntoTres', function($scope, $ionicPlatform, $cordovaDevice) {
	$scope.punto="3";
	$ionicPlatform.ready(function(){
		$scope.device = $cordovaDevice.getDevice();
		$scope.model = $cordovaDevice.getModel();
		$scope.version = $cordovaDevice.getVersion();
		$scope.platform = $cordovaDevice.getPlatform();
		$scope.manufacturer = $cordovaDevice.getManufacturer();

	},false)
})

.controller('controlPuntoDos', function($scope, $cordovaDeviceMotion, $ionicPlatform, $window) {
  $scope.punto="2";

  $scope.options = { 
        frequency: 50, // mide cada 50ms
        deviation : 25  // usamos el deviation para determinar el evento de movimiento, valores recomendados entre 25 y 30
    };

  $scope.datos = {};

  // Medidas previas    
    $scope.datos = {
        X : 100,
        Y : 150,
        Z : null,
        pantallaAlto : $window.innerHeight,
        pantallaAncho : $window.innerWidth, 
        timestamp : null
    }

  $ionicPlatform.ready(function () {

    $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);
    $scope.watch.then(
      null,
      function(error) {
      // An error occurred
      },
      function(result) {


      // $scope.datos.X = result.x + 100;
      // $scope.datos.Y = result.y + 150;
      // $scope.Z = result.z;

      //$scope.timeStamp = result.timestamp;


       if(result.x > 1)
        {
          $scope.datos.X = $scope.datos.X-result.x;
          if($scope.datos.X<0) //si se va a la izquierda lo para en 0
          {
             $scope.datos.X=0;
             //$cordovaVibration.vibrate(100);
          }
        }else
        {
          if(result.x < -1)
          {
             $scope.datos.X = $scope.datos.X-result.x;
             if($scope.datos.X >190)
             {
               $scope.datos.X=190;
               //$cordovaVibration.vibrate(200);
             }
          }
        }

      if(result.y < -1)
      {
        $scope.datos.Y = $scope.datos.Y + result.y;
        if($scope.datos.Y<0) //si se va por arriba lo detiene en 0
        {
          $scope.datos.Y=0;
          //$cordovaVibration.vibrate(100);
        }
      }else
      {
        if(result.y > 1)
        {
          $scope.datos.Y = $scope.datos.Y + result.y;
          if($scope.datos.Y>330) //si se va por abajo lo detiene en 330
          {
            $scope.datos.Y=330;
            //$cordovaVibration.vibrate(50);
          }
        }
      }

    }); //fin del ionicPlatform.ready

   /* $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
$scope.X = result.x;       $scope.Y = result.y;       $scope.Z = result.z;
$scope.timeStamp = result.timestamp;     }, function(err) {       // An error
occurred. Show a message to the user       alert("no funciona");     });*/

  }, false);


});
