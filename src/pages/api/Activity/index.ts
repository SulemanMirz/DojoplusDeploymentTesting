import type { NextApiRequest, NextApiResponse } from 'next';
import CheckIns from '../../../../services/CheckIns';

/**
 * @description - get Profile after send page to browser.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return user profile basic data like username and avatar.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function Activity(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await CheckIns.getUserCheckIns(
        typeof req?.query?.username === 'string'
          ? req?.query?.username
          : req.query?.username[0],
        typeof req?.query?.duration === 'string'
          ? req?.query?.duration
          : req?.query?.duration?.[0],
        req?.query?.schoolSlug as string,
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

export default Activity;
