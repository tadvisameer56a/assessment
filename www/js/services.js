angular.module('starter.services', [])



.factory('orderCache', function($cacheFactory) {
	 return $cacheFactory('orderData');
	})