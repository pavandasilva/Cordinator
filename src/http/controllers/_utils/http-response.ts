import { Response } from "express";

const created = (res: Response, data: Record<string, any>): Response => {
  if(data){
    return res.status(201).json({ data })
  }
  
  return res.status(201);
}

const ok = (res: Response, data: Record<string, string>): Response => {
  if(data){
    return res.status(200).json({ data })
  }
  
  return res.status(200);
}

const badRequest = (res: Response, error: Error): Response => {
  return res.status(400).json({ error: error.message })
}

const unauthorized = (res: Response): Response => {
  return res.status(401).json({ error: 'unauthorized'})
}

export { created, ok, badRequest, unauthorized }