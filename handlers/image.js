const clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '005b12b654744918baff2371600e75d0'
   });

const handleImageApi = (req,res,postgres)=>{
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.input)
      .then(response=>{
        res.json(response)
      }).catch(err=>res.status(400).json('api error'))
}


const handleImage=(req,res,postgres)=>
{const {id} = req.body;
postgres('users').where('id','=',id)
.increment({
    entries:1
})
.returning('entries')
.then(entries=>res.json(entries[0].entries))
.catch(err=>res.status(400).json('unable to get entries'))}



module.exports= {
    handleImage:handleImage,
    handleImageApi:handleImageApi
}