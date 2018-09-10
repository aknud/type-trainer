const axios = require('axios');
require('dotenv').config();
//jest doesn't use ES6 imports so we use module.export
let uniqueUser = 0;
module.exports = {
    allUsers: ()=>{
        return axios.get(`${process.env.FRONTEND_DOMAIN}/api/all-users`).then(res=>{
            return res.data
        })
    },
    userById: ()=>{
        return axios.get(`${process.env.FRONTEND_DOMAIN}/api/user/30`).then(res=>{
            return res.data
        })
    },
    loggedIn: ()=>{
        let username = 'ross'+ uniqueUser;
        let password = 'nope';
        let img = `https://robohash.org/${username}`;
        uniqueUser++;
        return axios.post(`${process.env.FRONTEND_DOMAIN}/api/new-user`, {username, password, img}).then(res =>{
            return res.data
        })
    }

}