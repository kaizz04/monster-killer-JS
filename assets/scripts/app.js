const ATTACK_VALUE = 10;
const Monster_ATTACK_VALUE=14;
let chosenMaxLife = 100;

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler(){
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= damage;

    const playerDamage = dealPlayerDamage(Monster_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentMonsterHealth <=0 && currentPlayerHealth > 0){
        alert('You Won!')
    }else if(currentPlayerHealth <=0 && currentMonsterHealth > 0){
        alert('Monster Won!');

    }else if(currentPlayerHealth <=0 && currentMonsterHealth <=0){
        alert('You Have a draw!');

    }
}

attackBtn.addEventListener('click',attackHandler);