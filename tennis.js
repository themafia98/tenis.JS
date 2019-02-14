
    let saveX = null;
    let saveY = null;


    const polygon = {
        width: 1140,
        height: 600
    };

    const greenPlayer = {
        width: 30 ,
        height: 150,
        coordsX: 0,
        coordsY: 0,
        move: function (type) {
            let player = type.querySelector('.greenPlayer');
            player.style.top = greenPlayer.coordsY;
        }
    };

    const bluePlayer = {
        width: 30,
        height: 150,
        coordsY: 0,
        coordsX: function () {
            return polygon.width - greenPlayer.width + 'px';
        },
        move: function (type) {
            let player = type.querySelector('.bluePlayer');
            player.style.left = bluePlayer.coordsX();
            player.style.top = bluePlayer.coordsY;

        }
    };

    const ballObj = {
        width: 60,
        height: 60,
        radius: 60,
        speed: 5,
        speedY: 5,
        coordsX:  parseInt(polygon.width / 2),
        coordsY: parseInt(polygon.height / 2),
        move: function (type) {
            let that = this;
            let ball = type.querySelector('.ball');
             saveX =  ballObj.coordsX;
             saveY = ballObj.coordsY;

            ball.style.left = ballObj.coordsX + that.speedY + 'px';
            ball.style.top = ballObj.coordsY + that.speed  + 'px';
            saveX = parseFloat(ball.style.left);
            saveY = parseFloat(ball.style.top);
        }
    };


    function createDOMelement() {

        const container = document.querySelector('.container');
        const poly = document.createElement('div');
        const ball = document.createElement('div');
        const green = document.createElement('div');
        const blue = document.createElement('div');
        document.addEventListener('keydown', down);


        poly.classList.add('poly');
        poly.style.width = polygon.width + 'px';
        poly.style.height = polygon.height + 'px';

        green.classList.add('greenPlayer');
        green.style.width = greenPlayer.width + 'px';
        green.style.height = greenPlayer.height + 'px';

        blue.classList.add('bluePlayer');
        blue.style.width = bluePlayer.width + 'px';
        blue.style.height = bluePlayer.height + 'px';

        ball.classList.add('ball');
        ball.style.width = ballObj.width + 'px';
        ball.style.height = ballObj.height + 'px';
        ball.style.borderRadius = ballObj.radius + 'px';

        poly.appendChild(green);
        poly.appendChild(blue);
        poly.appendChild(ball);

        container.appendChild(poly);

        poly.addEventListener('click',start);

        greenPlayer.move(document);
        bluePlayer.move(document);
        ballObj.move(document);

        function down(e) {
            let player = document.querySelector('.greenPlayer');
            let player2 = document.querySelector('.bluePlayer');

            if (e.shiftKey) {
                player.style.top = parseInt(player.style.top) - 15 + 'px';
                if (parseInt(player.style.top) < 0) {
                    player.style.top = 0 + 'px';
                }
            }
            if (e.ctrlKey) {
                player.style.top = parseInt(player.style.top) + 15 + 'px';
                if (parseInt(player.style.top) > 450) {
                    player.style.top = 450 + 'px';
                }
            }

            if (e.keyCode === 38) {
                player2.style.top = parseInt(player2.style.top) - 15 + 'px';
                if (parseInt(player2.style.top) < 0) {
                    player2.style.top = 0 + 'px';
                }
            }

            if (e.keyCode === 40) {
                player2.style.top = parseInt(player2.style.top) + 15 + 'px';
                if (parseInt(player2.style.top) > 450) {
                    player2.style.top = 450 + 'px';
                }
            }

        }

        requestAnimationFrame(down);

    }


    createDOMelement();


    function start() {
      //  let random = (getRandomArbitary(-1,1));
       // ballObj.speed =  ballObj.speed * random;
       // ballObj.speedY =  ballObj.speedY * random;
        requestAnimationFrame(time);
    }

    function getRandomArbitary(min, max)
    {
        let random = Math.floor((Math.random() * (max - min) + min).toFixed(3));

        console.log(random);
        return random;
    }

    function time() {

        let blue = document.querySelector('.bluePlayer');
        let green = document.querySelector('.greenPlayer');
        let ball = document.querySelector('.ball');

        if (ballObj.coordsX >= polygon.width-80 && ballObj.coordsY >= parseInt(blue.style.top) && ballObj.coordsY <=
            parseInt(blue.style.top)+bluePlayer.height ) {
            ballObj.speedY = -ballObj.speedY;
        }

        if (ballObj.coordsX + ballObj.width > polygon.width) {
            ball.style.display = 'none';
            return;
        }

        if (ballObj.coordsX === 25 && ballObj.coordsY >= parseInt(green.style.top)
            && ballObj.coordsY <= parseInt(green.style.top)+greenPlayer.height ) {
            ballObj.speedY = -ballObj.speedY;
        }

        if (ballObj.coordsX === 0) {
            ballObj.speedY = -ballObj.speedY;
            ball.style.display = 'none';
            return;
        }


        if (ballObj.coordsY + ballObj.width > polygon.height) {
            ballObj.speed = -ballObj.speed;
        }

        if (ballObj.coordsY  === 0) {

            ballObj.speed = -ballObj.speed ;
        }


        ballObj.move(document);

        ballObj.coordsX  = saveX;
        ballObj.coordsY = saveY ;


        requestAnimationFrame(time);
    }


    ballObj.move(document);


