import type { NextApiRequest, NextApiResponse } from 'next';
import RanksService from '../../../../services/RanksService';

/**
 * @description - get Profile after send page to browser.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return user profile basic data like username and avatar.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function Rank(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await RanksService.getInfoByUserNameByMartialsArtsByBelts(
        req.query.username,
        req.query.martialArt,
        req.query.ranks,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default Rank;
