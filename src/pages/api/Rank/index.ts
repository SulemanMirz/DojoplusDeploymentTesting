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
  if (req.method === 'GET' && req.query.martialArts && req.query.schools) {
    try {
      const data = await RanksService.getSchoolsByMartialsArts(
        req.query.martialArts,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.martialArts) {
    try {
      const data = await RanksService.getBeltsByMartialsArts(
        req.query.martialArts,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.schoolName) {
    try {
      const data = await RanksService.getMastersBySchool(req.query.schoolName);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.params === 'MartialArts') {
    try {
      const data = await RanksService.getMartialsArts();
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.martialArtsSchool) {
    try {
      const data = await RanksService.getSchoolsListingWRTMartialArts(
        req.query.searchQuery as string,
        req.query.martialArtsSchool as string,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.instructors) {
    try {
      const data = await RanksService.getMastersBySearch(
        req.query.searchQuery as string,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.getUser) {
    try {
      const data = await RanksService.getUserFromAllProfilesRanks(
        req.query.username as string,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.slug) {
    try {
      const data = await RanksService.getSchoolFromAllSchoolsRanks(
        req.query.slug as string,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await RanksService.getRanks(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'PUT' && req.body.recordId) {
    try {
      const data = await RanksService.verifyRank(
        req.body.recordId as string,
        req.body.verified,
        req.headers.origin,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const data = await RanksService.uploadImageURL(
        req.query.id as string,
        req.body.fieldName as string,
        req.body.urls,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = await RanksService.addNewRank(req.body);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const data = await RanksService.deleteRank(req.query.id as string);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default Rank;
