import jwt from 'jsonwebtoken'
export const verifyToken=(request,response,next)=>
{
    console.log(request.cookies);
    const token=request.cookies.jwt;
    console.log({token })
    if(!token)
        return response.status(401).send("you are not authenticated")
    //jwt.verify() method provided by jwt It checks whether a given token is properly signed and not expired.it takes token and secret key as parameter
    //In the context of jwt.verify(), the payload represents the decoded content of the JSON Web Token (JWT). When you verify a JWT using jwt.verify(),
    // the function checks the token's signature and, if valid, decodes the payload and passes it to the callback function.
    jwt.verify(token,process.env.JWT_KEY,async(err,payload)=>{
        if(err)
        {
            return response.status(403).send("token is invalid");
        }
        request.userId=payload.userId;
        next();

    })

}