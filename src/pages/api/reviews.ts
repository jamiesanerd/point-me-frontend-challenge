import type { NextApiRequest, NextApiResponse } from 'next';
import data from '@/data/reviewsData';
import Review from '@/data/Review';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 2;
const MAX_PAGE_SIZE = 5;

const setPageSize = (input: number | null | undefined) => {
  if (!input) {
    return DEFAULT_PAGE_SIZE;
  }

  if (input > MAX_PAGE_SIZE) {
    return MAX_PAGE_SIZE;
  }

  return input;
};

const parseNumberInput = (input: any) => {
  if (!input) return null;

  try {
    return parseInt(input);
  } catch {
    return null;
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Review[]>,
) {
  if (req.method === 'GET') {
    const page = parseNumberInput(req.query.page) || DEFAULT_PAGE_NUMBER;
    const pageSize = setPageSize(parseNumberInput(req.query.pageSize));

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const dataset = data.filter(
      (r: Review) => r.id > startIndex && r.id <= endIndex,
    );
    res.status(200).json(dataset);
  } else {
    res.status(404);
  }
}
