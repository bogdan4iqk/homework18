// GET
export const getDataFunction = async url => {
	const getData = async url => {
		const res = await fetch(url)
		const json = await res.json()
		return json
	}

	try {
		const data = await getData(url)
		return data
	} catch (error) {
		console.log(`Произошла ошибка в getData, ${error.message}`)
	}
}

// POST
export const postDataFunction = async (url, obj) => {
	const postData = async (url, obj) => {
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(obj),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		const json = await res.json()
		return json
	}

	try {
		const data = await postData(url, obj)
		return data
	} catch (error) {
		console.log(`Произошла ошибка в postData, ${error.message}`)
	}
}

// PATCH
export const patchDataFunction = async (url, id, obj) => {
	const patchData = async (url, id, obj) => {
		const res = await fetch(`${url}/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({ ...obj }), // ?
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})

		if (!res.ok) throw new Error(`Ошибка при запросе ${res.status}`)

		const text = await res.text()
		try {
			return JSON.parse(text)
		} catch (err) {
			throw new Error('сервер вернул не JSON')
		}
	}
	try {
		const data = await patchData(url, id, obj)
		console.log('Пользователь изменён')
		return data
	} catch (error) {
		console.log(`Произошла ошибка в patchData, ${error.message}`)
	}
}


//DELETE 

export const deleteDataFunction = (url, productId) => {
  return new Promise((resolve, reject) =>
    fetch(`${url}/${productId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      })
      .catch(error => reject(error))
  );
}