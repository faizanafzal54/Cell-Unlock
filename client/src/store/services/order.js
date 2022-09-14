import { apiUrl } from 'src/configs/config'
import request from 'src/configs/request'
const setHeader = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6Ijo6MSIsInJvbGUiOiJVU0VSIiwidXNlciI6eyJfaWQiOiI2MzFmOTg5MzQ0NjY3ODA4NjNiYzliNDgiLCJuYW1lIjoiYXNpZiBraGFuIiwiZmlyc3ROYW1lIjoiYXNpZiIsImxhc3ROYW1lIjoia2hhbiIsImVtYWlsIjoiYXNpZi5raGFuQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIn0sImlhdCI6MTY2MzEwMzQxOSwiZXhwIjoxNjYzMzYyNjE5fQ.HJ7WgSck3YG4icMI9daTBMpAfG_4HkWmpsziXv16BPA',
  },
}
export const orderList = () => {
  return request.get(apiUrl + 'orders/list', setHeader)
}

export const addOrder = (obj) => {
  return request.post(apiUrl + 'orders/create', obj, setHeader)
}

export const serviceList = () => {
  return request.get(apiUrl + 'services', setHeader)
}
