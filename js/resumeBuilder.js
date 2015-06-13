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
  var $goals = $(".goals");


  // Bio JSON and related function

  var bio = {
    "name" : "Dragonborn",
    "role" : [
        "Good Samaritan",
        "Dragon of the North",
        "Adventurer"
    ],
    "welcomeMessage" : "Fus Ro Dah",
    "bioPic" : "helmet.png",
    "contacts" :
      {
        "email" : "dr4gunzsuk1965@yahoo.com",
        "facebook" : "https://www.facebook.com/pages/Then-I-Got-To-Thinking-Maybe-Im-The-Dragonborn/392543587478020",
        "github" : "github.com/dragonborn",
        "location" : "Whiterun"
      }
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
        "location": "Alduin's Wall",
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
        "location": "Twilight Sepulcher",
        "description": "Defeated a traitor of the Thieves' Guild, regained the blessings of Nocturnal, the Goddess of Night and Darkness, and returned the broken band to its former glory."
      },
      {
        "name": "Listener",
        "image": "img/listener.png",
        "location": "Dawnstar Sanctuary",
        "description": "Executed the most momentous assignment in the history of the Dark Brotherhood and saved the force from its forsaken fate."
      },
      {
        "name": "Hero of Skyrim",
        "image": "img/hero.png",
        "location": "Castle Dour",
        "description": "Fought in the great Battle For Solitude and captured the city back for its rightful people, the Nords of Skyrim."
      },
      {
        "name": "Hero of the People",
        "image": "img/beloved.png",
        "location": "Eldergleam Sanctuary",
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
      formattedHTMLquestImage  = HTMLmodalImage.replace("%data%", quests.quests[j].image);
      formattedHTMLquestName = replaceAll(HTMLmodalName, "%data%", quests.quests[j].name);
      formattedHTMLquest = formattedHTMLquestImage + formattedHTMLquestName;
      $quests.append(formattedHTMLquest);

      // formatting each quest modal
      formattedHTMLmodalStart = HTMLmodalStart.replace("%data%", (quests.quests[j].name).split(" ").join(""));
      formattedHTMLmodalTitle = HTMLmodalTitle.replace("%data%", quests.quests[j].name);
      formattedHTMLmodalLocation = HTMLmodalLocation.replace("%data%", quests.quests[j].location);
      formattedHTMLmodalDescription = HTMLmodalDescription.replace("%data%", quests.quests[j].description);
      formattedHTMLmodal = formattedHTMLmodalStart + formattedHTMLmodalTitle + formattedHTMLmodalLocation + formattedHTMLmodalDescription + HTMLmodalEscape;
      $quests.append(formattedHTMLmodal);
    }

    // Extract data-target value and open modal with that id
    $(".modal-entry").each(function() {
      $(this).click(function() {
        var $modalID = $(this).find(".modal-tag").attr("data-target").split(" ").join("");
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
    "magic": [
      {
        "name": "destruction",
        "proficiency": "Master",
        "level": 100,
        "description": "Control over the energies of fire, frost and shock. Destruction is one of the six skills of the Mage Archetype and enhances magical damage.",
        "image": "img/destruction.png"
      },
      {
        "name": "restoration",
        "proficiency": "Adept",
        "level": 75,
        "description": "Control over the life forces. Restoration is one of the six skills of the Mage Archetype and enhances healing and protection.",
        "image": "img/restoration.png"
      }
    ],
    "combat": [
      {
        "name": "archery",
        "proficiency": "Master",
        "level": 100,
        "description": "The art of using bows and arrows. Archery is one of the six skills of the Warrior Archetype and enhances long-distance combat.",
        "image": "img/archery.png"
      },
      {
        "name": "one-handed",
        "proficiency": "Adept",
        "level": 90,
        "description": "The art of wielding light weapons. One-handed is one of the six skills of the Warrior Archetype and enhances close-range combat and dual-wielding.",
        "image": "img/onehanded.png"
      }
    ],
    "tactical": [
      {
        "name": "light armor",
        "proficiency": "Adept",
        "level": 75,
        "description": "The capacity to wear effective armor. Light armor is one of the six skills of the Thief Archetype and enhances the ability to carry weight and wear lighter armor.",
        "image": "img/lightarmor.png"
      },
      {
        "name": "sneak",
        "proficiency": "Master",
        "level": 100,
        "description": "The art of moving unseen and unheard. Sneak is one of the six skills of the Thief Archetype and enhances the ability to carry out missions unnoticed.",
        "image": "img/sneak.png"
      },
      {
        "name": "lockpicking",
        "proficiency": "Apprentice",
        "level": 50,
        "description": "The ability to open locked doors and containers. Lockpicking is one of the six skills of the Thief Archetype and enhances breaking open mechanical seals.",
        "image": "img/lockpicking.png"
      }
    ],
    "shouts": [
      {
        "name": "aura whisper",
        "proficiency": "Master",
        "level": 100,
        "description": "The power to detect the aura of any creature, living or undead. Aura Whisper is a dragon shout that finds and illuminates friends and foes at a certain range for a limited time.",
        "image": "img/aurawhisper.png"
      },
      {
        "name": "become ethereal",
        "proficiency": "Adept",
        "level": 66.66,
        "description": "The power to turn incorporeal. Become Ethereal is a dragon shout that turns its user spectral for a limited time, avoiding damage until an attack is performed.",
        "image": "img/pull.png"
      },
      {
        "name": "disarm",
        "proficiency": "Adept",
        "level": 66.66,
        "description": "The power to disarm foes. Disarm is a dragon shout that rips the weapons out of an enemy's hands and renders them ineffective.",
        "image": "img/push.png"
      },
      {
        "name": "fire breath",
        "proficiency": "Master",
        "level": 100,
        "description": "The power to breathe fire. Fire Breath is a dragon shout that emanates a forceful blast of fire at a great speed.",
        "image": "img/fire.png"
      },
      {
        "name": "ice form",
        "proficiency": "Adept",
        "level": 66.66,
        "description": "The power to freeze foes. Ice Form is a dragon shout that freezes and immobilizes enemies attacking from the front.",
        "image": "img/ice.png"
      }
    ]
  };

  skills.display = function() {
    var formattedHTMLtypeTitle;
    var formattedHTMLskillsName;
    var formattedHTMLmodalImage;
    var formattedHTMLmodalProficiency;
    for (var type in skills) {
      if (type === "display") {
        continue;
      }
      if (skills.hasOwnProperty(type)) {
        typeList = skills[type];
      }

      appendHTML(HTMLtypeTitle, $skills, type);
      appendHTML(HTMLskillsSectionStart, $skills, type);

      for (var skill = 0; skill < typeList.length; skill++) {
        var thisSkill = typeList[skill];
        var name = thisSkill.name;
        var id = name.split(" ").join("-");
        var img = thisSkill.image;
        var lvl = thisSkill.level;
        var prof = thisSkill.proficiency;

        appendHTML(HTMLskillsItem, $("." + type), id);
        formattedHTMLmodalImage = HTMLskillsModalImage.replace("%data%", img);
        formattedHTMLskillName = HTMLmodalName.replace("%data%", id).replace("%data%", name);
        formattedHTMLskill = formattedHTMLmodalImage + formattedHTMLskillName;
        $("." + id).append(formattedHTMLskill);

        // formatting each skill modal
        formattedHTMLmodalStart = HTMLmodalStart.replace("%data%", id);
        formattedHTMLmodalTitle = HTMLmodalTitle.replace("%data%", name);
        formattedHTMLmodalProficiency = HTMLmodalProficiency.replace("%data%", (id + "-mastery")).replace("%data%", prof);

        formattedHTMLmodalDescription = HTMLmodalDescription.replace("%data%", thisSkill.description);
        formattedHTMLmodal = formattedHTMLmodalStart + formattedHTMLmodalTitle + formattedHTMLmodalProficiency + formattedHTMLmodalDescription + HTMLmodalEscape;
        $skills.append(formattedHTMLmodal);

        // d3 skill charts
        var skillMeasure = id + "-mastery";
        var side = 200;
        var canvas = d3.select("." + skillMeasure)
                      .append("svg")
                      .attr("width", side)
                      .attr("height", side);
        var group = canvas.append("g")
                      .attr("transform", "translate(100,100)");

        var r = 80;
        var p = Math.PI * 2

        var arc = d3.svg.arc()
                  .innerRadius(40)
                  .outerRadius(r)
                  .startAngle(0)
                  .endAngle(p * (lvl/100));

        group.append("path")
              .attr("d", arc)
              .style("fill", "white")
              .attr("class", "skill-arc");
      }
    }

    // Skills Modals
    $(".skills-modal-entry").each(function() {
      $(this).click(function() {
        var $modalID = $(this).find(".modal-tag").attr("data-target").split(" ").join("");
        show($modalID);
        console.log("k");
      });
    });

    $(".modal-escape, .modal-outer").click(function() {
      $(".modal-visible").removeClass("modal-visible");
    })

  };

  skills.display();

  // External slick carousel for skills
  $(".skills-section").slick({
    centerMode : true,
    centerPadding : "60px",
    slidesToShow : 3,
    autoplay : true,
    autoplaySpeed : 2000,
    responsive : [
      {
        breakpoint : 750,
        settings : {
          arrows : false,
          centerMode: true,
          centerPadding : "40px",
        }
      },
      {
        breakpoint : 550,
        settings : {
          arrows : false,
          centerMode : true,
          centerPadding : "40px",
          slidesToShow : 1,
        }
      }
    ]
  });



  // Goals display and related function

  var goals = {
    "goals" : [
      {
        "name": "Dora the Explorer",
        "image": "img/dora.png",
        "location": "Froki's Shack",
        "description": "Discovered every known location in Skyrim."
      },
      {
        "name": "Home is Where the Hearth Is",
        "image": "img/citizen.png",
        "location": "Breezehome",
        "description": "After serving the Jarls of various Holds across Skyrim, purchased a house from each, becoming a settled citizen with a family."
      },
      {
        "name": "Happily Ever After",
        "image": "img/married.png",
        "location": "Temple of Mara",
        "description": "Found a suitor and presented the Amulet of Mara to the industrious Ysolda of Whiterun, for a quick and auspicious wedding."
      },
      {
        "name": "Golden Touch",
        "image": "img/gold.png",
        "location": "Understone Keep",
        "description": "Earned more than 100,000 gold."
      },
      {
        "name": "Skill Mastery",
        "image": "img/master.png",
        "location": "Labyrinthian",
        "description": "Successfully mastered skills by reaching level 100."
      },
      {
        "name": "Oblivion Walker",
        "image": "img/oblivion.png",
        "location": "Azura's Shrine",
        "description": "Served all Daedric Princes and collected their powerful holy artefacts as rewards."
      },
      {
        "name": "Master of Thuum",
        "image": "img/thuum.png",
        "location": "Throat of the World",
        "description": "Learned more than 20 Dragon Shouts."
      }
    ]
  }

  goals.display = function() {
    var formattedHTMLimage;
    var formattedHTMLname;
    var formattedHTMLselect;

    // variables for each quest modal
    var formattedHTMLmodalStart;
    var formattedHTMLmodalTitle;
    var formattedHTMLmodalLocation;
    var formattedHTMLmodalDescription;

    // Compiles and formats HTML for each modal
    for (var l=0; l < goals.goals.length; l++) {
      formattedHTMLimage  = HTMLmodalImage.replace("%data%", goals.goals[l].image);
      formattedHTMLname = HTMLmodalName.replace("%data%", goals.goals[l].name).replace("%data%", goals.goals[l].name);
      formattedHTMLselect = formattedHTMLimage + formattedHTMLname;
      $goals.append(formattedHTMLselect);

      // formatting each goals modal
      formattedHTMLmodalStart = HTMLmodalStart.replace("%data%", (goals.goals[l].name).split(" ").join(""));
      formattedHTMLmodalTitle = HTMLmodalTitle.replace("%data%", goals.goals[l].name);
      formattedHTMLmodalLocation = HTMLmodalLocation.replace("%data%", quests.quests[l].location);
      formattedHTMLmodalDescription = HTMLmodalDescription.replace("%data%", goals.goals[l].description);
      formattedHTMLmodal = formattedHTMLmodalStart + formattedHTMLmodalTitle + formattedHTMLmodalLocation + formattedHTMLmodalDescription + HTMLmodalEscape;
      $goals.append(formattedHTMLmodal);
    }

    // Extract data-target value and open modal with that id
    $(".modal-entry").each(function() {
      $(this).click(function() {
        var $modalID = $(this).find(".modal-tag").attr("data-target").split(" ").join("");
        show($modalID);
      });
    });

    $(".modal-escape, .modal-outer").click(function() {
      $(".modal-visible").removeClass("modal-visible");
    })
  };

  goals.display();


  // Courier Page

  var cities = {
    "whiterun" :
      {
        "name" : "Whiterun",
        "xPos" : -117.4,
        "yPos" : 37,
        "description" : "Home of the ancient Skyforge, the Tree of Kynareth, the famous Cloud District and the great Dragonsreach. Situated at the heart of Skyrim, there is no doubt this city has immense cultural and political importance.",
      },
    "falkreath" :
      {
        "name" : "Falkreath",
        "xPos" : -131.1,
        "yPos" : 24,
        "description" : ""
      },
    "windhelm" :
      {
        "name" : "Windhelm",
        "xPos" : -90,
        "yPos" : 43.5,
        "description" : ""
      },
    "solitude" :
      {
        "name" : "Solitude",
        "xPos" : -140.9,
        "yPos" : 57,
        "description" : ""
      },
    "morthal" :
      {
        "name" : "Morthal",
        "xPos" : -133,
        "yPos" : 48,
        "description" : ""
      },
    "dawnstar" :
      {
        "name" : "Dawnstar",
        "xPos" : -115.2,
        "yPos" : 56.5,
        "description" : ""
      },
    "markarth" :
      {
        "name" : "Markarth",
        "xPos" : -167.7,
        "yPos" : 38,
        "description" : ""
      },
    "riften" :
      {
        "name" : "Riften",
        "xPos" : -78,
        "yPos" : 23.2,
        "description" : ""
      },
    "winterhold" :
      {
        "name" : "Winterhold",
        "xPos" : -95.75,
        "yPos" : 55.7,
        "description" : ""
      }
  };

  var places = {
    "alduins-wall" :
      {
        "name" : "Alduin's Wall",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "azuras-shrine" :
      {
        "name" : "Azura's Shrine",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "college-of-winterhold" :
      {
        "name" : "College of Winterhold",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "ysgramors-tomb" :
      {
        "name" : "Ysgramor's Tomb",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "twilight-sepulcher" :
      {
        "name" : "Twilight Sepulcher",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "dawnstar-sanctuary" :
      {
        "name" : "Dawnstar Sanctuary",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "castle-dour" :
      {
        "name" : "Castle Dour",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "eldergleam-sanctuary" :
      {
        "name" : "Eldergleam Sanctuary",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "frokis-shack" :
      {
        "name" : "Froki's Shack",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "breezehome" :
      {
        "name" : "Breezehome",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "understone-keep" :
      {
        "name" : "Understone Keep",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "labyrinthian" :
      {
        "name" : "Labyrinthian",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "temple-of-mara" :
      {
        "name" : "Temple of Mara",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
    "throat-of-the-world" :
      {
        "name" : "Throat of the World",
        "xPos" : 10,
        "yPos" : 10,
        "description" : ""
      },
  }

  $('.map-section').append(HTMLmap);


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
  }

  autoScroll();

  window.bio = bio;
  window.quests = quests;
  window.skills = skills;
  window.goals = goals;
  window.cities = cities;
  window.places = places;

});