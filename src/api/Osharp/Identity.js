import ajax from 'slowf/utils/axios'

let path = '/Identity'

export function Token (option) {
  return new ajax().base(path).post('/Token').data(option).send()
}

export function Profile () {
  return new ajax().base(path).get('/Profile').send()
}

export function Logout () {
  return new ajax().base(path).get('/Logout').send()
}
