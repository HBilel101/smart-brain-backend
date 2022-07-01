

const handleProfile = (req,res,postgres,)=>
{const {id} = req.params;
postgres.select('*').from('users').where('id',id)
.then(user=>{
    if(user.length){
        res.json(user)
    }else{
        res.status(400).json("user not found")
    }
})
.catch(err=>res.status(400).json('error finding the user'));}


module.exports={
handleProfile:handleProfile
}