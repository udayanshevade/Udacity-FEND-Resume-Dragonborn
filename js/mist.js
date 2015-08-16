$(function() {
    // Create an array to store our particles
    var particles = [];

    // The amount of particles to render
    var particleCount = 30;

    // The maximum velocity in each direction
    var maxVelocity = 1.5;

    // The target frames per second (how often do we want to update / redraw the scene)
    var targetFPS = 33;

    // Create an image object (only need one instance)
    var imageObj = new Image();

    // Once the image has been downloaded then set the image on all of the particles
    imageObj.onload = function() {
        particles.forEach(function(particle) {
                particle.setImage(imageObj);
        });
    };


    var canvas = document.getElementById('intro-canvas');

    // Set the dimensions of the canvas as variables so they can be used.
    var canvasWidth = $(canvas).width();
    var canvasHeight = $(canvas).height();

    var container = $(canvas).parent();

    // Once the callback is arranged then set the source of the image
    imageObj.src = "img/fog.png";

    var fogYUpperLimit;

    if ($(window).width() <= 500) {
        fogYUpperLimit = (canvasHeight/1.5);
    }
    else if (500 < $(window).width() <= 1200) {
        fogYUpperLimit = (canvasHeight/2);
    }
    else if (1200 < $(window).width()) {
        fogYUpperLimit = (canvasHeight/1.1);
    }
    var fogYLowerLimit = (canvasHeight);

    // A function to create a particle object.
    function Particle(context) {

        // Set the initial x and y positions
        this.x = 0;
        this.y = 0;

        // Set the initial velocity
        this.xVelocity = 0;
        this.yVelocity = 0;

        // Set the radius
        this.radius = 4;

        // Store the context which will be used to draw the particle
        this.context = context;

        // The function to draw the particle on the canvas.
        this.draw = function() {

            // If an image is set draw it
            if(this.image){
                this.context.drawImage(this.image, this.x-128, this.y-128);
                // If the image is being rendered do not draw the circle so break out of the draw function
                return;
            }
            // Draw the circle as before, with the addition of using the position and the radius from this object.
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = "rgba(0, 255, 255, 1)";
            this.context.fill();
            this.context.closePath();
        };

        // Update the particle.
        this.update = function() {
            // Update the position of the particle with the addition of the velocity.
            this.x += this.xVelocity;
            this.y += this.yVelocity;

            // Check if has crossed the right edge
            if (this.x >= canvasWidth) {
                this.xVelocity = -this.xVelocity;
                this.x = canvasWidth;
            }
            // Check if has crossed the left edge
            else if (this.x <= 0) {
                this.xVelocity = -this.xVelocity;
                this.x = 0;
            }

            // Check if has crossed the bottom edge
            if (this.y >= fogYLowerLimit) {
                this.yVelocity = -this.yVelocity;
                this.y = fogYLowerLimit;
            }

            // Check if has crossed the top edge
            else if (this.y <= fogYUpperLimit) {
                this.yVelocity = -this.yVelocity;
                this.y = fogYUpperLimit;
            }
        };

        // A function to set the position of the particle.
        this.setPosition = function(x, y) {
            this.x = x;
            this.y = y;
        };

        // Function to set the velocity.
        this.setVelocity = function(x, y) {
            this.xVelocity = x;
            this.yVelocity = y;
        };

        this.setImage = function(image){
            this.image = image;
        }
    }

    // A function to generate a random number between 2 values
    function generateRandom(min, max){
        return Math.random() * (max - min) + min;
    }

    // The canvas context if it is defined.
    var context;

    // Initialise the scene and set the context if possible
    function init() {
        if (canvas.getContext) {

            // Set the context variable so it can be re-used
            context = canvas.getContext('2d');

            // Create the particles and set their initial positions and velocities
            for(var i=0; i < particleCount; ++i){
                var particle = new Particle(context);

                // Set the position to be inside the canvas bounds
                particle.setPosition(generateRandom(0, canvasWidth), generateRandom(fogYUpperLimit, fogYLowerLimit));

                // Set the initial velocity to be either random and either negative or positive
                particle.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));
                particles.push(particle);
            }
        }
        else {
            return;
        }
    }

    // The function to draw the scene
    function drawMist() {
        // Clear the drawing surface and fill it with a black background
        context.fillStyle = "rgba(0, 0, 0, 0.98)";
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        // Go through all of the particles and draw them.
        particles.forEach(function(particle) {
            particle.draw();
        });
    }

    // Update the scene
    function update() {
        particles.forEach(function(particle) {
            particle.update();
        });
    }

    // Initialize the scene
    init();

    // If the context is set then we can draw the scene (if not then the browser does not support canvas)
    if (context) {
        setInterval(function() {
            // Update the scene befoe drawing
            update();

            // Draw the scene
            drawMist();
        }, 1000 / targetFPS);
    }
});