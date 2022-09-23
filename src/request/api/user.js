import {get, post} from "../service";

let base = `/api/user`

export default{
    login : params => post(`${base}/login`,params)
} 