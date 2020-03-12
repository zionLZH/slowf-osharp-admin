import ajax from 'slowf/utils/axios'

let path = '/Admin/Role'

export function Read (option) {
  return new ajax().base(path).post('/Read').data(option).send()
}

export function Create (option) {
  return new ajax().base(path).post('/Create').data(option).send()
}

export function Update (option) {
  return new ajax().base(path).post('/Update').data(option).send()
}

export function Delete (option) {
  return new ajax().base(path).post('/Delete').data(option).send()
}

export function ReadNode (option) {
  return new ajax().base(path).get('/ReadNode').data(option).send()
}

export function SetModules (option) {
  return new ajax().base(path).post('/SetModules').data(option).send()
}

export function ReadUserRoles (userId) {
  return new ajax().base(path).get('/ReadUserRoles').params({ userId }).send()
}
