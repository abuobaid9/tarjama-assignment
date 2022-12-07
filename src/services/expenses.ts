import { expenseTable as Expense } from "../model";
import jwt from "jsonwebtoken";

async function create(userJwt: string, expenseObject: any) {
  try {
    interface JwtPayload {
      id: string;
    }
    const { id: userId } = jwt.verify( userJwt,process.env.JWT_SECRET as string) as JwtPayload;
    return {
      response: await Expense.create({ ...expenseObject, user_id: userId }),
      status: 201,
    };
  } catch (error) {
    return {
      response: "bad request",
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
      response: await Expense.update(
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
      response: "bad request",
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
      response: await Expense.findOne({
        where: { user_id: userId, id: expenseId },
      }),
      status: 200,
    };
  } catch (error) {
    return {
      response: "bad request",
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
      response: await Expense.findAll({
        where: {
          user_id: userId,
          spending_date: `${year}-${month}-${day}`,
        },
      }),
      status: 200,
    };
  } catch (error) {
    return {
      response: "bad request",
      status: 400,
    };
  }
}

export { create, edit, get, list };
