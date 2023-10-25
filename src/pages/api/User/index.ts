import type { NextApiRequest, NextApiResponse } from 'next';
import PeopleService from '../../../../services/PeopleService';

/**
 * @description - get Profile after send page to browser.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return user profile basic data like username and avatar.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function User(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' && req.query.key) {
    try {
      const data = await PeopleService.getUserByKeyName({
        value:
          typeof req.query.value === 'string'
            ? req.query.value
            : req.query?.value[0],
        key:
          typeof req.query.key === 'string' ? req.query.key : req.query?.key[0],
      });
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.detailUser) {
    try {
      const data = await PeopleService.getUsersDetail(
        typeof req.query.username === 'string'
          ? [req.query.username]
          : req.query?.username,
        typeof req.query.usersFields === 'string'
          ? req.query.usersFields.split(',')
          : req.query?.usersFields,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.emails) {
    try {
      const data = await PeopleService.getallProfilesByEmail(
        typeof req.query.emails === 'string'
          ? JSON.parse(req.query.emails)
          : req.query.emails,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await PeopleService.getUser(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = await PeopleService.createUser(req.body);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const data = await PeopleService.updateUser(req.body.data);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default User;
