const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
const frameCount = 3679;

const currentFrame = (index) => `./frame/${(index + 1).toString()}.png`;

const images = [];
let ball = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Create and preload the audio player
const audioPlayer = new Audio("Johnny Cash - Barbie Girl (A.i. Cover).m4a");
audioPlayer.preload = "auto";

// Play audio when animation starts (on first frame)
gsap.to(ball, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,
    pin: "canvas",
    end: "500%",
    onToggle: function (self) {
      if (self.isActive) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }
  },
  onUpdate: render,
});

// Text elements with their corresponding frames
const textElements = [
  { selector: ".music", startFrame: 25, endFrame: 100 },
  { selector: ".heading", startFrame: 120, endFrame: 300},
  { selector: ".monastery-title", startFrame: 310, endFrame: 390 },
  { selector: ".monastery-info", startFrame: 440, endFrame: 600 },
  { selector: ".printer-title", startFrame: 620, endFrame: 640 },
  { selector: ".printer-info", startFrame: 680, endFrame: 900 },
  { selector: ".piano-title", startFrame: 920, endFrame: 950 },
  { selector: ".piano-info", startFrame: 970, endFrame: 1140 },
  { selector: ".opera-title", startFrame: 1180, endFrame: 1251 },
  { selector: ".opera-info", startFrame: 1280, endFrame:  1440},
  { selector: ".radio-title", startFrame: 1500, endFrame: 1550 },
  { selector: ".radio-info", startFrame: 1575, endFrame:  1680},
  { selector: ".now-title", startFrame: 1758, endFrame: 1840 },
  { selector: ".now-info", startFrame: 1900, endFrame:  2200},
  { selector: ".lecture1", startFrame: 2222, endFrame:  2352},
  { selector: ".lecture2", startFrame: 2360, endFrame:  2490} ,
  { selector: ".lecture3", startFrame: 2360, endFrame:  2490} ,
  { selector: ".lecture4", startFrame: 2500, endFrame:  2700} ,
  { selector: ".lecture5", startFrame: 2500, endFrame:  2735}  ,
  { selector: ".explain1", startFrame: 2750, endFrame:  2770} ,
  { selector: ".explain2", startFrame: 2780, endFrame:  2920} ,
  { selector: ".explain3", startFrame: 2990, endFrame:  3070} ,
  { selector: ".question1", startFrame: 3120, endFrame:  3370},
  { selector: ".question2", startFrame: 3180, endFrame:  3350},
  { selector: ".question3", startFrame: 3190, endFrame:  3240},
  { selector: ".question4", startFrame: 3250, endFrame:  3330},
  { selector: ".question5", startFrame: 3250, endFrame:  3320},
  { selector: ".question6 ", startFrame: 3270, endFrame:  3310},
  { selector: ".question7 ", startFrame: 3230, endFrame:  3360},
  { selector: ".inspire1", startFrame: 3380, endFrame:  3400},
  { selector: ".inspire2", startFrame: 3402, endFrame:  3453},
  { selector: ".inspire3", startFrame: 3402, endFrame:  3453},
  { selector: ".inspire4", startFrame: 3460, endFrame:  3500},
  { selector: ".inspire5", startFrame: 3490, endFrame:  3521},
  { selector: ".inspire6 ", startFrame: 3564, endFrame:  3600},
  { selector: ".inspire7 ", startFrame: 3564, endFrame:  3600},
  { selector: ".final ", startFrame: 3630, endFrame:  3679}
];

// Function to animate text elements sequentially based on frame
function animateTextSequentially() {
  gsap.to({}, {
    duration: Infinity,
    onUpdate: () => {
      const currentFrame = Math.round(ball.frame);
      textElements.forEach(({ selector, startFrame, endFrame }) => {
        if (currentFrame >= startFrame && currentFrame <= endFrame) {
          gsap.to(selector, { opacity: 1, duration: 0.4 });
        } else {
          gsap.to(selector, { opacity: 0, duration: 0.1 });
        }
      });
    }
  });
}

animateTextSequentially();


// Set canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update canvas size and draw the image to fill the canvas
function render() {
  // Get the aspect ratio of the image
  const aspectRatio = images[0].width / images[0].height;

  // Calculate the scaled dimensions to fill the canvas
  const scaledWidth = canvas.width;
  const scaledHeight = canvas.width / aspectRatio;

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the image, scaling it to fill the canvas
  context.drawImage(images[ball.frame], 0, 0, scaledWidth, scaledHeight);
}

images[0].onload = render;
