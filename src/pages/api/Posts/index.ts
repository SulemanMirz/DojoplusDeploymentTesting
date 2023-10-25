import type { NextApiRequest, NextApiResponse } from 'next';
import PostsServices from '../../../../services/PostsServices';

/**
 * @description - get all available plans.
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns plans for specific schools.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function Posts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await PostsServices.getAllPosts(
        parseInt(req.query.pageNo as string),
      );
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Could not get posts' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default Posts;
