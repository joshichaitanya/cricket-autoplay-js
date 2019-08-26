let yourName = 'You';
let opponentName = 'Opponent';

let getRandomInt = (min, max) => ( Math.floor(Math.random() * (max - min + 1)) + min)

function ready() {
        let score = 0, wicket = 0, overs = 0, balls = 1
        let sixCount = 0, fourCount = 0, singleCount = 0, doubleCount = 0, tripleCount = 0, dotCount = 0, wideCount = 0, noBallCount = 0
        let batFirst = false, firstInningScore = '', breakAutoPlay = true, firstInning = false, endGame = false

        let $score = document.getElementById('score')
        let $wicket = document.getElementById('wicket')
        let $overs = document.getElementById('overs')

        let $fours = document.getElementById('fours1')
        let $sixers = document.getElementById('sixers1')
        let $singles = document.getElementById('singles1')
        let $doubles = document.getElementById('doubles1')
        let $triples = document.getElementById('triples1')
        let $dots = document.getElementById('dots1')
        let $wide = document.getElementById('wide1')
        let $noBall = document.getElementById('noBall1')
        let $partnerShip = document.getElementById('partnerShip')

        let $gamePlay = document.getElementById('gamePlay')
        let $toss = document.getElementById('coin')

        let $firstInningScore = document.getElementById('firstInningScore')
        let $play = document.getElementById('play')
        let $autoPlay = document.getElementById('autoPlay')
        let $autoPlayTillWicket = document.getElementById('autoPlayTillWicket')
        let $logs = document.getElementById('logs')
        let $wicketLogs1 = document.getElementById('wicketLogs1')
        let $wicketLogs2 = document.getElementById('wicketLogs2')
        document.getElementById('secondDiv').style.display = 'none'
        $gamePlay.style.display = 'none'
        $firstInningScore.style.display = 'none'
        window.freeHit = false;
        window.partnerShip = 0
        window.playNext = () => {
            if (wicket === 10 || overs === 50) {
                if (firstInning) {
                    window.BeginSecondInning()
                } else {
                    window.declareResult(overs === 50 ? 'overfinished': 'allout')
                }
                return
            }

            window.extraBall = false
            $overs.innerText = balls=== 6 ? ((overs+1) + '.0') : (overs + '.' + balls)
            let dec = getRandomInt(1, 20)
            let currentDelivery = 0
            switch (dec) {
                case 5:
                    if (window.freeHit) {
                        $dots.innerText = ++dotCount
                        pushToLogs('Thats wicket, but since it was a free-hit, batsman stays.')
                        break;
                    }
                    $wicket.innerText = ++wicket
                    pushToLogs(getWicketMessage(), true)
                    window.partnerShip = 0
                    pushToWicketLog('<br/> ' + score + ' / ' + wicket)
                    break;
                case 1:
                    currentDelivery = 6;
                    $sixers.innerText = ++sixCount;
                    pushToLogs('Six - That\'s Six, What a strike!')
                    break;
                case 20:
                case 7:
                case 14:
                    $dots.innerText = ++dotCount
                    pushToLogs(getDotMessage())
                    break;
                case 3:
                    if (getRandomInt(1, 2) == 1 ) {
                        $wide.innerText = ++wideCount
                        window.extraBall = true
                        currentDelivery = 1
                        let wideMsg = 'wide - Thats wide ball given by the umpire.'
                        if (window.freeHit) {
                            wideMsg += 'So anather freehit'
                        }
                        pushToLogs(wideMsg)
                    }
                    break;
                case 19:
                    if (getRandomInt(1, 2) == 2 ) {
                        let noBallMsg = 'no ball - That\'s a huge no-ball, FREE HIT!'
                        $noBall.innerText = ++noBallCount
                        window.extraBall = true
                        currentDelivery = 1
                        if (window.freeHit) {
                            noBallMsg = 'One more free hit'
                        }
                        window.freeHit = true
                        pushToLogs(noBallMsg)
                    }
                    break;
                case 15:
                    $fours.innerText = ++fourCount;
                    currentDelivery = 4
                    pushToLogs(getFourMessage())
                    break;
                case 4:
                    $triples.innerText = ++tripleCount
                    currentDelivery = 3
                    pushToLogs('triple - Brilliant running between the wickets, got 3 runs.')
                    break;
                case 6:
                    $doubles.innerText = ++doubleCount
                    currentDelivery = 2
                    pushToLogs('double - Nice running between the wickets, got 1 run extra.')
                    break;
                default:
                    currentDelivery = 1
                    pushToLogs('single - Batsman took a quick single')
                    break;
            }
            score += currentDelivery
            window.partnerShip += currentDelivery
            $score.innerText = score
            $partnerShip.innerText = partnerShip
            if (!window.extraBall) window.freeHit = false;
            if (!firstInning && firstInningScore.score < score) {
                declareResult('chased')
            }

            if (!window.extraBall) {
                if (balls === 6) {
                    overs++;
                    balls = 1
                } else {
                    balls ++;
                }
            }
        }

        window.toss = () => {
        	yourName = prompt('Enter your Team Name')
        	opponentName = prompt('Enter Opponent Team Name')
            let dec = confirm('Click Ok for Heads,  Cancel for Tails')
            let ran = getRandomInt(1, 3)

            var flipResult = Math.random();
            $toss.classList.remove();
            setTimeout(function() {
              if(flipResult <= 0.5){
                $toss.classList.add('heads');
                console.log('it is head');
              }
              else{
                $toss.classList.add('tails');
                console.log('it is tails');
              }
              
            }, 100);

            ran = ran === 1 || ran === 3
            let tossMsg = ''
            if ((dec && ran) || (!dec && !ran)) {
                batFirst = confirm(yourName + ' won toss, click Ok for bat,  Cancel for bowl')
                tossMsg = yourName + ' has elected to ' + (batFirst ? 'bat' : 'bowl') + ' first'
                alert(tossMsg)
            } else {
                batFirst = getRandomInt(1, 2) == 1
                tossMsg = yourName + ' lost the toss, '+opponentName+' has elected to ' + (batFirst ? 'bowl' : 'bat'  + ' first.')
                alert(tossMsg)
            }
            $gamePlay.style.display = 'flex'
            $toss.style.display = 'none'

            pushToLogs(tossMsg, true, true)
            pushToLogs('Lets start, ' + yourName + ' are now going to ' + (batFirst ? 'Bat' : 'Bowl'), true, true)
            firstInning = true
            pushToWicketLog('<b>First inning started</b>\n')
        }

        window.autoPlay = () => {
            let dec = Number(prompt('How Meny overs?')) || 0
            breakAutoPlay = false
            for (let i = 0; i < dec*6 && !breakAutoPlay ; i++) {
                playNext()
                while(window.extraBall) playNext()
            }
            debugger;
            breakAutoPlay = true
        }

        window.autoPlayTillWicket = () => {
            breakAutoPlay = false
            let wicketCount = wicket
            while (!breakAutoPlay && wicket == wicketCount) {
                playNext()
            }
            breakAutoPlay = true
        }

        window.BeginSecondInning = () => {
            firstInningScore = {
                score: score,
                wicket: wicket,
                overs: overs + '.' + balls
            }
            $firstInningScore.style.display = 'block'
            $firstInningScore.innerText = ' first Inning Score of ' + (batFirst ? yourName : (opponentName + '\'s') ) + ': ' + score + ' / ' + wicket + ' (' + firstInningScore.overs + ')'
            score = 0, wicket = 0, overs = 0, balls = 1;
            sixCount = 0, fourCount = 0, singleCount = 0, doubleCount = 0, tripleCount = 0, dotCount = 0, wideCount = 0, noBallCount = 0;
            $score.innerText = 0
            $wicket.innerText = 0
            pushToLogs('<hr/><br/><hr/>In second innings, '+yourName+' are now going to ' + (batFirst ? 'Batting' : 'Bowling'), true, true)
            $overs.innerText = 0
            document.getElementById('fours2').innerText = $fours.innerText
            document.getElementById('sixers2').innerText = $sixers.innerText
            document.getElementById('singles2').innerText = $singles.innerText
            document.getElementById('doubles2').innerText = $doubles.innerText
            document.getElementById('triples2').innerText = $triples.innerText
            document.getElementById('dots2').innerText = $dots.innerText
            document.getElementById('wide2').innerText = $wide.innerText
            document.getElementById('noBall2').innerText = $noBall.innerText
            document.getElementById('inningTitle').innerText = 'Second Innings'
            document.getElementById('secondDiv').style.display = 'block'
            $fours.innerText = 0
            $sixers.innerText = 0
            $singles.innerText = 0
            $doubles.innerText = 0
            $triples.innerText = 0
            $dots.innerText = 0
            $wide.innerText = 0
            $noBall.innerText = 0

            breakAutoPlay = true
            firstInning = false
            pushToWicketLog('<b>Second inning started</b>')
        }
        window.declareResult = (wonBy) => {
            let logMsg = ''
            if (batFirst) {
                if (wonBy === 'allout') {
                    if (firstInningScore.score > score) {
                        logMsg = yourName+' has won by ' + (firstInningScore.score - score) + ' runs'
                    } else {
                        logMsg = 'Match Tied'
                    }
                } else if (wonBy === 'chased') {
                    logMsg = opponentName+' won by ' + (10 - wicket) + ' wickets'
                } else if (wonBy === 'overfinished') {
                    if (firstInningScore.score < score) {
                        logMsg = opponentName+' won by ' + (firstInningScore.score - score) + ' runs'
                    } else if (firstInningScore.score > score) {
                        logMsg =  yourName+' has won by ' + (10 - wicket) + ' wickets'
                    } else {
                        logMsg = 'Match Tied'
                    }
                }
            } else {
                if (wonBy === 'chased') {
                    logMsg = yourName+' won by ' + (10 - wicket) + ' wickets'
                } else if (wonBy === 'allout') {
                    logMsg = opponentName+' won by ' + (firstInningScore.score - score) + ' runs'
                }
            }
            pushToLogs(logMsg, true, true)
            alert(logMsg)
            $play.style.display = 'none'
            $autoPlay.style.display = 'none'
            $autoPlayTillWicket.style.display = 'none'
            breakAutoPlay = true
            endGame = true
            $firstInningScore.innerText = $firstInningScore.innerText + '\n\n' + ' second Inning Score of ' + (batFirst ? (opponentName + '\'s') : yourName ) + ': ' + score + ' / ' + wicket + ' (' + (overs + "." + balls) + ')'
        }
        let pushToLogs = (msg, isBold, isBigMessage) => {
            let oversMsg = isBigMessage ? '' : '(' + overs + '.' + balls + ') - '
            let scoreMsg = isBigMessage ? '' : ' - ' + score + ' / ' + wicket            
            let breather = balls == 6 && !window.extraBall ? '<br/><hr/>' : '<br/>'
            $logs.innerHTML = breather + oversMsg + (isBold ? `<b>`+msg+`</b>` : msg) + scoreMsg + '<br/>' + $logs.innerHTML
        }
        let pushToWicketLog = (msg) => {
            let oversMsg = '(' + overs + '.' + balls + ')'
            if (firstInning)
                $wicketLogs1.innerHTML = $wicketLogs1.innerHTML + msg + oversMsg
            else
                $wicketLogs2.innerHTML = $wicketLogs2.innerHTML + msg + oversMsg
        }
    };
    const getWicketMessage = (num) => (
        'Wicket - ' + [
            'That\'s out, Clean Bowled!',
            'Easy catch by the wicket keeper',
            'Cought and bowled',
            'That\'s huge apeal, umpire has given him out, LBW!',
            'What a nice throw, that\' runout'
        ][getRandomInt(0, 4)]
    )
    const getDotMessage = () => (
        'Dot - ' + ['Dot ball, good delivery by the bowlwer.',
            'dot - Batsman can\'t find the gap.'
        ][getRandomInt(0, 1)]
    )
    const getFourMessage = () => (
        'Four - ' + [
            'Fantastic hit by the batsman, what a great technique.',
            'Batsman finds the gap, 4 runs',
            'Edged and four, what a luck'
        ][getRandomInt(0, 2)]
    )