import { expenses as service } from "../services";
import express from "express";
const router = express.Router();

router.get("/", async function (req: any, res: any) {
  try {
    const data = await service.list(
      req.cookies.token,
      req.query.day,
      req.query.month,
      req.query.year
    );
    return res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something went wrong" });
  }
});
router.get("/:id", async function (req: any, res: any) {
  try {
    const data = await service.get(req.cookies.token, req.params.id);
    res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something went wrong" });
  }
});
router.post("", async function (req: any, res: any) {
  try {
    const data = await service.create(req.cookies.token, req.body.name);
    res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something went wrong" });
  }
});
router.put("/:id", async function (req: any, res: any) {
  try {
    const data = await service.edit(
      req.cookies.token,
      req.params.id,
      req.body.categoryId,
      req.body.day,
      req.body.month,
      req.body.year,
      req.body.amount
    );
    res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something went wrong" });
  }
});

export { router };
