import ajax from 'slowf/utils/axios'

let path = '/Admin/RoleFunction'

export function ReadFunctions (roleId, option) {
  return new ajax().base(path).post('/ReadFunctions').params({ roleId }).data(option).send()
}
