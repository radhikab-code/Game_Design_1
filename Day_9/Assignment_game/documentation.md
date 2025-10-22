Concept :

The concept began with an idea to create something interactive as well as informative. The motive was to educate the player about the increasing pollution and it's effect on aquatic life by making the player help the baby turtle who is just born go into the ocean. 

Design Approach:

The project combines pixelated environmental art (beach and ocean) with sprite-based animation (egg hatching and turtle walking).The art style was intentionally kept minimal and playful, inspired by old-school 2D games, to make the message feel engaging rather than didactic.

The game flow:

1. A turtle egg hatches on the beach.
2. The baby turtle walks towards the ocean.
3. The player uses arrow keys to move the turtle.
4. Randomly placed trash objects act as obstacles.
5. Upon reaching the water, the turtle fades out, accompanied by a message about plastic pollution.

Coding:

The background was procedurally generated using HSB color mode and tile-based rectangles.The left side represents sand, transitioning smoothly into foam and ocean blue tones on the right. The use of color interpolation (lerp) helps blend the different beach zones.I used sprite sheets for animation, one showing the turtle egg hatching and another for the turtle walking.Each frame of the sprite sheet was sliced and stored in arrays using the .get() function. Frame changes were controlled by the frameRate() and array indices to create smooth motion. The turtle’s movement was controlled through arrow key inputs, and its direction changed using translate() and rotate(). Random trash objects were generated with a class and placed using random(), while collision detection ensured the turtle couldn’t pass through them.

difficulties/error :

At first, I faced an error that stopped the turtle from moving forward. Once that was fixed, making the turtle move in all four directions became tricky. I solved this by using translate() and rotate() to control its direction smoothly. Placing the trash objects was another challenge, when I used random() for their positions, they often got cluttered in one area. I fixed this by increasing the spacing between each trash object. The collision detection was also difficult to get right. I used a sphere-based collision test, but when the radius was large, the turtle couldn’t move between two trash objects, making it hard to reach the ocean. Initially, I had seven trash objects, which made the game too difficult, so I reduced both the radius size and the number of trash objects to balance the gameplay.

Key Learnings:

Gained hands-on understanding of sprite animation, object-oriented programming, and collision logic in p5.js. Learned how to balance visual design and coding logic in an interactive environment. Understood how simple interactivity can convey powerful messages about environmental issues.