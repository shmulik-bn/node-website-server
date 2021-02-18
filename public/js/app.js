

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const fetchLocation = (address) => { fetch("http://localhost:3000/weather?address="+address).then((res)=>{
    res.json().then(data=>{
        if (data.error) {

             messageOne.textContent = 'error has occure'
        }
        else{
        messageOne.textContent = ('location:'+data.location)
        messageTwo.textContent = (data.forecast)
        }

    })
})
}


// messageOne.textContent = 'form'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetchLocation(location)
    console.log('location', location);
})