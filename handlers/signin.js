const handleSignin =(req,res,postgres,bcrypt) =>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json('eror')
    }
    postgres.select('email','hash').from('login')
    .where('email','=',email)
    .then(data=>{
        const valid = bcrypt.compareSync(password,data[0].hash);
        if(valid){
            postgres.select('*').from('users')
            .where('email','=',email)
            .then( user=>res.json(user[0]))
        }else {
            res.status(400).json('wrong credentials')
        }

    })
    .catch(err=>res.status(400).json('wrong credentials'));

    
    
    
}


module.exports = {
    handleSignin:handleSignin
}

