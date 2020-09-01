const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn =document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const quoteContainer =document.getElementById('quote-container');
const loader=document.getElementById('loader');


function showLoadingSpinner(){
    quoteContainer.hidden=true;
    loader.hidden=false;
}

function removeLoadingSpinner(){
    if(!loader.hidden){
       quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

//Get quote from the API

async function getQuote(){
    showLoadingSpinner();

try{
 const proxy='https://sleepy-wildwood-02992.herokuapp.com/' ;  
const url='http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

const response = await fetch(proxy+url);
const data = await response.json();

//Reduce font size of longer quotes

if(data.quoteText.length > 120){
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');

}

quoteText.innerText= data.quoteText;

if(data.quoteAuthor=== ''){

authorText.innerText= 'Unknown';

}else{

authorText.innerText= data.quoteAuthor;

}

}catch(error){
    getQuote();
    console.log(error);
}

removeLoadingSpinner();
}

//Tweet A quote

function tweetQuote(){
    const quote= quoteText.innerText;
    const author=authorText.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} -${author}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners

twitterBtn.addEventListener('click',tweetQuote);

newQuoteBtn.addEventListener('click',getQuote);

//On load
getQuote();

