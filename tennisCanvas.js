

    const settings = {
        canvas: null,
        ctx: null,
        canvasBuf: null,
        ctxBuf: null
    };

    const polygon = {
        width: 1140,
        height: 600,
    };

    const greenPlayer = {
        width: 30 ,
        height: 150,
        coordsY: 0,
        pointsGreen: 0,
        move: function () {
           return drawGame();
        }
    };

    const bluePlayer = {
        width: 30,
        height: 150,
        coordsY: 0,
        pointsBlue: 0,
        coordsX: function () {
            return polygon.width - greenPlayer.width;
        },
        move: function () {
            return drawGame();
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
        move: function () {
            let that = this;
            ballObj.coordsX = ballObj.coordsX + that.speedY;
            ballObj.coordsY = ballObj.coordsY + that.speed;
            return drawGame();
        }
    };

    
    function buildUI() {
        const container = document.querySelector('.container');
        const canvas = document.getElementsByTagName('canvas');
        console.log(canvas);
        const input = document.createElement('input');
        const pointBox = document.createElement('div');
        const pointInfo = document.createElement('p');
        const info = document.createElement('p');
        input.addEventListener('click',start);
        canvas[0].addEventListener('click', restart);

        pointBox.classList.add('goals');
        info.classList.add('info');
        pointInfo.classList.add('aboutPoint');
        info.innerHTML = 'After the goal, click on the playing field to continue the game.';
        pointInfo.innerHTML = '<span data-GreenPoint = "">0</span> : ' + '<span data-BluePoint = "">0</span>';
        pointInfo.dataset.GreenPoint = greenPlayer.pointsGreen;
        pointInfo.dataset.BluePoint = bluePlayer.pointsBlue;
        input.classList.add('set');
        input.type = 'button';
        input.value = 'START';


        pointBox.appendChild(pointInfo);
        container.insertBefore(pointBox,canvas[0]);
        container.appendChild(info);
        container.appendChild(input);

        letsGo();
    }

    function drawGame() {
             // Canvas
             settings.canvasBuf = document.createElement('canvas');
             settings.canvasBuf.setAttribute('width',polygon.width);
             settings.canvasBuf.setAttribute('height',polygon.height);
             settings.ctxBuf = settings.canvasBuf.getContext('2d');

            settings.ctxBuf.clearRect(0,0,polygon.width,polygon.height);

            // polygon
            settings.ctxBuf.fillStyle = 'yellow';
            settings.ctxBuf.fillRect(0, 0, polygon.width, polygon.height);
            settings.ctxBuf.strokeRect(0, 0, polygon.width, polygon.height);

            // ball
            settings.ctxBuf.beginPath();
            settings.ctxBuf.fillStyle = 'red';
            settings.ctxBuf.arc(ballObj.coordsX, ballObj.coordsY, ballObj.radius, 0, Math.PI * 2);
            settings.ctxBuf.fill();
            settings.ctxBuf.stroke();

            // Green player
            settings.ctxBuf.fillStyle = 'green';
            settings.ctxBuf.fillRect(0, greenPlayer.coordsY, greenPlayer.width, greenPlayer.height);

            // Blue player
            settings.ctxBuf.fillStyle = 'blue';
            settings.ctxBuf.fillRect(bluePlayer.coordsX(), bluePlayer.coordsY, bluePlayer.width, bluePlayer.height);

            drawCtx();
    }

    function drawCtx(){
        settings.canvas = document.getElementById('tennis');
        settings.canvas.setAttribute('width', polygon.width);
        settings.canvas.setAttribute('height', polygon.height);
        settings.ctx = settings.canvas.getContext('2d');
        settings.ctx.drawImage(settings.canvasBuf, 0, 0, polygon.width, polygon.height);
    }

    function letsGo(){
        document.addEventListener('keydown', down);
        function down(e) {

            if (e.shiftKey) {
                if (parseInt(greenPlayer.coordsY) <= 0) {
                    greenPlayer.coordsY = 0;
                } else {
                    greenPlayer.coordsY = greenPlayer.coordsY - 15;
                    greenPlayer.move();
                }
            }
            if (e.ctrlKey) {
                debugger;
                if (parseInt( greenPlayer.coordsY) >= 450) {
                    greenPlayer.coordsY = 450;
                } else {
                    greenPlayer.coordsY = parseInt(greenPlayer.coordsY) + 15;
                    greenPlayer.move();
                }
            }
            if (e.keyCode === 38) {
                if (parseInt(bluePlayer.coordsY) <= 0) {
                    bluePlayer.coordsY = 0;
                } else {
                    bluePlayer.coordsY = parseInt(bluePlayer.coordsY) - 15;
                    bluePlayer.move();
                }
            }
            if (e.keyCode === 40) {
                if (parseInt(bluePlayer.coordsY) >= 450) {
                    bluePlayer.coordsY = 450;
                } else {
                    bluePlayer.coordsY = parseInt(bluePlayer.coordsY) + 15;
                    bluePlayer.move();
                }
            }
        }
    }

    function start() {
        let random = getRandom();
        document.querySelector('.set').disabled = true;

        ballObj.speed = parseFloat(ballObj.speed * random);
        ballObj.speedY = parseFloat( ballObj.speedY * random);

        window.requestAnimationFrame(loop);
    }

    function loop () {
        time();
        requestAnimationFrame(loop);
    }

    function getRandom() {
        let arr = [-1,1];
        let rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    function restart() {
        let random = getRandom();
        ballObj.speed = ballObj.constSpeed * random;
        ballObj.speedY = ballObj.constSpeed * random;
        drawGame();
    }


    function time() {

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

        if (ballObj.coordsY + ballObj.radius  >= polygon.height) {
            ballObj.speed = -ballObj.speed;
        }

        if (ballObj.coordsY  === 30) {
            ballObj.speed = -ballObj.speed ;
        }

        ballObj.move();
    }

    buildUI();
    drawGame();