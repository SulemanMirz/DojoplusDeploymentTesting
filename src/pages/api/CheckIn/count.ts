import type { NextApiRequest, NextApiResponse } from 'next';
import CheckIns from '../../../../services/CheckIns';

/**
 * @description - get check-in counts for a specific user.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return check-in counts for a specific user.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function CheckIn(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' && req.query.slug) {
    try {
      const data = await CheckIns.getSchoolCheckIns(req.query.slug as string);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({
        message: `A problem occurred while getting the check-ins for ${req.query.slug}.`,
      });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await CheckIns.getUserCheckInsCount(
        req.query.username as string,
      );
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({
        message: 'A problem occurred while getting the check-ins count.',
      });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default CheckIn;
