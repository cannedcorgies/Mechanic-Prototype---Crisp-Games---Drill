// The title of the game to be displayed on the title screen
title = "CHARGE RUSH";

// The description, which is also displayed on the title screen
description = `
`;

// The array of custom sprites
characters = [
`
  ll
  ll
ccllcc
ccllcc
ccllcc
cc  cc
`
];

// Game design variable container
const G = {
	WIDTH: 100,
	HEIGHT: 150,

    STAR_SPEED_MIN: 0.5,
	STAR_SPEED_MAX: 1.0,

	PLAYER_FIRE_RATE: 4,
	PLAYER_GUN_OFFSET: 3,

	FBULLET_SPEED: 5
};

// Game runtime options
// Refer to the official documentation for all available options
options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
    isCapturing: true,
    isCapturingGameCanvasOnly: true,
    captureCanvasScale: 2
};

// JSDoc comments for typing
/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Star
 */

/**
 * @type { Star [] }
 */
let stars;

/**
 * @typedef {{
 * pos: Vector,
 * angle: number,
 * rotation: number
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

// The game loop function
function update() {
    // The init function running at startup
	if (!ticks) {
        // A CrispGameLib function
        // First argument (number): number of times to run the second argument
        // Second argument (function): a function that returns an object. This
        // object is then added to an array. This array will eventually be
        // returned as output of the times() function.
		stars = times(20, () => {
            // Random number generator function
            // rnd( min, max )
            const posX = rnd(0, G.WIDTH);
            const posY = rnd(0, G.HEIGHT);
            // An object of type Star with appropriate properties
            return {
                // Creates a Vector
                pos: vec(posX, posY),
                // More RNG
                speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
            };
        });

        player = {
            pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
			angle: 0,
			rotation: rnd()
        };
	}
	
	if (player.pos.distanceTo(input.pos) > 5) {
		player.pos = vec(player.pos.x + (input.pos.x - player.pos.x)/10, player.pos.y + (input.pos.y - player.pos.y)/10);
	}
	player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);

	let angle = Math.PI + Math.atan2(-input.pos.x + player.pos.x, input.pos.y - player.pos.y);
	angle = (angle * 180 / Math.PI);
	let newAngle = (angle * 4)/360;
  	
	player.rotation = newAngle;
	
	color ("black");
    char("a", player.pos, {rotation: player.rotation});

	
    // Update for Star
    stars.forEach((s) => {
        // Move the star downwards
        s.pos.y += s.speed;
        // Bring the star back to top once it's past the bottom of the screen
        if (s.pos.y > G.HEIGHT) s.pos.y = 0;

        // Choose a color to draw
        color("light_black");
        // Draw the star as a square of size 1
        box(s.pos, rnd(1,5));
    });


}