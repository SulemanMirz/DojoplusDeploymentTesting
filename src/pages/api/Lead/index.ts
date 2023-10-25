import type { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import LeadService from '../../../../services/LeadService';

/**
 * @description - Create new leads.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return newly created lead.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function Lead(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = await LeadService.createLead(req.body);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await LeadService.getSchool(
        typeof req.query.schoolId === 'string'
          ? req.query.schoolId
          : req.query?.schoolId[0],
      );
      const schoolFormatData = _.mapKeys(data.fields, (v, k) => _.camelCase(k));
      const scheduleSchoolFormatData = data.scheduleSchool.map((rank) =>
        _.mapKeys(rank.fields, (v, k) => _.camelCase(k)),
      );
      const plansFormatData = data.plans.map((rank) =>
        _.mapKeys(rank.fields, (v, k) => _.camelCase(k)),
      );
      res.send({
        ...schoolFormatData,
        scheduleSchool: scheduleSchoolFormatData,
        plans: plansFormatData,
      });
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default Lead;
