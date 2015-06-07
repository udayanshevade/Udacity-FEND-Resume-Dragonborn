$(function() {

  function appendHTML(helperHTML, target, entity) {
    var formatted = helperHTML.replace("%data%", entity);
    target.append(formatted);
  }

  function prependHTML(helperHTML, target, entity) {
    var formatted = helperHTML.replace("%data%", entity);
    target.prepend(formatted);
  }

  function show(attribute) {
    $modal = $("#" + attribute);
    $modal.addClass("modal-visible");
  }

  var $introMenu = $(".intro-menu");
  var $quests = $(".quests");
  var $skills = $(".skills");


  // Bio JSON and related function

  var bio = {
    "name": "Dragonborn",
    "role": [
        "Good Samaritan",
        "Dragon of the North",
        "Adventurer"
    ]
};

  bio.display = function() {
    for (var i=0; i < bio.role.length; i++) {
      prependHTML(HTMLintroRole, $introMenu, bio.role[i]);
    }
    prependHTML(HTMLintroName, $introMenu, bio.name);
  };

  bio.display();


  // Quest JSON and related functions

  var quests = {
    "quests": [
      {
        "name": "Dragonslayer",
        "image": "img/dragonslayer.png",
        "location": "Sovngarde",
        "description": "Vanquished Alduin, the World Eater, leader of the ancient dragons, in battle alongside the great heroes of Sovngarde."
      },
      {
        "name": "Harbinger",
        "image": "img/harbinger.png",
        "location": "Ysgramor's Tomb",
        "description": "Avenged the death of the former Harbinger, Kodlak Whitemane, and became his successor to guide the Companions."
      },
      {
        "name": "Arch Mage",
        "image": "img/archmage.png",
        "location": "College of Winterhold",
        "description": "Saved Winterhold from destruction against Ancano, a powerful Thalmor intent on abusing the power of the Eye of Magnus."
      },
      {
        "name": "Thief",
        "image": "img/thief.png",
        "location": "Riften",
        "description": "Defeated a traitor of the Thieves' Guild, regained the blessings of Nocturnal, the Goddess of Night and Darkness, and returned the broken band to its former glory."
      },
      {
        "name": "Listener",
        "image": "img/listener.png",
        "location": "Dawnstar",
        "description": "Executed the most momentous assignment in the history of the Dark Brotherhood and saved the force from its forsaken fate."
      },
      {
        "name": "Hero of Skyrim",
        "image": "img/hero.png",
        "location": "Solitude",
        "description": "Fought in the great Battle For Solitude and captured the city back for its rightful people, the Nords of Skyrim."
      },
      {
        "name": "Hero of the People",
        "image": "img/beloved.png",
        "location": "Whiterun",
        "description": "Revived the Tree of Kynareth in Whiterun, dismantled corruption in Markarth and helped numerous other citizens across Skyrim in their times of need"
      }
    ]
  };

  quests.display = function() {
    var formattedHTMLquestImage;
    var formattedHTMLquestName;
    var formattedHTMLquest;

    // variables for each quest modal
    var formattedHTMLquestModalStart;
    var formattedHTMLquestModalTitle;
    var formattedHTMLquestModalLocation;
    var formattedHTMLquestModalDescription;

    // Compiles and formats HTML for each modal
    for (var j=0; j < quests.quests.length; j++) {
      formattedHTMLquestImage  = HTMLquestImage.replace("%data%", quests.quests[j].image);
      formattedHTMLquestName = HTMLquestName.replace("%data%", quests.quests[j].name).replace("%data%", quests.quests[j].name);
      formattedHTMLquest = formattedHTMLquestImage + formattedHTMLquestName;
      $quests.append(formattedHTMLquest);

      // formatting each quest modal
      formattedHTMLmodalStart = HTMLmodalQuestStart.replace("%data%", (quests.quests[j].name).split(" ").join(""));
      formattedHTMLquestModalTitle = HTMLmodalQuestTitle.replace("%data%", quests.quests[j].name);
      formattedHTMLquestModalLocation = HTMLmodalQuestLocation.replace("%data%", quests.quests[j].location);
      formattedHTMLquestModalDescription = HTMLmodalQuestDescription.replace("%data%", quests.quests[j].description);
      formattedHTMLmodalQuest = formattedHTMLmodalStart + formattedHTMLquestModalTitle + formattedHTMLquestModalLocation + formattedHTMLquestModalDescription + HTMLmodalEscape;
      $quests.append(formattedHTMLmodalQuest);
    }

    // Extract href value and open modal with that id
    $(".quest-entry").each(function() {
      $(this).click(function() {
        var $modalID = $(this).find(".modal-link").attr("href").split(" ").join("");
        show($modalID);
      });
    });

    $(".modal-escape, .modal-outer").click(function() {
      $(".modal-visible").removeClass("modal-visible");
    })
  };

  quests.display();


  // Skills JSON and related
  var skills = {
    "skills": [
      {
        "magic": [
          {
              "name": "Destruction",
              "proficiency": "Master",
              "level": 100,
              "description": "Control over the energies of fire, frost and shock. Destruction is one of the six skills of the Mage Archetype and enhances magical damage.",
              "image": "img/destruction.png"
          },
          {
              "name": "Restoration",
              "proficiency": "Adept",
              "level": 75,
              "description": "Control over the life forces. Restoration is one of the six skills of the Mage Archetype and enhances healing and protection.",
              "image": "img/restoration.png"
          }
        ]
      },
      {
        "combat": [
          {
            "name": "Archery",
            "proficiency": "Master",
            "level": 100,
            "description": "The art of using bows and arrows. Archery is one of the six skills of the Warrior Archetype and enhances long-distance combat.",
            "image": "img/archery.png"
          },
          {
            "name": "One-handed",
            "proficiency": "Master",
            "level": 90,
            "description": "The art of wielding light weapons. One-handed is one of the six skills of the Warrior Archetype and enhances close-range combat and dual-wielding.",
            "image": "img/onehanded.png"
          }
        ]
      },
      {
        "tactical": [
          {
            "name": "Light Armor",
            "proficiency": "Master",
            "level": 100,
            "description": "The capacity to wear effective armor. Light armor is one of the six skills of the Thief Archetype and enhances the ability to carry weight and wear lighter armor.",
            "image": "img/lightarmor.png"
          },
          {
            "name": "Sneak",
            "proficiency": "Master",
            "level": 100,
            "description": "The art of moving unseen and unheard. Sneak is one of the six skills of the Thief Archetype and enhances the ability to carry out missions unnoticed.",
            "image": "img/sneak.png"
          },
          {
            "name": "Lockpicking",
            "proficiency": "Apprentice",
            "level": 50,
            "description": "The ability to open locked doors and containers. Lockpicking is one of the six skills of the Thief Archetype and enhances breaking open mechanical seals.",
            "image": "img/lockpicking.png"
          }
        ]
      },
      {
        "shouts": [
          {
              "name": "Aura Whisper",
              "proficiency": "Master",
              "level": 100,
              "description": "The power to detect the aura of any creature, living or undead. Aura Whisper is a dragon shout that finds and illuminates friends and foes at a certain range for a limited time.",
              "image": "img/aurawhisper.png"
          },
          {
              "name": "Become Ethereal",
              "proficiency": "Adept",
              "level": 66.66,
              "description": "The power to turn incorporeal. Become Ethereal is a dragon shout that turns its user spectral for a limited time, avoiding damage until an attack is performed.",
              "image": "img/pull.png"
          },
          {
              "name": "Disarm",
              "proficiency": "Master",
              "level": 100,
              "description": "The power to disarm foes. Disarm is a dragon shout that rips the weapons out of an enemy's hands and renders them ineffective.",
              "image": "img/push.png"
          },
          {
              "name": "Fire Breath",
              "proficiency": "Master",
              "level": 100,
              "description": "The power to breathe fire. Fire Breath is a dragon shout that emanates a forceful blast of fire at a great speed.",
              "image": "img/fire.png"
          },
          {
              "name": "Ice Form",
              "proficiency": "Master",
              "level": 100,
              "description": "The power to freeze foes. Ice Form is a dragon shout that freezes and immobilizes enemies attacking from the front.",
              "image": "img/ice.png"
          }
        ]
      }
    ]
  }

  skills.display = function() {
    for (var k = 0; k < skills.skills.length; k++) {
      var skill = Object.keys(skills.skills[k])[0];
      appendHTML(HTMLskillsSectionStart, $skills, skill);
      if (k % 2 === 0) {
        $("." + skill).css("background-color", "#000").css("color", "white");
      }
    }
  };

  skills.display();



  // Goals display and related function

  var goals = {
    "goals" : [
      {

      }
    ]
  }


  // Handles the navigation scroll

  function autoScroll() {
    $("a[href*=#]:not([href=#])").click(function() {
      if (location.pathname.replace(/^\//,") == this.pathname.replace(/^\//,") && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
        if (target.length) {
          $("html,body").animate({
            scrollTop: target.offset().top
          }, 1200);
          return false;
        }
      }
    });
  };

  autoScroll();

});