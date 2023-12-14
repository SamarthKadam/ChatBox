const AppError=require('./AppError');

const HandleTypeError=(err,req)=>{

    const message=`Can't find ${req.url} in this server`;
    return new AppError(message,404);
}

const HandleDuplicateError=(err)=>{

    // const message=`Invalid Duplicate field ${err.keyValue.email}`;
     const message=`The email is in use please use different email`;
    return new AppError(message,400);
}

const HandleValidationError=(err)=>{

    const message=`Invalid Input data. Please Validate data`;
    return new AppError(message,400);
}


module.exports=(err,req,res,next)=>{

    let error;
    if(err.message==='TypeError')
    {
     error=HandleTypeError(err,req);
    }
    if(err.code===11000)
    {
        error=HandleDuplicateError(err);
    }
     if(err._message==='users validation failed')
    {
        error=HandleValidationError(err);
    }

    if(error==undefined)
    {
        res.status(400).json({
            status:'fail',
            message:'Something went wrong'
        })
    }
    else{
    res.status(error.statusCode).json({
        status:error.status,
        message:error.message
    })
     }

}