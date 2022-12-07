import { expenses } from "../services";
import express from "express";
const router = express.Router();

// router.get("/", async function (req: any, res: any) {
//   try {
//     const data = await expenses.list(
//       req.cookies.token,
//       req.query.day,
//       req.query.month,
//       req.query.year
//     );
//     return res.status(data.status).send(data.response);
//   } catch (error) {
//     res.status(500).send({ response: "something went wrong in get req (get expenses)" });
//   }
// });
router.get("/:id", async function (req: any, res: any) {
  try {
    const data = await expenses.get(req.cookies.token, req.params.id);
    res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something went wrong  in get req (get by id expenses)" });
  }
});
router.post("/", async function (req: any, res: any) {
  try {

    const data = await expenses.create(req.cookies.token, req.body);

    res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something went wrong  in post req (post expenses)" });
  }
});
router.put("/:id", async function (req: any, res: any) {
  try {
    const data = await expenses.edit(
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
    res.status(500).send({ response: "something went wrong  in put req (put expenses)" });
  }
});
router.delete("/:id", async function (req: any, res: any) {
  try {
    const data = await expenses.deleted(req.cookies.token, req.params.id);
    res.status(data.status).send(data.response);
  } catch (error) {
    res.status(500).send({ response: "something went wrong  in delete req (delete by id expenses)" });
  }
});
export { router };
