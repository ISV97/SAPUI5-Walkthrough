sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.demo.OpenWeatherSample.controller.Main", {
		onInit: function() {
			
		},

		onPress: function () {
			//var sIn = sap.ui.getCore().getElementById("input0");
			//var sIn = sap.ui.getCore().getElementById("input0").getValue();
			var sIn = this.getView().byId("input0").getValue();
			//var sIn = this.getView().getModel().getProperty("/recipient/name");
			this._loadForecast(sIn);
		},

		_mapResults: function(results) {
			var oModel = this.getView().getModel();
			oModel.setProperty("/city", results.name);
			oModel.setProperty("/country", results.sys.country);

			var aForecastResults = [];
				if (results.main.temp < 10) {
						aForecastResults.push({	main: results.main.pressure,
					temp: results.main.temp,
					units: "Celsius",
					humidity: results.main.humidity,
					icon: "sap-icon://umbrella"});
					}
							else if (results.main.temp >= 10 && results.main.temp < 30) {
						aForecastResults.push({	main: results.main.pressure,
					temp: results.main.temp,
					units: "Celsius",
					humidity: results.main.humidity,
					icon: "sap-icon://cloud"});
					}
					else {
							aForecastResults.push({	main: results.main.pressure,
					temp: results.main.temp,
					units: "Celsius",
					humidity: results.main.humidity,
					icon: "sap-icon://heating-cooling"});
					}
		    
			/*	aForecastResults.push({	main: results.main.pressure,
					temp: results.main.temp,
					units: "Celsius",
					humidity: results.main.humidity
					} )	;*/
		/*	for (var i = 0; i < results.list.length; i++) {
				var oTemp = results.list[i].temp;
				var date = this._formatDate(results.list[i].dt * 1000);
				aForecastResults.push({
					date: date,
					temp: oTemp.day,
					units: "Celsius",
					humidity: results.list[i].humidity
				});
			}
					if (temp<10) {
					icon: "sap-icon://umbrella";
					}
							else if (temp>=10 && temp<30) {
						icon: "sap-icon://cloud";
					}
					else {
						icon: "sap-icon://heating-cooling";
					}
*/
			oModel.setProperty("/items", aForecastResults);
		},

		_loadForecast: function(bb) {
			var oView = this.getView();
			var oParams = {
				q:bb,  // Get the weather in london
				 units: "metric",
				APPID:"427c4a7147bdbd83b5c0b2187977ae1c" // replace with your API key
			  // get weather for the next 16 days
				  // get it in JSON format 
			};
			var sUrl = "//api.openweathermap.org/data/2.5/weather";
			oView.setBusy(true);

			var self = this;

			$.get(sUrl, oParams)
				.done(function(results) {
					oView.setBusy(false);
					self._mapResults(results);
				})
				.fail(function(err) {
					oView.setBusy(false);
					if (err !== undefined) {
						var oErrorResponse = $.parseJSON(err.responseText);
						sap.m.MessageToast.show(oErrorResponse.message, {
							duration: 6000
						});
					} else {
						sap.m.MessageToast.show("Unknown error!");
					}
				});
		}
	});
});