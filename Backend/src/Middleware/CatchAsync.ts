
import { Request,Response,NextFunction, response } from "express";

export const CatchAsync=
(fn:(req:Request,res:Response,next:NextFunction)=>Promise<any>)=>
( req:Request,res:Response,next:NextFunction)=>{
    Promise.resolve(fn(req,res,next).catch(next));
}