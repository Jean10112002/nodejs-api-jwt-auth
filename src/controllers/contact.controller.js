export const getContact=(req,res)=>{
    res.json({
        title:'ruta protejida',
        user:req.user
    })
}
