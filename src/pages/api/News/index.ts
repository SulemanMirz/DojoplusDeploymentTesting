import type { NextApiRequest, NextApiResponse } from 'next';
import NewsService from '../../../../services/NewsService';

/**
 * @description - get articles data against a specific user.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return articles data against a specific user.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function News(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await NewsService.getNews(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default News;
