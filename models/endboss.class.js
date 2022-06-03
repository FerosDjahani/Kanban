class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 55;
    energy = 100;
    contactWithCharacter = false;

    IMAGES_ANGRY = [
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png'
    ];


    IMAGES_WALKING = [
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G1.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G2.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G3.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G4.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G13.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G14.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G15.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G16.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G17.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G18.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G19.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png',
    ];

    IMAGES_HURTING = [
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png'
    ];

    IMAGES_DEAD = [
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png',
        './img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png'
    ];


    constructor() {
        super().loadImage('./img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png');
        this.x = 2500;
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.1;
        this.animate();
    }

    endbossHurt() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
        let tt = setInterval(() => {
            this.playAnimation(this.IMAGES_HURTING);
        }, 400);
        setTimeout(() => {
            clearInterval(tt);
        }, 1000);
    }





    letEndbossWalk() {
        this.contactWithCharacter = true;
    }


    endbossDies() {
        let tt = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
            world.character.energy = 0;

        }, 350);


    }

    endbossMoveLeft() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }




    animate() {
        setInterval(() => {
            if (this.isHit == false) {
                this.playAnimation(this.IMAGES_ANGRY);
            }
            if (this.contactWithCharacter == true) {
                this.playAnimation(this.IMAGES_WALKING);
                this.endbossMoveLeft();
            }
        }, 210);

    }
}