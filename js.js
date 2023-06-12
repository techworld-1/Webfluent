
document.querySelector('.again').addEventListener('click',
function(){
 document.querySelector('.message').textContent='OK lets again.....';
 document.querySelector('.guess').value='';
 document.querySelector('body').style.backgroundColor=' rgb(248, 178, 48)';
})
document.querySelector('.check').addEventListener('click',
function()
{
    const guess=Number(document.querySelector('.guess').value);
    if(guess==1){
    document.querySelector('body').style.backgroundColor='gray';
    document.querySelector('.message').textContent="your favourite color on screen!";
}
 else  if(guess==2){
    document.querySelector('body').style.backgroundColor='blue';
    document.querySelector('.message').textContent="your favourite color on screen!";
}
else  if(guess==3){
    document.querySelector('body').style.backgroundColor=' rgb(224, 162, 162)';
    document.querySelector('.message').textContent="your favourite color on screen!";
}
else  if(guess==4){
    document.querySelector('body').style.backgroundColor='pink';
    document.querySelector('.message').textContent="your favourite color on screen!";
}
 else if(guess==5){
    document.querySelector('body').style.backgroundColor='black';
    document.querySelector('.message').textContent='Your favourite color on screen!';
}
else if(guess>5){
    document.querySelector('.message').textContent='Your number out of range!';
}
else if(!guess){
    document.querySelector('.message').textContent='No number !';
}
});