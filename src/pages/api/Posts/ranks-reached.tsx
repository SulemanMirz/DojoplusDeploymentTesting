import type { NextApiRequest, NextApiResponse } from 'next';
import PostsServices from '../../../../services/PostsServices';

/**
 * @description - get all available plans.
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns plans for specific schools.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function RanksReachedPosts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await PostsServices.getMorePeopleWithSameRank(
        req.query.username,
        req.query.level,
        req.query.schoolName,
      );
      res.send(data);
    } catch (error) {
      console.log(error);
      res
        .status(504)
        .json({ message: 'Could not get people with the same rank' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default RanksReachedPosts;
