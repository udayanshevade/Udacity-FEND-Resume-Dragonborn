// Helper tags

// Intro page
var HTMLintroName = '<div class="intro-before">Meet the</><h1 class="intro-name">%data%</h1>';
var HTMLintroRole = '<h3 class="intro-role">%data%</h3>';

// Modals
var HTMLmodalImage = '<div class="col-12 modal-entry"><img class="modal-image" src="%data%" alt="Quest Image">';
var HTMLmodalName = '<a class="modal-link" href="%data%-modal"><h3 class="modal-name">%data%</h3></a></div>';

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
var HTMLmodalProficiency = '<div class="%data%"><h3 class="skill-proficiency">%data%</h3></div>';

// Courier Page
var HTMLmap = '<div id="map"></div>';

/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  $('button').click(function() {
    var iName = inName($(".headerName")[0].textContent) || function(){};
    $('.headerName').html(iName);
  });
});


function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

  function idFyName(item) {
    item = replaceAll(item.toLowerCase(), " ", "-");
    item = replaceAll(item, "'", "")
    return item;
}

/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
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
      var numTiles = 1 << zoom;

      // Don't wrap tiles vertically.
      if (coord.y < 0 || coord.y >= numTiles) {
        return null;
      }

      // Wrap tiles horizontally.
      var x = ((coord.x % numTiles) + numTiles) % numTiles;

      // For simplicity, we use a tileset consisting of 1 tile at zoom level 0
      // and 4 tiles at zoom level 1. Note that we set the base URL to a
      // relative directory.
      var baseURL = 'img/';
      baseURL += 'gall-peters_' + zoom + '_' + x + '_' + coord.y + '.png';
      return baseURL;
    },
    tileSize: new google.maps.Size(800, 512),
    isPng: true,
    minZoom: 0,
    maxZoom: 0,
    name: 'Gall-Peters'
  });

  gallPetersMapType.projection = new GallPetersProjection();

  var mapOptions = {
    zoom: 0,
    disableDefaultUI : true,
    scrollwheel: false,
    center: new google.maps.LatLng(0,0),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'gallPetersMap']
    }
  };

  map = new google.maps.Map(document.getElementsByClassName('map-section'),
      mapOptions);

  map.mapTypes.set('gallPetersMap', gallPetersMapType);
  map.setMapTypeId('gallPetersMap');

  function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
      });
  }


  function locationFinder() {

    // initializes an empty array
    var locations = [];
    var uniqueLocations = [];

    // adds the single location property from bio to the locations array
    //locations.push(idFyName(bio.contacts.location));

    // iterates through school locations and appends each location to
    // the locations array
    for (var quest in quests.quests) {
      locations.push(idFyName(quests.quests[quest].location));
    }

    // iterates through work locations and appends each location to
    // the locations array
    for (var goal in goals.goals) {
      locations.push(idFyName(goals.goals[goal].location));
    }

    uniqueLocations = locations.filter(function(item, i, ar) {
      return ar.indexOf(item) === i;
    });

    return uniqueLocations;
  }

  function createMapMarker(placeData) {
    var loc = places.placeData;
    var lat = loc.yPos;  // latitude from the place service
    var lon = loc.xPos;  // longitude from the place service
    var name = loc.name;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name,

    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // opens infoWindow at selected marker
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, this);
    });

        // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }


  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results) {
    createMapMarker(results[0]);
  }


  function fetchCoords(loc) {
    console.log(loc);
    var x = places[loc].xPos;
    var y = places[loc].yPos;
    console.log(x,y);
  }

  // locations is an array of location strings returned from locationFinder()
  locationsArray = locationFinder();

  for (var i =0; i<locationsArray.length; i++) {
    fetchCoords(locationsArray[i]);
  }

}

google.maps.event.addDomListener(window, 'load', initialize);