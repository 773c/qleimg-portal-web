import request from '@/utils/request'

export function difference(formData) {
  return request({
    url:'/portal/difference',
    method:'post',
    headers:{'Content-type': 'multipart/form-data;boundary = ' + new Date().getTime()},
    data:formData
  })
}