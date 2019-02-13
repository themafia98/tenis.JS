

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
        coordsX: function(){
           let x = polygon.width / 2 + 'px';
            return x;
        },
        coordsY: function(){
            let y = polygon.height / 2 + 'px';
            return y;
        },
        move: function (type) {
            let ball = type.querySelector('.ball');
            ball.style.left = ballObj.coordsX();
            ball.style.top = ballObj.coordsY();
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
                player.style.top = parseInt(player.style.top) - 9 + 'px';
                if (parseInt(player.style.top) < 0) {
                    player.style.top = 0 + 'px';
                }
            }
            if (e.ctrlKey) {
                player.style.top = parseInt(player.style.top) + 9 + 'px';
                if (parseInt(player.style.top) > 450) {
                    player.style.top = 450 + 'px';
                }
            }

            if (e.keyCode === 38) {
                player2.style.top = parseInt(player2.style.top) - 9 + 'px';
                if (parseInt(player2.style.top) < 0) {
                    player2.style.top = 0 + 'px';
                }
            }

            if (e.keyCode === 40) {
                player2.style.top = parseInt(player2.style.top) + 9 + 'px';
                if (parseInt(player2.style.top) > 450) {
                    player2.style.top = 450 + 'px';
                }
            }

            console.log(e.keyCode);
        }

    }




    createDOMelement();


    function start() {
        setInterval(time,40);
    }

    function time() {
        let balls = document.querySelector('.ball');

        let a = parseInt(balls.style.left);
        console.log(a);
        console.log(polygon.width);

        if (a > polygon.width-ballObj.width-5) {
            a = a - 5;
            balls.style.left = a + 'px';
        }

        if (a < 0) {
            a = a + 5;
            balls.style.left = a + 'px';
        }

        a = a + 5;
        balls.style.left = a + 'px';
    }

    start();
    