import type { NextApiRequest, NextApiResponse } from 'next';
import PlansServices from '../../../../services/PlansServices';

/**
 * @description - get all available plans categories.
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns plans categories.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function PlansCategories(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const data = await PlansServices.addPlansCategoriesName(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Could not add Plans Categories Name' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await PlansServices.getPlanCategories();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Could not fetch Plans Categories' });
    }
  }
}

export default PlansCategories;
