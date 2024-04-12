import HttpClient from '@/api/httpClient'
import constant from '@/api/endpoints/constant'
import auth from '@/api/endpoints/auth'
import user from '@/api/endpoints/user'

const httpClient = new HttpClient()

export default {
  constant: constant(httpClient),
  auth: auth(httpClient),
  user: user(httpClient),
}
