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
    // "save" single review by id - obviously not really saving anything but need something here to test
    res.status(200).json(req.body);
  } else {
    res.status(404);
  }
}
