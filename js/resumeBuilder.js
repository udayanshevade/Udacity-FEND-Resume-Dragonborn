$(function() {

  function appendHTML(helperHTML, target, entity) {
    var formatted = helperHTML.replace("%data%", entity);
    target.append(formatted);
  }

  function prependHTML(helperHTML, target, entity) {
    var formatted = helperHTML.replace("%data%", entity);
    target.prepend(formatted);
  }

  var $introMenu = $('.intro-menu');

  var bio = {
    'name' : 'Dragonborn',
    'role' : [
      'Good Samaritan',
      'Dragon of the North',
      'Adventurer',
    ]
  }

  bio.display = function() {
    for (i=0; i < bio.role.length; i++) {
      prependHTML(HTMLintroRole, $introMenu, bio.role[i]);
    }
    prependHTML(HTMLintroName, $introMenu, bio.name);
  };

  bio.display();


  //Handles the navigation scroll
  function autoScroll() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1200);
          return false;
        }
      }
    });
  };

  autoScroll();

});