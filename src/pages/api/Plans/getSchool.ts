import type { NextApiRequest, NextApiResponse } from 'next';
import PlansServices from '../../../../services/PlansServices';

/**
 * @description - get all available plans categories.
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns plans categories.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
async function GetSchool(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await PlansServices.getSchoolWithSlug(req.query.slug);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Could not fetch Plans Members' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default GetSchool;
