// JavaScript source code
var row = 4;
var col = 3;
var colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var colorList = colors.slice();
var color = [];
var clickFlag = true;
var clickCard = [];
var doneCard = [];
var startTime;
function suffle()
{
    for (var i = 0; colorList.length > 0; i++)
    {
        color = color.concat(colorList.splice(Math.random() * colorList.length, 1));
    }
}

function cardSetting(row, col) {
    clickFlag = false;
    for (var i = 0; i < row * col; i++) {
        var card = document.createElement('div');
        card.className = 'card';
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function (c) { // closer problem 
            card.addEventListener('click', function () {
               if (clickFlag && !doneCard.includes(c)) {
                   c.classList.toggle('flipped');
                   clickCard.push(c);
                   if (clickCard.length == 2)
                       {
                            if (clickCard[0].querySelector('.card-back').style.backgroundColor == clickCard[1].querySelector('.card-back').style.backgroundColor)
                                {
                                    doneCard.push(clickCard[0]);
                                    doneCard.push(clickCard[1]);
                                    clickCard = [];
                                    if (doneCard.length == 12)
                                        {
                                            var endTime = new Date();
                                            alert('Success!! It takes ' + (endTime - startTime) / 1000 + ' seconds');
                                            document.querySelector('#wrapper').innerHTML = "";
                                            colorList = colors.slice();
                                            color = [];
                                            doneCard = [];
                                            startTime = null;
                                            suffle();
                                            cardSetting(row, col);
                                        }
                                }
                           else
                           {
                               clickFlag = false;
                               setTimeout(function()
                                         {
                                   clickCard[0].classList.remove('flipped');                 clickCard[1].classList.remove('flipped');
                                   clickFlag = true;
                                   clickCard = [];
                               }, 1000)
                           }
                       }
               }
            });
        })(card);
        document.querySelector('#wrapper').appendChild(card);
    }
    
    document.querySelectorAll('.card').forEach(function (card, index){ // open card at the beginning
        setTimeout(function(){ card.classList.add('flipped');
        }, 1000 + 100 * index);
    });
    
    setTimeout(function(){ // conceal the cards
        document.querySelectorAll('.card').forEach(function (card, index){
            card.classList.remove('flipped');
    });
        clickFlag = true;
        startTime = new Date();
}, 5000);
}

suffle();
cardSetting(row, col);