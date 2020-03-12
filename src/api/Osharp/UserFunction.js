import ajax from 'slowf/utils/axios'

let path = '/Admin/UserFunction'

export function ReadFunctions (userId, option) {
  return new ajax().base(path).post('/ReadFunctions').params({ userId }).data(option).send()
}
