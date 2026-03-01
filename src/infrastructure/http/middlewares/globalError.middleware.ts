import { Error, Req, Res, Next } from "../../../types/http";
const globalErrorHandler = (err:Error, req:Req, res:Res, next:Next)=>{
    if(err.isOperational){
        return res.status(err.statusCode as number).json({
            success: false,
            message:err.message,
        })
    }
    console.log(err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });

}  
export default globalErrorHandler;