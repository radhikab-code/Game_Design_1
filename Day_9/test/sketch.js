// --- REQUIRED FILE STRUCTURE ---
// Your project folder should contain:
// 1. index.html
// 2. sketch.js (this file)
// 3. A folder named 'images' containing:
//    - turtle_egg.png
//    - turtle_walk.png
//    - plastic_bottle.png
//    - dead_fish.png
//    - can_trash.png
//    - apple.png

// --- GLOBAL VARIABLES ---
let speed = 50; // Turtle movement speed (distance per key press)
let gameState = 1; // 1: Hatching, 2: Walking
let tileSize = 8; // Size for the pixelated grid
let beachLimit = 4000; // X-coordinate where water starts (for fading)
let h = []; // Hue data for background
let s = []; // Saturation data for background
let b = []; // Brightness data for background
let isHatching = false;

// Image variables (loaded in preload)
let Image1, Image2, Image3, Image4;
let spriteImg, spriteImage;

// Turtle and Trash instances
let turtle;
let trashObjects = [];
let allTrashImages = [];

// Sprite data containers, populated in setup
let sprites = [];
let sWidth, sHeight;
let sprites1 = [];
let sWidth1, sHeight1;

// --- PRELOAD ---
function preload() {
    // Attempt to load all required images
    try {
        spriteImg = loadImage("images/turtle_egg.png");
        spriteImage = loadImage('images/turtle_walk.png');
        Image1 = loadImage('images/plastic_bottle.png');
        Image2 = loadImage('images/dead_fish.png');
        Image3 = loadImage('images/can_trash.png');
        Image4 = loadImage('images/apple.png');
    } catch (e) {
        // This catch block helps debug if images are not found in the 'images/' folder
        console.error("Image loading failed. Ensure 'images/' folder and files are present in your project root.", e);
    }
}

// --- CLASSES ---

/**
 * Represents a piece of beach trash, implementing a simple display and bounding box.
 */
class Trash {
    constructor(x, y, img, size) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.scaleFactor = size; 
        
        // Set collision dimensions based on scaled image size
        this.width = img.width * this.scaleFactor;
        this.height = img.height * this.scaleFactor;
        
        this.rotation = random(-15, 15);
    }

    display() {
        // Draw image, centered for rotation
        push();
        imageMode(CENTER);
        translate(this.x + this.width / 2, this.y + this.height / 2);
        rotate(this.rotation);
        // Check if image is loaded before attempting to draw
        if (this.img && this.img.width > 0) {
            image(this.img, 0, 0, this.width, this.height);
        }
        pop();

        // Optional: Uncomment to draw bounding box for debugging collision
        // noFill();
        // stroke(255, 0, 0); 
        // rect(this.x, this.y, this.width, this.height); 
    }
}


/**
 * Represents the Turtle, handling its state (hatching/walking), animation, position, and collision logic.
 */
class Turtle {
    constructor(spritesEgg, spritesWalk, sW, sH, sW1, sH1) {
        this.spritesEgg = spritesEgg;
        this.spritesWalk = spritesWalk;
        this.sWidthEgg = sW;
        this.sHeightEgg = sH;
        this.sWidthWalk = sW1;
        this.sHeightWalk = sH1;

        // Position (x, y) is the center of the turtle/egg image
        this.x = 300;
        this.y = height / 2;
        this.speed = 50; // Movement step size

        this.state = 1; // 1: Hatching, 2: Walking
        this.frame = 0; // Current animation frame index
        this.opacity = 255;
        this.rotation = 90; // Default: facing right (towards the ocean)
        this.scale = 0.5; // Fixed scale factor for display
    }

    /**
     * Performs an Axis-Aligned Bounding Box (AABB) collision check.
     * @param {Trash} trash - The trash object to check against.
     * @param {number} nextX - The potential next center x position of the turtle.
     * @param {number} nextY - The potential next center y position of the turtle.
     * @returns {boolean} True if collision occurs.
     */
    checkCollision(trash, nextX, nextY) {
        // Scaled turtle dimensions
        const turtleW = this.sWidthWalk * this.scale * 0.8; // Reduce size slightly for gentler collision
        const turtleH = this.sHeightWalk * this.scale * 0.8; 
        
        // Calculate the top-left corner of the turtle's bounding box at the next position
        const scaledX = nextX - turtleW / 2;
        const scaledY = nextY - turtleH / 2;

        // AABB check: check if the two boxes overlap
        return (
            scaledX < trash.x + trash.width &&
            scaledX + turtleW > trash.x &&
            scaledY < trash.y + trash.height &&
            scaledY + turtleH > trash.y
        );
    }

    // Check collision against all trash objects
    isBlocked(nextX, nextY, trashObjects) {
        // Only check for collision on the sand side (left of beachLimit)
        if (nextX >= beachLimit) return false;

        for (let trash of trashObjects) {
            // Only check trash that is properly initialized
            if (trash && trash.img && trash.img.width > 0 && this.checkCollision(trash, nextX, nextY)) {
                return true;
            }
        }
        return false;
    }

    move(xdir, ydir, trashObjects) {
        if (this.state !== 2) return;

        let nextX = this.x + this.speed * xdir;
        let nextY = this.y + this.speed * ydir;

        // Update rotation based on direction
        if (xdir === 1) this.rotation = 90;
        else if (xdir === -1) this.rotation = 270;
        else if (ydir === 1) this.rotation = 180;
        else if (ydir === -1) this.rotation = 0;

        // Check boundary of the play area (keep turtle within the canvas)
        nextX = constrain(nextX, 100, width - 100);
        nextY = constrain(nextY, 100, height - 100);

        // Collision check: if not blocked, update position
        if (!this.isBlocked(nextX, nextY, trashObjects)) {
            this.x = nextX;
            this.y = nextY;
            this.frame++; // Advance frame only if successfully moved
        } else {
            console.log("Movement blocked by trash!");
        }

        this.vanish();
    }

    hatch() {
        if (this.state !== 1) return;

        // Cycle through all egg frames (8 frames in total)
        if (this.frame < this.spritesEgg.length - 1 && isHatching) {
            this.frame++;
        } else if (isHatching) {
            this.state = 2; // Transition to walking
            this.frame = 0; // Reset frame for walk animation
        }
    }

    vanish() {
        // Turtle starts to fade as it enters the water near the beach limit
        if (this.x >= beachLimit - 100) {
            // Map the turtle's x position from the beach limit area to an opacity value (255 to 0)
            this.opacity = map(this.x, beachLimit - 100, width, 255, 0);
            this.opacity = constrain(this.opacity, 0, 255);
        } else {
            this.opacity = 255;
        }
    }

    display() {
        push();
        imageMode(CENTER);
        translate(this.x, this.y);

        if (this.state === 1) {
            // Hatching animation
            rotate(90); // Rotate the egg sprite to be horizontal
            if (this.spritesEgg.length > 0) {
                image(this.spritesEgg[this.frame % this.spritesEgg.length], 0, 0, this.sWidthEgg * this.scale, this.sHeightEgg * this.scale);
            }
        } else if (this.state === 2) {
            // Walking animation
            rotate(this.rotation);
            tint(255, this.opacity);
            if (this.spritesWalk.length > 0) {
                image(this.spritesWalk[this.frame % this.spritesWalk.length], 0, 0, this.sWidthWalk * this.scale, this.sHeightWalk * this.scale);
            }
            
            if (this.opacity === 0) {
                // Display success message when turtle vanishes in the water
                textSize(64);
                fill(360, 100, 100); // White
                textAlign(CENTER, CENTER);
                text("Journey Complete!", 0, -100);
                noLoop(); // Stop the animation
            }
        }
        pop();
    }
}


// --- SETUP FUNCTION ---

function setup() {
    // Create a wide canvas to show the beach to ocean transition
    createCanvas(5000, 800); 
    frameRate(8); // Slow frame rate for a pixelated animation style
    colorMode(HSB, 360, 100, 100); // Use HSB for easy color manipulation
    noStroke();
    angleMode(DEGREES);
    
    // 1. Prepare Background Data (fills the h, s, b arrays)
    setupBackground();

    // 2. Prepare Sprites (Egg Hatch)
    if (spriteImg) {
        const sRows = 2, sCols = 4;
        sWidth = spriteImg.width / sCols;
        sHeight = spriteImg.height / sRows;
        for (let i = 0; i < sRows; i += 1) {
            for (let j = 0; j < sCols; j += 1) {
                sprites.push(spriteImg.get(j * sWidth, i * sHeight, sWidth, sHeight));
            }
        }
    }

    // 3. Prepare Sprites (Turtle Walk)
    if (spriteImage) {
        const sRows1 = 2, sCols1 = 4;
        sWidth1 = spriteImage.width / sCols1;
        sHeight1 = spriteImage.height / sRows1;
        for (let i = 0; i < sRows1; i += 1) {
            for (let j = 0; j < sCols1; j += 1) {
                sprites1.push(spriteImage.get(j * sWidth1, i * sHeight1, sWidth1, sHeight1));
            }
        }
    }

    // 4. Initialize Turtle
    turtle = new Turtle(sprites, sprites1, sWidth, sHeight, sWidth1, sHeight1);

    // 5. Initialize Trash Objects
    allTrashImages = [Image1, Image3, Image4];
    const numTrash = 10;
    // Check if at least one trash image loaded successfully before creating objects
    if (allTrashImages.some(img => img && img.width > 0)) { 
        for (let i = 0; i < numTrash; i++) {
            let randImg = random(allTrashImages.filter(img => img && img.width > 0)); // Filter out failed images
            // Place trash only on the sand area
            let randX = random(400, beachLimit - 150); 
            let randY = random(100, height - 100);
            trashObjects.push(new Trash(randX, randY, randImg));
        }
    } else {
         console.warn("Trash objects skipped because images failed to load. Turtle can walk freely.");
    }
}

// --- BACKGROUND FUNCTIONS ---

// Generates the pixel color data for the entire canvas once
function setupBackground() {
    for (let y = 0; y < height; y += tileSize) {
        for (let x = 0; x < width; x += tileSize) {

            // Transition factor: 0 = sand (left), 1 = ocean (right)
            let t = constrain(map(x, beachLimit - 150, beachLimit + 150, 0, 1), 0, 1);

            // Sand colors
            let sandH = random(30, 40); 
            let sandS = random(25, 40);
            let sandB = random(85, 100);

            // Foam colors
            let foamH = random(180, 200); 
            let foamS = random(5, 20);
            let foamB = random(95, 100);

            // Ocean colors
            let oceanH = random(185, 195);
            let oceanS = random(45, 70);
            let oceanB = random(80, 100);

            // Blend colors based on the transition factor 't'
            if (t < 0.5) {
                // Phase 1: Sand (t=0) to Foam (t=0.5)
                let tt = map(t, 0, 0.5, 0, 1);
                h.push(lerp(sandH, foamH, tt));
                s.push(lerp(sandS, foamS, tt));
                b.push(lerp(sandB, foamB, tt));
            } else {
                // Phase 2: Foam (t=0.5) to Ocean (t=1)
                let tt = map(t, 0.5, 1, 0, 1);
                h.push(lerp(foamH, oceanH, tt));
                s.push(lerp(foamS, oceanS, tt));
                b.push(lerp(foamB, oceanB, tt));
            }
        }
    }
}

// Draws the pre-calculated background colors
function drawBackground() {
    let count = 0;
    for (let y = 0; y < height; y += tileSize) {
        for (let x = 0; x < width; x += tileSize) {
            fill(h[count], s[count], b[count]);
            rect(x, y, tileSize, tileSize);
            count++;
        }
    }
}


// --- DRAW LOOP ---

function draw() {
    drawBackground(); // Always redraw the background

    if (!turtle) return; // Exit if initialization failed

    // Hatching state is automatic
    if (turtle.state === 1) {
        turtle.hatch();
    }

    // Walking state is user-controlled via keys
    else if (turtle.state === 2) {
        let xdir = 0;
        let ydir = 0;

        // Determine direction based on key presses
        if (keyIsDown(RIGHT_ARROW)) {
            xdir = 1;
        } else if (keyIsDown(LEFT_ARROW)) {
            xdir = -1;
        } else if (keyIsDown(UP_ARROW)) {
            ydir = -1;
        } else if (keyIsDown(DOWN_ARROW)) {
            ydir = 1;
        }
        
        // Only attempt to move if a directional key is pressed
        if (xdir !== 0 || ydir !== 0) {
            turtle.move(xdir, ydir, trashObjects);
        }
    }
    
    // Display all game objects
    for (let trash of trashObjects) {
        trash.display();
    }
    turtle.display();
}

function keyPressed() {
  isHatching = true;
}
