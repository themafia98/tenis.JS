
    let saveX = null;
    let saveY = null;
    let frame = null;

    const polygon = {
        width: 1140,
        height: 600
    };

    const greenPlayer = {
        width: 30 ,
        height: 150,
        coordsY: 0,
        pointsGreen: 0,
        move: function (type) {
            let player = type.querySelector('.greenPlayer');
            player.attributes.y.value = greenPlayer.coordsY;
        }
    };

    const bluePlayer = {
        width: 30,
        height: 150,
        coordsY: 0,
        pointsBlue: 0,
        coordsX: function () {
            return polygon.width - greenPlayer.width + 'px';
        },
        move: function (type) {
            let player = type.querySelector('.bluePlayer');
            player.attributes.x.value = bluePlayer.coordsX();
            player.attributes.y.value = bluePlayer.coordsY;

        }
    };

    const ballObj = {
        radius: 30,
        constSpeed: 5,
        speed: 5,
        speedY: 5,
        coordsX:  parseInt(polygon.width / 2),
        coordsY: parseInt(polygon.height / 2),
        restart: function () {
            ballObj.startX = parseInt(polygon.width / 2);
            ballObj.startY = parseInt(polygon.height / 2);
        },
        move: function (type) {
            let that = this;
            let ball = type.querySelector('.ball');
             saveX =  ballObj.coordsX;
             saveY = ballObj.coordsY;
            ball.attributes.cx.value = ballObj.coordsX + that.speedY + 'px';
            ball.attributes.cy.value = ballObj.coordsY + that.speed  + 'px';
            saveX = parseFloat(ball.attributes.cx.value);
            saveY = parseFloat(ball.attributes.cy.value);
        }
    };

    function createSVGelement() {

        const container = document.querySelector('.container');
        const input = document.createElement('input');
        const info = document.createElement('p');
        const pointBox = document.createElement('div');
        const pointInfo = document.createElement('p');
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS,'svg');
        svg.setAttribute('width',polygon.width);
        svg.setAttribute('height',polygon.height);
        console.log(svg);
        pointBox.classList.add('goals');
        info.classList.add('info');
        pointInfo.classList.add('aboutPoint');
        info.innerHTML = 'After the goal, click on the playing field to continue the game.';
        pointInfo.innerHTML = '<span data-GreenPoint = "">0</span> : ' + '<span data-BluePoint = "">0</span>';
        pointInfo.dataset.GreenPoint = greenPlayer.pointsGreen;
        pointInfo.dataset.BluePoint = bluePlayer.pointsBlue;
        input.classList.add('set');
        input.type = 'button';
        input.value = 'START GAME';

        const poly = document.createElementNS(svgNS, 'rect');
        poly.classList.add('poly');
        poly.setAttribute('x','0');
        poly.setAttribute('y','0');
        poly.setAttribute('width',polygon.width);
        poly.setAttribute('height',polygon.height);
        poly.setAttribute('stroke','black');
        poly.setAttribute('fill','yellow');

        const ball = document.createElementNS(svgNS,'circle');
        ball.classList.add('ball');
        ball.setAttribute('fill','red');
        ball.setAttribute('r', ballObj.radius);
        ball.setAttribute('cx',ballObj.coordsX);
        ball.setAttribute('cy',ballObj.coordsY);

        const green = document.createElementNS(svgNS,'rect');
        green.classList.add('greenPlayer');
        green.setAttribute('width',greenPlayer.width);
        green.setAttribute('height',greenPlayer.height);
        green.setAttribute('stroke','black');
        green.setAttribute('fill', 'green');
        green.setAttribute('x', '0');
        green.setAttribute('y',greenPlayer.coordsY);

        const blue = document.createElementNS(svgNS,'rect');
        blue.classList.add('bluePlayer');
        blue.setAttribute('width',bluePlayer.width);
        blue.setAttribute('height',bluePlayer.height);
        blue.setAttribute('stroke','black');
        blue.setAttribute('fill','blue');
        blue.setAttribute('x',bluePlayer.coordsX());
        blue.setAttribute('y',bluePlayer.coordsY);

        document.addEventListener('keydown', down);
        input.addEventListener('click',start);

        svg.appendChild(poly);
        svg.appendChild(green);
        svg.appendChild(blue);
        svg.appendChild(ball);

        container.appendChild(pointBox);
        pointBox.appendChild(pointInfo);
        container.appendChild(svg);
        container.appendChild(info);
        container.appendChild(input);

        poly.addEventListener('click',restart);

        greenPlayer.move(document);
        bluePlayer.move(document);
        ballObj.move(document);

        function down(e) {

            if (e.shiftKey) {
                if (parseInt(greenPlayer.coordsY) <= 0) {
                    greenPlayer.coordsY = 0;
                } else {
                    greenPlayer.coordsY = greenPlayer.coordsY - 15;
                    greenPlayer.move(document);
                }
            }
            if (e.ctrlKey) {
                if (parseInt( greenPlayer.coordsY) > 435) {
                    greenPlayer.coordsY = 435;
                } else {
                    greenPlayer.coordsY = parseInt(greenPlayer.coordsY) + 15;
                    greenPlayer.move(document);
                }
            }

            if (e.keyCode === 38) {
                if (parseInt(bluePlayer.coordsY) <= 0) {
                    bluePlayer.coordsY = 0;
                } else {
                    bluePlayer.coordsY = parseInt(bluePlayer.coordsY) - 15;
                    bluePlayer.move(document);
                }
            }

            if (e.keyCode === 40) {
                if (parseInt(bluePlayer.coordsY) > 435) {
                    bluePlayer.coordsY = 435;
                } else {
                    bluePlayer.coordsY = parseInt(bluePlayer.coordsY) + 15;
                    bluePlayer.move(document);
                }
            }


            requestAnimationFrame(down);
        }

        frame = down;


    }
    createSVGelement();

    function start() {
        let random = getRandom();
        document.querySelector('.set').disabled = true;
        ballObj.speed = ballObj.speed * random;
        ballObj.speedY = ballObj.speedY * random;
        requestAnimationFrame(time);
        requestAnimationFrame(frame);
    }

    function getRandom()
    {
        let arr = [-1,1];
        let rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    function restart() {
        let random = getRandom();
        ballObj.speed = ballObj.constSpeed * random;
        ballObj.speedY = ballObj.constSpeed * random;
    }


    function time() {

        let blue = document.querySelector('.bluePlayer');
        let green = document.querySelector('.greenPlayer');
        let ball = document.querySelector('.ball');
        let pointBlue = document.querySelector('[data-BluePoint');
        let pointGreen = document.querySelector('[data-GreenPoint');

        if (ballObj.coordsX >= polygon.width-60 && ballObj.coordsY >= parseInt(bluePlayer.coordsY) &&
            ballObj.coordsY <= parseInt(bluePlayer.coordsY) + bluePlayer.height ) {
            ballObj.speedY = -ballObj.speedY;
        }

        if (ballObj.coordsX + ballObj.radius > polygon.width) {

            greenPlayer.pointsGreen = greenPlayer.pointsGreen+1;
            console.log('Green points:' + greenPlayer.pointsGreen);
            pointGreen.innerHTML = greenPlayer.pointsGreen;
            ballObj.restart();
            ballObj.coordsX =  ballObj.startX;
            ballObj.coordsY = ballObj.startY;
            ballObj.speed = 0;
            ballObj.speedY = 0;
        }

        if (ballObj.coordsX === 60 && ballObj.coordsY >= parseInt(greenPlayer.coordsY)
            && ballObj.coordsY <= parseInt(greenPlayer.coordsY) + greenPlayer.height ) {
            ballObj.speedY = -ballObj.speedY;
        }

        if (ballObj.coordsX === 0) {
            bluePlayer.pointsBlue = bluePlayer.pointsBlue+1;
            console.log('Blue points:' +bluePlayer.pointsBlue);
            pointBlue.innerHTML = bluePlayer.pointsBlue;
            ballObj.restart();
            ballObj.coordsX =  ballObj.startX;
            ballObj.coordsY = ballObj.startY;
            ballObj.speed = 0;
            ballObj.speedY = 0;
        }
        console.log(ballObj.coordsY);

        if (ballObj.coordsY + ballObj.radius  >= polygon.height) {
            ballObj.speed = -ballObj.speed;
        }

        if (ballObj.coordsY  === 30) {
            ballObj.speed = -ballObj.speed ;
        }

        ballObj.move(document);

        ballObj.coordsX  = saveX;
        ballObj.coordsY = saveY ;

        requestAnimationFrame(time);
    }