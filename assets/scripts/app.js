const ATTACK_VALUE = 10;
const Monster_ATTACK_VALUE=14;
const STRONG_ATTACK_VALUE=17;
const HEAL_VALUE=20;

let chosenMaxLife = 100;

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(){
    let currentMonsterHealth = chosenMaxLife;
    let currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);

}

function endRound(){

    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(Monster_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth<=0 && hasBonusLife === true){
        hasBonusLife=false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        alert("Your Bonus life save You")
        setPlayerHealth(initialPlayerHealth);
    }
    if(currentMonsterHealth <=0 && currentPlayerHealth > 0){
        alert('You Won!');
  
    }else if(currentPlayerHealth <=0 && currentMonsterHealth > 0){
        alert('Monster Won!');
      

    }else if(currentPlayerHealth <=0 && currentMonsterHealth <=0){
        alert('You Have a draw!');
        

    }

    if(currentMonsterHealth <=0 || currentPlayerHealth <=0){
        reset();
    }
}

function attackMonster(mode){
    let maxDamage;
    if(mode === 'ATTACK'){
        maxDamage = ATTACK_VALUE;

    }else if(mode === 'STRONG_ATTACK'){
        maxDamage = STRONG_ATTACK_VALUE;

    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();


}

function attackHandler(){
    attackMonster('ATTACK');
}

function strongAttackHandler(){
    attackMonster('STRONG_ATTACK');
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
    endRound();
    
}

attackBtn.addEventListener('click',attackHandler);

strongAttackBtn.addEventListener('click',strongAttackHandler);

healBtn.addEventListener('click',healPlayerHandler)