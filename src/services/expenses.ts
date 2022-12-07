import { expenseTable } from "../model";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

async function create(userJwt: string, expenseObject: any) {

  try {

    interface JwtPayload {
      id: string;
    }
    const { id: userId } = jwt.verify(userJwt, process.env.JWT_SECRET as string) as JwtPayload;

    return {
      response: await expenseTable.create({ ...expenseObject, user_id: userId }),
      status: 201,
    };
  } catch (error) {
    return {
      response: "error in services",
      status: 400,
    };
  }
}
async function edit(
  userJwt: string,
  id: number,
  categoryId: number,
  day: number,
  month: number,
  year: number,
  amount: number
) {
  try {
    interface JwtPayload {
      id: string;
    }
    const { id: userId } = jwt.verify(
      userJwt,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    return {
      response: await expenseTable.update(
        {
          category_id: categoryId,
          spending_date: `${year}-${month}-${day}`,
          amount: amount,
        },
        { where: { id, user_id: userId } }
      ),
      status: 201,
    };
  } catch (error) {
    return {
      response: "error in services",
      status: 400,
    };
  }
}
async function get(userJwt: string, expenseId: number) {
  try {
    interface JwtPayload {
      id: string;
    }
    const { id: userId } = jwt.verify(
      userJwt,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    return {
      response: await expenseTable.findOne({
        where: { user_id: userId, id: expenseId },
      }),
      status: 200,
    };
  } catch (error) {
    return {
      response: "error in services",
      status: 400,
    };
  }
}
async function deleted(userJwt: string, expenseId: number) {
  try {
    interface JwtPayload {
      id: string;
    }
    const { id: userId } = jwt.verify(userJwt, process.env.JWT_SECRET as string) as JwtPayload;

    const recod = await expenseTable.destroy({ user_id: userId, id: expenseId })
    return recod;
  } catch (error) {
    return {
      response: "error in services",
      status: 400,
    };
  }
}
async function list(userJwt: string, day: number, month: number, year: number) {
  try {
    interface JwtPayload {
      id: string;
    }
    const { id: userId } = jwt.verify(
      userJwt,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    return {
      response: await expenseTable.findAll({
        where: {
          user_id: userId,
          spending_date: `${year}-${month}-${day}`,
        },
      }),
      status: 200,
    };
  } catch (error) {
    return {
      response: "error in services",
      status: 400,
    };
  }
}

export { create, edit, get, deleted, list };
