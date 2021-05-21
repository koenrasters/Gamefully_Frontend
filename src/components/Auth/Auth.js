import API from "../API/API";
import Cookies from "js-cookie";

class Auth
{
    constructor() {
        this.isAuthenticated = false;
    }

    checkCookie()
    {
        if (Cookies.get('token') == null) {
            console.log("token" + this.isAuthenticated);
            return false;
        }
        else;
        {
            return true;
        }
    }

    deleteCookie()
    {
        if(Cookies.get('token') != null) {
            Cookies.remove('token');
        }
        this.isAuthenticated = false;
    }

    async login(credentials) {
        let jwt = '';
        await API.post(`user/auth`, credentials)
            .then(res => {
                if (res.status == 200) {
                    console.log(res.data);
                    jwt = res.data;
                    this.isAuthenticated = true;
                    Cookies.set('token', jwt, {expires: 1});
                }
            })
            .catch(() => {
                this.isAuthenticated = false;
            })
        console.log('AUTHSERVICE: ' + this.isAuthenticated)
        return this.isAuthenticated;
    }

    getIsAuthenticated()
    {
        console.log('AUTHSERVICE: ' + this.isAuthenticated)
        return this.isAuthenticated;
    }


    async checkAuthentication() {
        console.log("checkauthentivation")
        if(this.checkCookie())
        {
            let check = "";
            await API.get("/user/check")
                .then(res => {
                    check = res.data;
                    this.isAuthenticated = true;
                })
                .catch(() => {
                    this.isAuthenticated = false;
                })
            console.log("check api " + this.isAuthenticated)
        }
        return this.isAuthenticated;
    }

    getData()
    {
        let token = Cookies.get('token');
        let decoded
        try {
            decoded = JSON.parse(atob(token.split('.')[1]));
        }catch {
            decoded = null;
        }
        return decoded;
    }

    getRole()
    {
        let decoded = this.getData()
        let data
        try{
            data = decoded.admin;
        }catch {
            data = 0;
        }
        return data;
    }

    getId()
    {
        let id = 0
        try
        {
            id = this.getData().jti
        }
        catch {
            id = -1
        }
        return id
    }


}

export default new Auth();