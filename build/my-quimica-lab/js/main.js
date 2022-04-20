// Phaser config
var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  canvas: document.querySelector("canvas"),
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  pixelArt: true,
};

// Const
const PLAYER_VELOCITY = 160;
const REMOTE_ADDRESS =
  "https://raw.githubusercontent.com/MyQuimicaLab/MyQuimicaLab.github.io/master";

// Var
let game = new Phaser.Game(config);
let movController,
  inputController,
  player,
  resourceStands,
  tootipController,
  resourceController;

function preload() {
  let browserSupportCheck = new BrowserSupportController(
    this.sys.game.device
  ).checkCompatibility();

  if (!browserSupportCheck.support) {
    alert(
      "Ops! Parece que o seu dispositivo ainda não possui suporte às seguintes tecnologias: \n" +
        browserSupportCheck.notSupportedFeatures
    );

    if (browserSupportCheck.notSupportedFeatures.includes("canvas")) {
      window.location.replace("browser_doesnt_support.html");
    }
  }

  this.load.image(
    "lab-background-tile",
    "assets/Objects/lab-background-tile.png"
  );
  this.load.image(
    "lab-background-stuff",
    "assets/Objects/lab-background-stuff.png"
  );
  this.load.image(
    "constructionMaterial",
    "assets/Objects/resource-stand-1.png"
  );
  this.load.image("glassware", "assets/Objects/resource-stand-2.png");
  this.load.image("reagents", "assets/Objects/resource-stand-3.png");
  this.load.spritesheet("cientista", "assets/Characters/cientista-1.png", {
    frameWidth: 16,
    frameHeight: 20,
  });

  this.load.image("interact-tooltip", "assets/Tooltips/interact-tooltip.png");
}

function create() {
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.refresh();

  this.add.tileSprite(0, 0, 1600, 1600, "lab-background-tile").setScale(3);

  let backgroundStuff = this.physics.add.staticGroup();
  backgroundStuff
    .create(474, 0, "lab-background-stuff")
    .setScale(3)
    .refreshBody()
    .setSize(1000, 180)
    .setOrigin(0.5, 0);

  resourceStands = this.physics.add.staticGroup();
  resourceStands.name = "resource-stand-group";

  resourceStands
    .create(620, 375, "reagents")
    .setScale(3)
    .refreshBody()
    .setSize(95, 80)
    .setOrigin(0.5, 0.33);

  resourceStands
    .create(400, 200, "constructionMaterial")
    .setScale(3)
    .refreshBody()
    .setSize(90, 20)
    .setOrigin(0.5, 0.2);

  resourceStands
    .create(170, 400, "glassware")
    .setScale(3)
    .refreshBody()
    .setSize(90, 50)
    .setOrigin(0.5, 0.3);

  player = new Player(this, 400, 300, "cientista").setScale(3);

  //this.input.keyboard.createCursorKeys()
  const movementInputKeys = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  });

  movController = new MovementController(
    player,
    movementInputKeys,
    PLAYER_VELOCITY
  );

  resourceController = new ResourceController(
    [
      new ResourceCenter("reagents"),
      new ResourceCenter("glassware"),
      new ResourceCenter("constructionMaterial"),
    ],
    player.isCloseToGroup,
    resourceStands,
    player
  );

  let questionController = new QuestionControllerSingleton(
    REMOTE_ADDRESS,
    resourceController
  );

  // Key events
  inputController = new InputController(this.input);
  inputController.addKeyEvent(
    "E",
    questionController.getInstance().presentNewQuestion,
    resourceController,
    questionController.getInstance()
  );

  // Tooltip events
  tootipController = new TooltipController(this, player, player.isCloseToGroup);
  tootipController.addTooltipEvent("interact-tooltip", resourceStands);

  // Collider
  this.physics.add.collider(resourceStands, player);
  this.physics.add.collider(backgroundStuff, player);

  this.children.bringToTop(player);
}

function update() {
  //resourceCenterController.increment('reagents', 1);
  //resourceCenterController.increment('glASSwAre', '2');
  //resourceCenterController.increment('constructionMATERIAL', 3);
  movController.update();
  inputController.update();
  tootipController.update();
}
