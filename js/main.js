var $ = jQuery.noConflict();

(function($) {

	$('.modalButton').on('click', function(e) {
		var src = $(this).attr('data-src');

		//var width = $(this).attr('data-width') || 640; // larghezza dell'iframe se non impostato usa 640
		//var height = $(this).attr('data-height') || 360; // altezza dell'iframe se non impostato usa 360

		if($(this).attr('data-target') == "#modalvideo"){
			$("#modalvideo iframe").attr({
				'src': src,
				'allowfullscreen':''
			});
		}else{
			$("#modalAct iframe").attr({
				'src': src,
				'height': '550',
				'width': '100%',
				'allowfullscreen':''
			});
		}

	});

	$('#modalvideo').on('hidden.bs.modal', function(){
		$(this).find('iframe').html("");
		$(this).find('iframe').attr("src", "");
	});

	Drupal.behaviors.myViewsRefresh = {
		attach: function( context , settings) {

			$('.buscador-ubicacion').click(function(event){
				//Some code
				event.preventDefault();
				showPosition();

			});

		}
	}

	function showPosition(){

		if(navigator.geolocation){

			var geolocationMap = {};
			//  geolocationMap.settings = mapSettings.settings;

			geolocationMap.container = $('.geolocation-common-map-container');
			//  geolocationMap.container.show();

			var googleMap = null;

			if (typeof Drupal.geolocation.maps !== 'undefined') {
				$.each(Drupal.geolocation.maps, function (index, item) {
					if (typeof item.container !== 'undefined') {
						if (item.container.is(geolocationMap.container)) {
							googleMap = item.googleMap;
						}
					}
				});
			}

			navigator.geolocation.getCurrentPosition(function(position){
				var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=es';
				console.log(GEOCODING);

				$.getJSON(GEOCODING).done(function(location) {

					//$('.geolocation-views-filter-geocoder').val(location.results[6].formatted_address);
					$('.geolocation-views-filter-geocoder').val(location.results[0].address_components[2].long_name);

					$("input[name='field_restaurante_localizacion_boundary[lat_north_east]']").val(location.results[3].geometry.viewport.northeast.lat);
					$("input[name='field_restaurante_localizacion_boundary[lng_north_east]']").val(location.results[3].geometry.viewport.northeast.lng);
					$("input[name='field_restaurante_localizacion_boundary[lat_south_west]']").val(location.results[3].geometry.viewport.southwest.lat);
					$("input[name='field_restaurante_localizacion_boundary[lng_south_west]']").val(location.results[3].geometry.viewport.southwest.lng);

					$('.btn-location').trigger('click');

					/*
					$(context).find("input[name='" + elementId + "[lat_north_east]']").val(location.geometry.viewport.getNorthEast().lat());
					$(context).find("input[name='" + elementId + "[lng_north_east]']").val(location.geometry.viewport.getNorthEast().lng());
					$(context).find("input[name='" + elementId + "[lat_south_west]']").val(location.geometry.viewport.getSouthWest().lat());
					$(context).find("input[name='" + elementId + "[lng_south_west]']").val(location.geometry.viewport.getSouthWest().lng());
					*/

					/*

					console.log(location);
					console.log(location.results[2]);


					console.log("1"+location.results[0].address_components[5].long_name);
					console.log("2"+location.results[0].address_components[4].long_name);
					console.log("3"+location.results[0].address_components[3].long_name);
					console.log("4"+location.results[0].address_components[2].long_name);
					console.log("5"+location.results[0].address_components[1].long_name);
					console.log("6"+location.results[0].address_components[0].long_name);
					console.log("7"+location.results[0].formatted_address);
					console.log(position.coords.latitude);
					console.log(position.coords.longitude);

					*/

				})
				if(googleMap){

					var newCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

					if (!googleMap.getCenter().equals(newCenter)) {
						googleMap.setCenter(newCenter);
						googleMap.setZoom(11);
					}
				}

			});

		} else{
			alert("Sorry, your browser does not support HTML5 geolocation.");
		}
	}
})(jQuery,Drupal);
