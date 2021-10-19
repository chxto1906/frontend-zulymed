import axios from 'axios';
import Cookies from 'js-cookie'

export default class Api {

  constructor(baseurl,method='post',headers={'Content-Type': 'application/json'},data={},params={},auth=null){
    this.method = method
    this.baseurl = baseurl
    this.headers = headers
    this.data = data;
    this.params = params
    this.auth = auth
    this.base_url_redirect = "https://externaevaluaciones.com"
    this.axios = axios.create();
  }

  async call(url) {
    const that = this
    return this.axios({
      method: this.method,
      url: `${this.baseurl}${url}`,
      data: this.data,
      // only set params if request is get or delete
      params: this.params,
      headers: this.headers,
      auth: this.auth,
    })
    .then(function(res){
      if (res.status == 401){
        let userLogged = JSON.parse(Cookies.get("userLogged"))
        let rol = userLogged.user.rol
        Cookies.remove("userLogged")
        if (rol == "admin"){
          window.location.href = `${that.base_url_redirect}/backoffice/auth`
        }else{
          window.location.href = `${that.base_url_redirect}/auth`
        }
      }else{
        return res.data
      }
    })
    .then(function(res){
      return res.data
    })
    .catch(function(err) {
      console.log(`Error CALL ${err}`)
    })
  }


  async call_respuesta_directa(url) {
    const that = this;
    return this.axios({
      method: this.method,
      url: `${this.baseurl}${url}`,
      data: this.data,
      // only set params if request is get or delete
      params: this.params,
      headers: this.headers,
      auth: this.auth,
    })
    .then(function(res){
      if (res.status == 401){
        let userLogged = JSON.parse(Cookies.get("userLogged"))
        let rol = userLogged.user.rol
        Cookies.remove("userLogged")
        if (rol == "admin"){
          window.location.href = `${that.base_url_redirect}/backoffice/auth`
        }else{
          window.location.href = `${that.base_url_redirect}/auth`
        }
      }else{
        return res
      }
    })
    .catch(function(err) {
      console.log(`Error CALL ${err}`)
    })
  }

}
