$(function() {

  function appendHTML(helperHTML, target, entity) {
    var formatted = helperHTML.replace("%data%", entity);
    target.append(formatted);
  }

  var $introMenu = $('.intro-menu');

  var bio = {
    'name' : 'Dragonborn',
    'role' : 'Adventurer'
  }

  bio.display = function() {
    appendHTML(HTMLintroName, $introMenu, bio.name);
  };

  bio.display();

});