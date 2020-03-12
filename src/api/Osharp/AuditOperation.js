import ajax from 'slowf/utils/axios'

let path = '/Admin/AuditOperation'

export function Read (option) {
  return new ajax().base(path).post('/Read').data(option).send()
}

export function Update (option) {
  return new ajax().base(path).post('/Update').data(option).send()
}
