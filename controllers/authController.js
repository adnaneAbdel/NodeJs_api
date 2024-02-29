const User = require('../moduls/user')
const jwtHelpers = require('../utils/JWTHelpers')
const bcrypt = require('bcrypt')


exports.login = async (req,res) => {
       const {email, password} = req.body
       const user = await User.findOne({email})
       if(user && bcrypt.compareSync(password, user.password)){
        res.json({
            success: true,
            data: {
                id: user.id,
                name : user.name,
                accessToken: jwtHelpers.sign({sub: user.id})
            }
        })
       }else{
        res.status(401).json({
            message: 'something worng'
        })
       }

}
exports.register = async (req,res) => {
    const { name, email, password} = req.body
    const user = User({
        name,
        email,
        password: bcrypt.hashSync(password, 8)
    })
    try{
        await user.save()
        res.send('the info well registered')
    }catch (e){
        res.status(500).json({
            message: 'somthing was wrong'
        })
    }
    res.send('register is done')
    
}
exports.me = async (req,res) => {
    const user = await User.findById(req.userId)
    res.json({
        data:{
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
    res.send('my info is done')
    
}