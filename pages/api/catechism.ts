import { NextApiRequest, NextApiResponse } from "next";
import catechism from "data/catechismData.json";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(catechism);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
