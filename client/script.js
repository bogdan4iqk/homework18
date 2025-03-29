import { getDataFunction, postDataFunction } from './fetchData.js'

const ul = document.querySelector('ul')
const inputName = document.querySelector('.name1')
const inputAge = document.querySelector('.name2')
const inputCity = document.querySelector('.name3')
const btn = document.querySelector('.add')
const input = document.querySelector('.name')
const btn2 = document.querySelector('.find')

const getData = async () => {
    let res = JSON.parse(await getDataFunction('https://server-hm.onrender.com/getUsers'))

    res.forEach(el => {
        ul.insertAdjacentHTML(`beforeend`, 
            `<li>
                ${el.name}, ${el.age}, ${el.city}  
            </li>`
        )
    });
}

const postData = async e => {
    e.preventDefault()
	const age = +inputAge.value
	const name = inputName.value
	const city = inputCity.value
	
	const newUser = {
		name: name,
		city: city,
		age: age
	};

	const res = await postDataFunction('https://server-hm.onrender.com/addUser', newUser)

	return res
}

const searchUser = async e => {
    e.preventDefault()
    const name = input.value
    const res = await fetch(`https://server-hm.onrender.com/search?query=${encodeURIComponent(name)}`)

    if(!res.ok) {
        console.error('Ошибка при получении данных')
        return
    }

    const data = await res.json()

    ul.innerHTML = ''

    data.forEach(el => {
        ul.insertAdjacentHTML(`beforeend`, 
            `<li>
                ${el.name}, ${el.age}, ${el.city}
            </li>`
        )
    })
}



window.addEventListener('load', () => {
    getData()
})

btn.addEventListener('click', e => {
    postData(e)
})

btn2.addEventListener('click', (e) => {
    searchUser(e)
})