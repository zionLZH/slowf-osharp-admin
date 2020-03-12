import ajax from 'slowf/utils/axios'

let path = '/Admin/Module'

export function Read (option) {
  return new ajax().base(path).post('/Read').data(option).send()
}

export function ReadFunctions (option) {
  return new ajax().base(path).post('/ReadFunctions').data(option).send()
}

export function ReadRoleModules (roleId) {
  return new ajax().base(path).get('/ReadRoleModules').params({ roleId }).send()
}

export function ReadUserModules (userId) {
  return new ajax().base(path).get('/ReadUserModules').params({ userId }).send()
}
