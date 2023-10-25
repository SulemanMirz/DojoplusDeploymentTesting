import type { NextApiRequest, NextApiResponse } from 'next';
import GMTOffsetService from '../../../../services/TimezoneGoogle';

/**
 * @description - get Profile after send page to browser.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return user profile basic data like username and avatar.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
async function GMTOffset(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    req.socket.setTimeout(7200000);
    try {
      const data = await GMTOffsetService.updateGMTOffsets(req, res);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default GMTOffset;
