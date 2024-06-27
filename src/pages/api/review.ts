import type { NextApiRequest, NextApiResponse } from "next";
import Review from "@/data/Review";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Review[]>
) {
  if (req.method === "GET") {
    // fetch single review by id
    res.status(200);
  } else if (req.method === "POST") {
    // "save" single review by id
    res.status(200);
  } else {
    res.status(404);
  }
}
