import ajax from 'slowf/utils/axios'

let path = '/Auth'

export function GetAuthinfo (option) {
  return new ajax().base(path).get('/GetAuthinfo').data(option).send()
}
