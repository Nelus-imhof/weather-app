console.log('Client side javascript is loaded!')





const wheatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


wheatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Wheather is laoding'
    messageTwo.textContent = ''

    const location = search.value

    fetch('/weather?adress='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})