class ThrowableObject extends MovableObject {





    IMAGES_ROTATE = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png',

    ];

    IMAGES_SPLASH = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png',


    ];



    constructor(x, y) {
        super();
        this.loadImage('img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();



    }


    throw () {



        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {

            this.x += 10;

            if (this.isAboveGround()) {
                this.checksplashBottle();
            }
        }, 25);

        this.playInterval = setInterval(() => {
            this.checksplashBottle();
        }, 100);

    }

    checksplashBottle() {


        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_ROTATE);
        } else {
            this.playAnimation(this.IMAGES_SPLASH);
            setTimeout(() => {
                clearInterval(this.playInterval);
            }, 400)
        }
    }







}