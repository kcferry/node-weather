const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messOne = document.querySelector('#message-1')
const messTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value.toLowerCase()
    const locationStr2 = location.charAt(0).toUpperCase() + location.slice(1)
    messOne.textContent = `Loading current weather for ${locationStr2}`
    messTwo.textContent = ''
    
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messOne.textContent = data.error
        } else {
            messOne.textContent = data.location
            messTwo.textContent = data.forcast
        }
    })
})

})