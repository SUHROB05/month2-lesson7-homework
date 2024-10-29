import fs from "node:fs"
import {join} from "node:path";
import {v4} from 'uuid'

const userDataPath = join(process.cwd(), "database", "users.json") 
let userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'))
export const createUserController = (req, res, next) => {
    try{
        
        let {username, password, fullname, age, email, gender} = req.body
        
        if(!username || !password || !fullname || !age || !email || !gender){
            return res.status(400).send("barcha malumotlar kiritilmagan")
        }
        else if(username.length < 3){
            return res.status(400).send("username kamida 3 ta belgi bolishi kerak")
        }
        else if(password.length < 5){
            return res.status(400).send("parol kamida 5 ta belgi bolishi kerak")
        }
        else if(fullname.length < 10){
            return res.status(400).send("fullname kamida 10 ta belgi bolishi kerak")
        }
        else if(+age < 10){
            return res.status(400).send("Yosh chegarasi 10")
        }
        else if(gender !== 'male' && gender !== "female"){
            return res.status(400).send(`gender faqat "male" yoki "female" bolishi kerak`)
        }
        
        // console.log(userData);
        for(let i=0; i<userData.length; i++){
            const user = userData[i]
            if(user.email == email){
                return res.status(400).send(`Bu email bilan oldin ham ro'yxatdan o'tilgan`)
            }
            else if(user.username == username){
                return res.status(400).send(`Bu username bilan oldin ham ro'yxatdan o'tilgan`)
            }
        }
        
        userData.push({
            id: v4(),
            username,
            password,
            fullname,
            age : +age,
            email,
            gender
        })
        fs.writeFileSync(userDataPath,JSON.stringify(userData), 'utf-8')
        return res.status(201).send("Ro'yxatdan otildi")

    }catch(err){
        next(err)
    }
}
export const getUserInfoController = (req, res, next) => {
    try{
        
        let item = req.params.item
        
        for(let i=0; i<userData.length; i++){
            const user = userData[i]
            if(user.email == item){
                return res.status(400).send(user)
            }
            else if(user.username == item){
                return res.status(400).send(user)
            }
        }
        
        return res.status(400).send("Bunday foydalanuvchi topilmadi, qaytadan urinib koring!")
        
    }catch(err){
        next(err)
    }
}
export const updateUserController = (req, res, next) => {
    let item = req.params.item

    try{
        
        let {username, password, age, email} = req.body
        
        if(!username || !password ||  !age || !email){
            return res.status(400).send("barcha malumotlar kiritilmagan")
        }
        else if(username.length < 3){
            return res.status(400).send("username kamida 3 ta belgi bolishi kerak")
        }
        else if(password.length < 5){
            return res.status(400).send("parol kamida 5 ta belgi bolishi kerak")
        }
        else if(+age < 10){
            return res.status(400).send("Yosh chegarasi 10")
        }
        function usernameEmailCheck(username, email){
            for(let i=0; i<userData.length; i++){
                const user = userData[i]
                if(user.email == email){
                    return false
                }
                else if(user.username == username){
                    return false
                }
            }
            return true
        }
        // console.log(userData);
        for(let i=0; i<userData.length; i++){
            const user = userData[i]
            if(user.email == item){
                if(usernameEmailCheck(username, email)){
                    userData.push({
                        ...user,
                        username,
                        password,
                        email,
                        age : +age
                    })
                    fs.writeFileSync(userDataPath,JSON.stringify(userData), 'utf-8')
                    return res.status(201).send("updated")
                }else{
                    return res.status(400).send("bu email yoki username bilan royxatdan o'tilgan")
                }
            }
            else if(user.username == item){
                if(usernameEmailCheck(username, email)){
                    userData.push({
                        ...user,
                        username,
                        password,
                        email,
                        age : +age
                    })
                    fs.writeFileSync(userDataPath,JSON.stringify(userData), 'utf-8')
                    return res.status(201).send("updated")
                }else{

                    return res.status(400).send("bu email yoki username bilan royxatdan o'tilgan")
                }
            }
        }
        
        return res.status(400).send("bunday foydalanuvchi topilmadi")

    }catch(err){
        next(err)
    }

}
export const deleteUserInfoController = (req, res, next) => {
    try{
        
        let username = req.params.username
        let password = req.params.password
        
        for(let i=0; i<userData.length; i++){
            const user = userData[i]
            if(user.username == username && user.password == password){
                userData.splice(i, 1)
                fs.writeFileSync(userDataPath,JSON.stringify(userData), 'utf-8')
                return res.status(201).send(`malumot o'chirildi`)
            }
        }
        
        return res.status(400).send("Bunday foydalanuvchi topilmadi, qaytadan urinib koring!")
        
    }catch(err){
        next(err)
    }
}