class World extends MovableObject {
    gameEndScreen = new BackgroundObject('img/9.Intro _ Outro Image/_Game over_ screen/3.Game over.png', 0);
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = -0;
    statusBar = new Statusbar();
    statusbarBottles = new StatusbarBottles();
    statusbarCoins = new StatusbarCoins();
    throwableObjects = [];
    bottles = new Bottle();
    AUDIO_coin = new Audio('audio/coin.mp3');
    AUDIO_broke = new Audio('audio/broke.mp3');
    AUDIO_Chicken = new Audio('audio/chicken.mp3');
    AUDIO_Boss = new Audio('audio/chickenboss.mp3');
    AUDIO_throw = new Audio('audio/throw.mp3');










    constructor(canvas, keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkcollisions();

        }, 50)
        setInterval(() => {
            this.checkCollisionsWithEndboss();
            this.checkCollisionWithBottle();
            this.checkCollisionWithCoin();
            this.checkCollisionBottleAndEndboss();
            this.checkThrowObjects();
        }, 150);
        setInterval(() => {
            this.checkCollisionBottleAndEndboss();
            this.checkCharacterIsNearToEndboss();
        }, 2800)
    }

    checkThrowObjects() {
        if (this.keyboard.D) {

            if (this.statusbarBottles.amount > 0) {
                this.statusbarBottles.amount--;
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.statusbarBottles.setAmount();
                this.AUDIO_throw.play();
                this.checkCollisionBottleAndEndboss();
            }
        }
    }

    checkcollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!this.character.isDead() && !enemy.isDead() && !this.character.isHurt() && this.character.isColliding(enemy)) {

                if (this.character.isAboveGround()) {
                    console.log('chicken dead');
                    enemy.kill();
                    this.AUDIO_Chicken.play();
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }


            }

        });
    }

    checkCollisionBottleAndEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (endboss.isColliding(bottle)) {
                    endboss.endbossHurt();

                }
                if (endboss.isDead()) {
                    endboss.endbossDies();
                    this.AUDIO_Boss.play()
                    setTimeout(() => {
                        this.level.endboss.splice(this.level.endboss.indexOf(endboss), 1);
                    }, 943);
                }
            });
        });
    }

    checkCollisionWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.statusbarBottles.amount++;
                this.statusbarBottles.setAmount();
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                console.log('Collision with ', bottle);
                this.AUDIO_broke.play();

            }
        });
    }

    checkCollisionWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.statusbarCoins.amount++;
                this.statusbarCoins.setAmount();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                console.log('Collision with ', coin);
                this.AUDIO_coin.play();
            }
        });
    }

    checkCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCharacterIsNearToEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.x > 1800) {
                endboss.letEndbossWalk();
                console.log('Contact with endboss')
            }
            if (endboss.x < 0) {
                world.character.energy = 0;

            }
        });
    }



    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0); // back
        this.addToMap(this.statusBar);
        this.addToMap(this.statusbarBottles);
        this.addToMap(this.statusbarCoins);
        this.ctx.translate(this.camera_x, 0); // Forwards
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        if (this.character.isDead()) {
            this.addToMap(this.gameEndScreen);


        }












        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx);




        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


}