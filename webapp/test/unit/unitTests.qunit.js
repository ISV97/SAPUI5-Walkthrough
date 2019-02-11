/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/demo/OpenWeatherSample/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});