import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = async (req: Request, res: Response, next: NextFunction)=>{
    if(!["/","","/health"].includes(req.url) && process.env.ENV != 'local') {
        console.log(`REQUEST => METHOD:[${req.method}] PATH:[${req.url}] BODY:[ ${JSON.stringify(req.body)} ]`)
    }
    const oldJson = res.json;
    res.json = (body) => {
        res.locals.body = body;
        return oldJson.call(res, body);
    };
    res.on("finish",()=>{
        const logBase = `RESPONSE => CODE:[${res.statusCode}] PATH:[${req.url}] DATA:[${JSON.stringify(res.locals.body)}]`
        if(res.statusCode!=200){
            console.log("[ERROR] ",logBase);
        }else{
            if(!["/","","/health"].includes(req.url) && process.env.ENV != 'local') console.log(logBase)
        }
    })
    next();
}