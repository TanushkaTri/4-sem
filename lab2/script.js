const caps = document.querySelectorAll('.cap');
const ball = document.getElementById('ball');
const correct = document.getElementById('correct');
const incorrect = document.getElementById('incorrect');
const resultField = document.getElementById('result');
let positionBall;
let score = 0;

resultField.value = 0;

function changeBall() {
    let diameter = document.getElementById('diameter').value;
    ball.style.width = diameter + 'px';
    ball.style.height = diameter + 'px';
}

function changeCap() {
    let heightCap = document.getElementById('heightС').value;
    let widthCap = document.getElementById('widthС').value;
    for( i = 0; i < 3; i ++){
        caps[i].style.width = widthCap + 'px';
        caps[i].style.height = heightCap + 'px';
    }
   
}

caps.forEach(cap => {
    cap.addEventListener('click', function() {
        caps[positionBall].appendChild(ball);
       this.querySelector('img').style.transform = `translatey(${parseInt(ball.offsetWidth)*(-1) -10 + 'px'})`;
       if(this == caps[positionBall]){
            correct.style.opacity = 1;
            score ++;
        }
        else{
            score --;
            incorrect.style.opacity = 1;
        }
        resultField.value = score;
       setTimeout(reset, 1200);
    });
});

function save(){
    changeBall();
    changeCap();
    changePos();
    return false;
}

function reset(){
    correct.style.opacity = 0;
    incorrect.style.opacity = 0;
    changePos();
}

function changePos(){
    for(i = 0; i < 3; i ++)
        caps[i].querySelector('img').style.transform = '';
    positionBall = Math.floor(Math.random() * 3);
}

changePos();