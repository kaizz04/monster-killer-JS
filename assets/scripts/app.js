const ATTACK_VALUE = 10;
const Monster_ATTACK_VALUE=14;
const STRONG_ATTACK_VALUE=17;
const HEAL_VALUE=20;

const MODE_ATTACK = 'ATTACK'; //0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';//1

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'Game_OVER';
let battleLog = [];

function getMaxLifeValue(){
    const enteredValue = prompt('Maximum life for you and monster : ','100');
    const parsedValue = parseInt(enteredValue);
    if(isNaN(enteredValue) || parsedValue <=0){
        throw {errorMessage: 'Invalid user input: not a number '};
    
    }
    return parsedValue;
}
let chosenMaxLife;

try{
   chosenMaxLife=getMaxLifeValue();

}catch(error){
    console.log(error);
    chosenMaxLife=100;
    alert("You entered value something wrong, setting into default value..")

}


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeLog(ev,val,monsterHealth,playerHealth){
    let logEntry={
        event:ev,
        value:val,
        finalMonsterHealth:monsterHealth,
        finalPlayerHealth:playerHealth
    };
    switch(ev){
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'Monster';
            break;

        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event:ev,
                value:val,
                target:'Monster',
                finalMonsterHealth:monsterHealth,
                finalPlayerHealth:playerHealth
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event:ev,
                value:val,
                target:'Monster',
                finalMonsterHealth:monsterHealth,
                finalPlayerHealth:playerHealth
            };
            break;

        case LOG_EVENT_PLAYER_HEAL:
            logEntry = {
                event:ev,
                value:val,
                target:'Monster',
                finalMonsterHealth:monsterHealth,
                finalPlayerHealth:playerHealth
            
            };
            break;

        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event:ev,
                value:val,
                finalMonsterHealth:monsterHealth,
                finalPlayerHealth:playerHealth
            };
            break;

    }

    battleLog.push(logEntry);

}

function reset(){
    let currentMonsterHealth = chosenMaxLife;
    let currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);

}

function endRound(){

    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(Monster_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealth,currentPlayerHealth);

    if(currentPlayerHealth<=0 && hasBonusLife === true){
        hasBonusLife=false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        alert("Your Bonus life save You")
        setPlayerHealth(initialPlayerHealth);
    }
    if(currentMonsterHealth <=0 && currentPlayerHealth > 0){
        alert('You Won!');
        writeLog(LOG_EVENT_GAME_OVER,'PLAYER WON',currentMonsterHealth,currentPlayerHealth);

  
    }else if(currentPlayerHealth <=0 && currentMonsterHealth > 0){
        alert('Monster Won!');
        writeLog(LOG_EVENT_GAME_OVER,'MONSTER WON',currentMonsterHealth,currentPlayerHealth);
      

    }else if(currentPlayerHealth <=0 && currentMonsterHealth <=0){
        alert('You Have a draw!');
        writeLog(LOG_EVENT_GAME_OVER,'A DRAW',currentMonsterHealth,currentPlayerHealth);
        

    }

    if(currentMonsterHealth <=0 || currentPlayerHealth <=0){
        reset();
    }
}

function attackMonster(mode){
    const maxDamage = mode ===MODE_ATTACK 
    ? ATTACK_VALUE : STRONG_ATTACK_VALUE;

    const logEvent = mode === MODE_ATTACK 
    ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

    // if(mode === MODE_ATTACK){
    //     maxDamage = ATTACK_VALUE;
    //     let logEvent=LOG_EVENT_PLAYER_ATTACK;
        

    // }else if(mode === MODE_STRONG_ATTACK){
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     let logEvent=LOG_EVENT_PLAYER_STRONG_ATTACK;

    // }


    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeLog(logEvent,damage,currentMonsterHealth,currentPlayerHealth);

    endRound();


}

function attackHandler(){
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert("You can't heal to more than your mx initial health.");
        healValue = chosenMaxLife - currentMonsterHealth;
    }else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    writeLog(LOG_EVENT_PLAYER_HEAL,HEAL_VALUE,currentMonsterHealth,currentPlayerHealth);
    endRound();
    
}

function printLogHandler(){
    console.log(battleLog);
}

attackBtn.addEventListener('click',attackHandler);

strongAttackBtn.addEventListener('click',strongAttackHandler);

healBtn.addEventListener('click',healPlayerHandler)

logBtn.addEventListener('click',printLogHandler());

