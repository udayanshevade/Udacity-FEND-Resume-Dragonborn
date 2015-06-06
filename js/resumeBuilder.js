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
  var $quests = $('.quests');

  var bio = {
    'name' : 'Dragonborn',
    'role' : [
      'Good Samaritan',
      'Dragon of the North',
      'Adventurer',
    ]
  };

  var quests = {
    quests:
    [
      {
        'name' : 'Dragonslayer',
        'image' : 'img/dragonslayer.png'
      },
      {
        'name' : 'Harbinger',
        'image' : 'img/harbinger.png'
      },
      {
        'name' : 'Arch Mage',
        'image' : 'img/archmage.png'
      },
      {
        'name' : 'Thief',
        'image' : 'img/thief.png'
      },
      {
        'name' : 'Listener',
        'image' : 'img/listener.png'
      },
      {
        'name' : 'Hero of Skyrim',
        'image' : 'img/hero.png'
      },
      {
        'name' : 'Hero of the People',
        'image' : 'img/beloved.png'
      },
    ]
  };

  bio.display = function() {
    for (i=0; i < bio.role.length; i++) {
      prependHTML(HTMLintroRole, $introMenu, bio.role[i]);
    }
    prependHTML(HTMLintroName, $introMenu, bio.name);
  };

  bio.display();

  quests.display = function() {
    var formattedHTMLQuestImage;
    var formattedHTMLQuestName;
    var formattedHTMLQuest;

    for (j=0; j < quests.quests.length; j++) {
      formattedHTMLQuestImage  = HTMLquestImage.replace("%data%", quests.quests[j].image);
      formattedHTMLQuestName = HTMLquestName.replace("%data%", quests.quests[j].name);
      formattedHTMLQuest = formattedHTMLQuestImage + formattedHTMLQuestName;
      $quests.append(formattedHTMLQuest);
    }
  };

  quests.display();


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