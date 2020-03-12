import ajax from 'slowf/utils/axios'

let path = '/Admin/Pack'

export function Read (option) {
  return new ajax().base(path).post('/Read').data(option).send()
}
