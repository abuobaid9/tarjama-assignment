import { Request, Response } from "express";
import { category as service } from "../services";
import express from "express";
const router = express.Router();


router.get("/", async function (req: Request, res: Response) {
  try {

    const data = await service.list(req.cookies.token);
    res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something went wrong in get req (list category)" });
  }
});
router.get("/:id", async function (req: any, res: any) {
  try {
    const data = await service.get(req.cookies.token, req.params.id);
    res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something went wrong in get req (get id category)" });
  }
});
router.post("/", async function (req: any, res: any) {
  try {


    const data = await service.create(req.cookies.token, req.body.name);
    
    res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something went wrong in post req (post category)" });
  }
});
router.put("/:id", async function (req: any, res: any) {
  try {
    const data = await service.edit(
      req.cookies.token,
      req.params.id,
      req.body.name
    );
    res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something went wrong in put req (put category)" });
  }
});

export { router };
