// Helper tags
// Intro page
var HTMLintroName = '<div class="intro-before">Meet the</><h1 class="intro-name">%data%</h1>';
var HTMLintroRole = '<h3 class="intro-role">%data%</h3>';

// Modals
var HTMLmodalImage = '<div class="col-12 modal-entry"><img class="modal-image" src="%data%" alt="Quest Image">';
var HTMLmodalName = '<h3 class="modal-tag" data-target="%data%-modal">%data%</h3></div>';
var HTMLmodalStart = '<div class="modal modal-outer modal-invisible" id="%data%-modal"><div class="modal-content">'
var HTMLmodalTitle = '<h3 class="modal-name">%data%</h3>';
var HTMLmodalLocation = '<h4 class="modal-location">[%data%]</h4>';
var HTMLmodalDescription = '<p class="modal-description">%data%</p>';

var HTMLmodalEscape = '<button class="modal-escape">[click anywhere to close]</button></div></div>';

// Skills Page
var HTMLskillsSectionStart = '<div class="col-12 skills-section %data%"></div>';
var HTMLtypeTitle = '<h2 class="col-12 skills-section-title">%data%</h2>';
var HTMLskillsItem = '<div class="skill-item %data%"></div>';
var HTMLskillsModalImage = '<div class="skills-modal-entry"><img class="modal-image" src="%data%" alt="Skill Image">';
var HTMLmodalProficiency = '<div class="skill-measure %data%"><h3 class="skill-proficiency">%data%</h3></div>';

// Contact Page
var HTMLmap = '<div id="map-canvas"></div>';
var HTMLemail = '<li class="contact-detail"><a class="contact-email" href="mailto:%data%?Subject=Re:Give Me Back My Sweet Roll">Email: %data%</a></li>'
var HTMLfacebook = '<li class="contact-detail"><a class="contact-facebook" href="%data%">Facebook</a></li>';
var HTMLnumber = '<li class="contact-detail"><a class="contact-number">Phone: %data%</a></li>';
var HTMLlocation = '<li class="contact-detail courier-message">Or send a courier to any one of these locations:</li>';
var HTMLbioPic = '<a href="#intro-page" class="bio-pic"><img src="%data%" alt="Helmet Picture"></a>';

/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
NOT USING
$(document).ready(function() {
  $('button').click(function() {
    var iName = inName($(".headerName")[0].textContent) || function(){};
    $('.headerName').html(iName);
  });
});
*/

// Used for error prevention in replacing string
function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

// Replace all instances of a string match in a string
function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

// Return item as a name suitable for an id (hyphenated, lowercase)
function idFyName(item) {
  item = replaceAll(item.toLowerCase(), ' ', '-');
  item = replaceAll(item, '\'', '')
  return item;
}

// Grabs all distinct locations from entries in resumeBuilder.js
function locationFinder() {

  var locations = [];
  var uniqueLocations = [];

  // Iterates through quest locations
  for (var quest in quests.quests) {
    locations.push(idFyName(quests.quests[quest].location));
  }

  // Iterates through goal locations
  for (var goal in goals.goals) {
    locations.push(idFyName(goals.goals[goal].location));
  }

  // Filters out repeating locations
  uniqueLocations = locations.filter(function(item, i, ar) {
    return ar.indexOf(item) === i;
  });
  // returns individual locations
  return uniqueLocations;
}

// Array to keep track of info windows
InfoWindowArray = [];

// Creates map markers with infowindows in fictional google map
function createMapMarker(placeData, type) {
  if (type === 'city') {
    var p = cities[placeData];
    var marker = placeData;
  }
  else {
    var p = places[placeData];
    var marker = 'marker';
  }

  var srcBase = 'img/places/';
  var ext = '.svg';
  var src = srcBase + marker + ext;
  var marker = new google.maps.Marker({
    map: map,
    icon: src,
    optimized: false,
    position: new google.maps.LatLng(p.yPos, p.xPos),
    title: p.name,
  });

  // Custom content for infowindow
  var InfoWindowContent = '<div class="info-window"><h4 class="place-title">' +
        p.name +
        '</h4><img class="place-image" alt="Place Image" src="' +
        p.img +
        '"><p class="place-description">' +
        p.description +
        '</p></div>';

  var InfoWindow = new google.maps.InfoWindow({content: InfoWindowContent});

  // Keep track of all infowindows
  InfoWindowArray.push(InfoWindow);



  // Listens for user clicking on a marker
  google.maps.event.addListener(marker, 'click', function() {
    // Cycle through and close all windows first
    // since later for-loop disallowed single infowindow
    for (var iwindow = 0; iwindow < InfoWindowArray.length; iwindow++) {
      InfoWindowArray[iwindow].close();
    }
    // open relevant infowindow
    InfoWindow.open(map, this);
  });

}

/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the ****  DOCUMENTATION  ***** below for more details.
!!!!!!
https://developers.google.com/maps/documentation/javascript/reference
!!!!!!
*/
var map;    // declares a global map variable


// Map

// Note: this value is exact as the map projects a full 360 degrees of longitude
var GALL_PETERS_RANGE_X = 800;

// Note: this value is inexact as the map is cut off at ~ +/- 83 degrees.
// However, the polar regions produce very little increase in Y range, so
// we will use the tile size.
var GALL_PETERS_RANGE_Y = 510;

function degreesToRadians(deg) {
  return deg * (Math.PI / 180);
}

function radiansToDegrees(rad) {
  return rad / (Math.PI / 180);
}

/**
 * @constructor
 * @implements {google.maps.Projection}
 */
function GallPetersProjection() {

  // Using the base map tile, denote the lat/lon of the equatorial origin.
  this.worldOrigin_ = new google.maps.Point(GALL_PETERS_RANGE_X * 400 / 800,
      GALL_PETERS_RANGE_Y / 2);

  // This projection has equidistant meridians, so each longitude degree is a linear
  // mapping.
  this.worldCoordinatePerLonDegree_ = GALL_PETERS_RANGE_X / 360;

  // This constant merely reflects that latitudes vary from +90 to -90 degrees.
  this.worldCoordinateLatRange = GALL_PETERS_RANGE_Y / 2;
};

GallPetersProjection.prototype.fromLatLngToPoint = function(latLng) {

  var origin = this.worldOrigin_;
  var x = origin.x + this.worldCoordinatePerLonDegree_ * latLng.lng();

  // Note that latitude is measured from the world coordinate origin
  // at the top left of the map.
  var latRadians = degreesToRadians(latLng.lat());
  var y = origin.y - this.worldCoordinateLatRange * Math.sin(latRadians);

  return new google.maps.Point(x, y);
};

GallPetersProjection.prototype.fromPointToLatLng = function(point, noWrap) {

  var y = point.y;
  var x = point.x;

  if (y < 0) {
    y = 0;
  }
  if (y >= GALL_PETERS_RANGE_Y) {
    y = GALL_PETERS_RANGE_Y;
  }

  var origin = this.worldOrigin_;
  var lng = (x - origin.x) / this.worldCoordinatePerLonDegree_;
  var latRadians = Math.asin((origin.y - y) / this.worldCoordinateLatRange);
  var lat = radiansToDegrees(latRadians);
  return new google.maps.LatLng(lat, lng, noWrap);
};

function initialize() {
  var locations;
  var gallPetersMapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {

      // Limits tile count, prevents 404 errors loading nonexistent tiles
      var xTiles = 7;
      var yTiles = 5;
      if (coord.x < 0 || coord.x > xTiles) {
        return null;
      }
      if (coord.y < 0 || coord.y > yTiles) {
        return null;
      }

      var baseURL = 'img/map-tiles/';
      baseURL += 'gall-peters_' + zoom + '_' + coord.x + '_' + coord.y + '.png';
      return baseURL;
    },
    tileSize: new google.maps.Size(256, 256),
    isPng: true,
    minZoom: 3,
    maxZoom: 3,
    name: 'Gall-Peters'
  });

  gallPetersMapType.projection = new GallPetersProjection();

  var mapOptions = {
    zoom: 3,
    backgroundColor: '#ddd',
    disableDefaultUI : true,
    scrollwheel: false,
    center: new google.maps.LatLng(37,-117.4),
    mapTypeControl: false
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  map.mapTypes.set('gallPetersMap', gallPetersMapType);
  map.setMapTypeId('gallPetersMap');


  var bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(15,-170),
      new google.maps.LatLng(85, -60)
  );

  locationsArray = locationFinder();

  // Add places visited map markers
  for (var location = 0; location<locationsArray.length; location++) {
    var place = locationsArray[location];
    createMapMarker(place, 'visited');
  }

  // Add city markers
  for (var city in cities) {
    createMapMarker(city, "city")
  }

  // Defines origin for map auto reset
  var lastValidCenter = map.getCenter();

  google.maps.event.addListener(map, 'center_changed', function() {
    if (bounds.contains(map.getCenter())) {
        // defines current center for map auto reset
        lastValidCenter = map.getCenter();
        return;
    }

    // else, out of bounds... return to last valid position
    map.panTo(lastValidCenter);
  });

}

google.maps.event.addDomListener(window, 'load', initialize);