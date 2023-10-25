import type { NextApiRequest, NextApiResponse } from 'next';
import PlansServices from '../../../../services/PlansServices';

/**
 * @description - get all available plans categories.
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns plans categories.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
async function PlansCategories(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await PlansServices.getSchoolMembers(req.query.slug);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Could not fetch Plans Members' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = await PlansServices.createSchoolMembers(req.query?.username ,req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Could not add Plan Subscriber' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default PlansCategories;
