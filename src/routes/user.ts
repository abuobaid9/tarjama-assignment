import express from "express";
import { user as service } from "../services";
import { userTable } from "../model";

const router = express.Router();
router.post('/signin', async function (req: any, res: any) {
  try {
    const data = await service.signin(req.body.username, req.body.password);
    res.cookie('token', data.cookie, { httpOnly: true });
    res.cookies
    res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something wrong in signin route" });
  }
});

router.post('/signup', async function (req: any, res: any) {
  try {
    const data = await service.signup( req.body.username, req.body.email, req.body.password);
    res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something wrong in signup route" });
  }
});

router.get('/', async function(req: any, res: any){
  const userRecords = await userTable.findAll();
  res.send(userRecords);
});

export { router };
