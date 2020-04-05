
//mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ6ZW5jaGFuIiwiYSI6ImNqc2V5eDRnczBud3Y0YXFuZThhdDlucjgifQ.2wvGQ9Ok5wAZSVg5FRP06w';

//global variables to hold the end values needed to be displayed
var nearStopName="";
var nearStopCode=0;
var nearStopDist=0;
var nearStopTime=0;
var nearStopLat=0;
var nearStopLng=0;

var clickLat=0;
var clickLng=0;

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	//style: 'mapbox://styles/arzenchan/cjtj6g6pv17or1fp8p9zxm7qe',
	center: [-118.4912, 34.0195],
	zoom: 13
});

//click event
map.on('click', function (e) {
	//variables for holding click location
	var lat=0;
	var lng=0;
	
	clickLat=e.lngLat.lat//store the latlng of the click poin
	clickLng=e.lngLat.lng 
	console.log("Latitude: "+clickLat+"\nLongitude: "+clickLng);
	
	getNearStop();
});

map.on('load', function() {
    map.loadImage('busPointer.png', function(error, image) {
        if (error) throw error;
        map.addImage('busPointer', image);
        
		//adding the point that will move to your nearest stop
		map.addSource('stopPoint', {
		   type: 'geojson',
		   data: {
			   "type": "FeatureCollection",
			   "features": [{
				   "type": "Feature",
				   "properties": {},
				   "geometry": {
					   "type": "Point",
					   "coordinates": [0,0]
				   }
			   }]
		   }
		});
		
		map.addLayer({
            "id": "stopPoint",
            "type": "symbol",
            "source": "stopPoint",
            "layout": {
                "icon-image": "busPointer",
                "icon-size": .25,
				"icon-allow-overlap": true
            }
        });
    });
	
	//adding the point that will move to your click
	map.loadImage('clickPointer.png', function(error, image) {
        if (error) throw error;
        map.addImage('clickPointer', image);
        
		
		map.addSource('clickPoint', {
		   type: 'geojson',
		   data: {
			   "type": "FeatureCollection",
			   "features": [{
				   "type": "Feature",
				   "properties": {},
				   "geometry": {
					   "type": "Point",
					   "coordinates": [0,0]
				   }
			   }]
		   }
		});
		
		map.addLayer({
            "id": "clickPoint",
            "type": "symbol",
            "source": "clickPoint",
            "layout": {
                "icon-image": "clickPointer",
                "icon-size": .25,
				"icon-allow-overlap": true
            }
        });
    });
	
	//adding line that connects the two points
	map.addSource('connectLine', {
		   type: 'geojson',
		   data: {
			   "type": "FeatureCollection",
			   "features": [{
				   "type": "Feature",
				   "properties": {},
				   "geometry": {
					   "type": "LineString",
					   "coordinates": [[0,0][0,0]]
				   }
			   }]
		   }
		});
		
		map.addLayer({
            "id": "connectLine",
            "type": "line",
            "source": "connectLine",
            "layout": {
				"line-join": "round",
				"line-cap": "round"
			},
			"paint": {
				"line-color": "#3f597c",
				"line-width": 5
			}
        });
	
});

//MOVING THE NEAREST BUS POINT
function setBusPoint(){
	map.getSource('stopPoint').setData({
		"type": "FeatureCollection",
		  "features": [{
			  "type": "Feature",
			  "properties": { "name": nearStopName},
			  "geometry": {
				  "type": "Point",
				  "coordinates": [nearStopLng, nearStopLat]
			  }
		  }]
	});
}

//MOVING THE CLICK POINT
function setClickPoint(){
	map.getSource('clickPoint').setData({
		"type": "FeatureCollection",
		  "features": [{
			  "type": "Feature",
			  "properties": { "name": "User Click"},
			  "geometry": {
				  "type": "Point",
				  "coordinates": [clickLng, clickLat]
			  }
		  }]
	});
}

//MOVING THE POINT CONNECTING LINE
function setConnectLine(){
	map.getSource('connectLine').setData({
		"type": "FeatureCollection",
		  "features": [{
			  "type": "Feature",
			  "properties": { "name": "Connecting Line"},
			  "geometry": {
				  "type": "LineString",
				  "coordinates": [[nearStopLng, nearStopLat],[clickLng, clickLat]]
			  }
		  }]
	});
}

//GETTING STOP INFORMATION FROM THE FUSION TABLE
var stopData = [[]];
//following code taken from W3 schools tutorial here: https://www.w3schools.com/js/js_json_http.asp some variable names changed
function reqListener () {
  console.log(this.responseText);
}

var xmlhttp = new XMLHttpRequest();
var fusionURL = "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT * FROM 1VkLfFXYFWVZXwLd7bh0vbSy3NnNhcpG8Dqnj2aHR&key=AIzaSyCAs2D2Eofwq058okBoSK_W0B8wgAV6mHA"

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var stopsArr = JSON.parse(this.responseText);
        stopsParser(stopsArr);
    }
};

xmlhttp.open("GET", fusionURL, true);
xmlhttp.send();

function stopsParser(stopsArr) {
	//return to custom code
	stopData= stopsArr.rows;//move to global variable
	
	/* This code here prints all of the info in the JSON file that was extracted from Fusion Tables. Not necessary in final version.
	
	var stopID ="";
	var stopCod="";
	var stopNam="";
	var stopDsc=""
	var stopLat="";
	var stopLng="";
	
	for(var i=0; stopsArr.rows.length;i++){		
		stopID =stopData.rows[i][0];
		stopCod=stopData.rows[i][1];
		stopNam=stopData.rows[i][2];
		stopDsc=stopData.rows[i][3];
		stopLat=stopData.rows[i][4];
		stopLng=stopData.rows[i][5];
		console.log("StopID: " +stopID);
		console.log("StopCod: "+stopCod);
		console.log("StopNam: "+stopNam);
		console.log("StopDsc: "+stopDsc);
		console.log("StopLat: "+stopLat);
		console.log("StopLng: "+stopLng);
		console.log("----------------------------------")
	}
	*/
}


//GETTING TIME INFORMATION 

function getNextBus(stopIndex){
	var stopCode = stopData[stopIndex][1];
	//Bus URL
	var nextBusURL = ("http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=bigbluebus&stopId="+stopCode);//Adding the stop code at the end of the URL gives an XML of predictions&a
	
	
	//This code adapted from: https://www.w3schools.com/xml/tryit.asp?filename=try_dom_getattribute
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			myFunction(this);
		}
	};
	xhttp.open("GET", nextBusURL, true);
	xhttp.send();
	
	var nearTime = -1;
	
	function myFunction(xml) {
		var x, i, xmlDoc, txt;
		xmlDoc = xml.responseXML;
		
		x = xmlDoc.getElementsByTagName('prediction');
		for (i = 0; i < x.length; i++) { 
			var predTime = x[i].getAttribute('epochTime');
			console.log(predTime);
			if(predTime<nearTime||nearTime<0){//this sets the nearest time to the predicted time
				nearTime=predTime;
			}
		}
		nearStopTime=minBusTime(nearTime);
		displayInfo();
	}

	/*
	Here lies some broken dead end code. RIP. 
	
	//Copied from tutorial here: https://www.w3schools.com/xml/tryit.asp?filename=try_xpath_select_cdnodes
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			showResult(xhttp.responseXML);
		}
	};
	xhttp.open("GET", nextBusURL, true);
	xhttp.send(); 

	function showResult(xml) {
		var txt = "";
		var path = "//predictions/@seconds";
		
		
		var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
		var result = nodes.iterateNext();
		while (result) {
			txt += result.childNodes[0].nodeValue + "<br>";
			result = nodes.iterateNext();
		}
		console.log(txt);
	}
	
	
	/*
	"//prediction/@seconds"
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   // Typical action to be performed when the document is ready:
		   var xmlOut= xhttp.responseText;
		}
	};
	xhttp.open("GET", nextBusURL, true);
	xhttp.send();
	
	function showResult(xml) {
		var timeBus = "";
		path = "//prediction/@seconds"
		if (xml.evaluate) {
			var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
			var result = nodes.iterateNext();
			while (result) {
				timeBus += result.childNodes[0].nodeValue + "<br>";
				result = nodes.iterateNext();
			} 
			console.log(timeBus);
		}
	}
	/*
	//prediction/@seconds
	*/
}

function minBusTime(nearTime){
	console.log("Next Time is: "+nearTime);
	var curTime = (new Date).getTime();
	
	var timeDist = nearTime-curTime;
	
	console.log("This is "+timeDist+" milliseconds away.");
	
	return timeDist;
}

//FUNCTION FOR ACQUIRING NEAREST STOP

function getNearStop(){
	var minDist= -1;//storing the minimum distance. 
	var minIdx = -1;//if this remains -1, something went wrong. 
	console.log(stopData.length);
	for(var i=0;i<stopData.length;i++){
		var stopLat=stopData[i][4];
		var stopLng=stopData[i][5];
		
		//Old function, doesn't take into account latlong distance inaccuracies
		//var dist = Math.sqrt(Math.pow((clickLat-stopLat),2)+Math.pow((clickLng-stopLng),2));
		var dist = measure(clickLat,clickLng,stopLat,stopLng);
		
		//This measure fuction sourced from: https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
		function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
			var R = 6378.137; // Radius of earth in KM
			var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
			var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
			Math.sin(dLon/2) * Math.sin(dLon/2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			var d = R * c;
			return d * 1000; // meters
		}
		
		if(dist < minDist || minDist<0){
			minIdx=i;
			minDist=dist;
		}
		console.log(minDist);
	}
	if(minIdx<0){
		console.log("Something ain't right here...");
	}
	else{
		nearStopName=stopData[minIdx][2];
		nearStopDist=Math.floor(minDist);
		nearStopCode=stopData[minIdx][1];
		
		console.log("The nearest stop is: "+nearStopName+"\nDistance: "+nearStopDist+" metres away\nCode: "+nearStopCode);
	}
	nearStopLat=stopData[minIdx][4];
	nearStopLng=stopData[minIdx][5];
	
	//The stops are all at about 34 degrees latitude. 
	//1 deg Lat =~ 110922.36m 
	//1 deg Lng =~  92384.75m
	//numbers from: http://www.csgnetwork.com/degreelenllavcalc.html
	//busMarker(minIdx);
	getNextBus(minIdx);
}

//function for displaying all the final information gathered
function displayInfo(){
	
	var nearStopTimeSec= Math.floor(nearStopTime/1000);//need to divide by 1000 to get seconds. Milliseconds is just ugly
	var walkTime = Math.floor(nearStopDist/1.25);//a reasonable walk speed is 75m per minute. This is 1.25m/s
	
	//setting map displays
	setBusPoint();
	setClickPoint();
	setConnectLine();
	
	var displayText="";
	displayText+="The nearest stop is: <br><span class=\"highlight\">"+nearStopName+"</span><br>";
	displayText+="<br>";
	displayText+="It is "+nearStopDist+" metres away ";
	displayText+="and will take about "+walkTime+" seconds to walk there.<br>";
	if(nearStopTimeSec<0){
		displayText+="<br><span class=\"highlight\">";
		displayText+="This stop isn't giving any bus preditions. </span><br>";
	}
	else{
		displayText+="The next bus arrives in "+nearStopTimeSec+" seconds.<br>";
		if(nearStopTimeSec<walkTime){
			displayText+="<br><span class=\"highlight\">";
			displayText+="You're probably going to miss that bus.</span><br>";
		}
		else{
			displayText+="<br><span class=\"highlight\">";
			displayText+="You can make that bus!</span><br>";
		}
	}
	document.getElementById("displayInfo").innerHTML = displayText;
	
	
	
	/*
	This code is just for displaying all the info as an alert. DEPRECIATED
	
	var alertText = "";
	alertText+="The nearest stop is: "+nearStopName+"\n";
	alertText+="It is "+nearStopDist+" metres away.\n";
	alertText+="\n";
	alertText+="It will take about "+walkTime+" seconds to walk there\n";
	alertText+="The next bus arrives in "+nearStopTimeSec+" seconds\n";
	
	if(nearStopTimeSec<walkTime){
		alertText+="\n";
		alertText+="You're probably going to miss that bus.\n";
	}
	else{
		alertText+="\n";
		alertText+="You can make that bus!\n";
	}
	
	alert(alertText);
	*/
	
}


/*

function busMarker(minIdx){
	map.addLayer({
		"id": "points",
		"type": "symbol",
		"source": {
			"type": "geojson",
			"data": {
				"type": "FeatureCollection",
				"features": [{
					"type": "Feature",
					"geometry": {
						"type": "Point",
						"coordinates": [stopData[minIdx][4], stopData[minIdx][2]]
						
						// latitude first then longitude
					}
				}]
			}
		},
		"layout": {
			"icon-image": "bus",
			"icon-size": 0.25
		}
	});

}




/*
-----stopData key-----
0-id
1-code
2-name
3-desc
4-lat
5-long
...
11- wheelchair
and more but they're blank. BBB doesn't use zones, stop_url, location_type, parent_station, timezone,  
*/

