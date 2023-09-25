import axios from 'axios'

function requestSearch (formData, param) {
  const p = new Promise((resolve, reject) => {
    const params = {
      url: `/chatbot/search?${param}`,
      method: 'POST',
      data: formData,
      timeout: {
        client: 10 * 1000
      }
    }
    axios(params).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return p
}

function requestPOST (path, param, formData) {
  console.log(`${path}?${param}`, param)
  const p = new Promise((resolve, reject) => {
    const params = {
      url: `${path}?${param}`,
      method: 'POST',
      data: formData,
      timeout: {
        client: 10 * 1000
      }
    }
    axios(params).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
  return p
}

export default {
    requestSearch,
    requestPOST
}
