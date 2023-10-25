import type { NextApiRequest, NextApiResponse } from 'next';
import PlansServices from '../../../../services/PlansServices';

/**
 * @description - get all available plans.
 * @param req - Req.
 * @param res - Res.
 * @returns - Returns plans for specific schools.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function Plans(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await PlansServices.getPlans(
        typeof req.query.schoolId === 'string'
          ? req.query.schoolId
          : req.query?.schoolId[0],
      );

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Could not get Plans' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = await PlansServices.addPlan(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Could not add Plan' });
    }
  } else if (req.method === 'PUT') {
    try {
      const data = await PlansServices.updatePlan(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Could not update Plan' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const data = await PlansServices.deletePlan(req.query.id as string);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Could not delete plan' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default Plans;
