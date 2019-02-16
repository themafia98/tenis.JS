
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
            player.style.top = greenPlayer.coordsY;
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
            player.style.left = bluePlayer.coordsX();
            player.style.top = bluePlayer.coordsY;

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
            debugger;
            ball.attributes.cx.value = ballObj.coordsX + that.speedY + 'px';
            ball.attributes.cy.value = ballObj.coordsY + that.speed  + 'px';
            saveX = parseFloat(ball.attributes.cx.value);
            saveY = parseFloat(ball.attributes.cy.value);
        }
    };


    function createDOMelement() {

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
        pointInfo.innerHTML = 'Green points: <span data-GreenPoint = "">0</span> | Blue points: ' +
            '<span data-BluePoint = "">0</span>';
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



        console.log(poly);

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
        green.setAttribute('fill', 'green');
        green.setAttribute('x', '0');
        green.setAttribute('y',greenPlayer.coordsY);

        const blue = document.createElementNS(svgNS,'react');
        document.addEventListener('keydown', down);
        input.addEventListener('click',start);





        blue.classList.add('bluePlayer');



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
            requestAnimationFrame(down);
        }

        frame = down;


    }


    createDOMelement();



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

        if (ballObj.coordsX >= polygon.width-80 && ballObj.coordsY >= parseInt(blue.style.top) &&
            ballObj.coordsY <= parseInt(blue.style.top) + bluePlayer.height ) {
            ballObj.speedY = -ballObj.speedY;
        }

        if (ballObj.coordsX + ballObj.width > polygon.width) {

            greenPlayer.pointsGreen = greenPlayer.pointsGreen+1;
            console.log('Green points:' + greenPlayer.pointsGreen);
            pointGreen.innerHTML = greenPlayer.pointsGreen;
            ballObj.restart();
            ballObj.coordsX =  ballObj.startX;
            ballObj.coordsY = ballObj.startY;
            ballObj.speed = 0;
            ballObj.speedY = 0;
            ball.style.left = ballObj.startX + 'px';
            ball.style.top = ballObj.startY + 'px';
        }

        if (ballObj.coordsX === 25 && ballObj.coordsY >= parseInt(green.style.top)
            && ballObj.coordsY <= parseInt(green.style.top) + greenPlayer.height ) {
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
            ball.style.left = ballObj.startX + 'px';
            ball.style.top = ballObj.startY + 'px';
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





