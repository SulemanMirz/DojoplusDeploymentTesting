import type { NextApiRequest, NextApiResponse } from 'next';
import FollowService from '../../../../services/Follows';

/**
 * @description - Followers, Following, and allow to follow.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return Followers, Following, and allow to follow.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function Follows(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' && req.query.followers) {
    try {
      const data = await FollowService.getFollowers(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.following) {
    try {
      const data = await FollowService.getFollowing(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.detailedFollowings) {
    try {
      const data = await FollowService.getDetailedFollowings(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.detailedFollowers) {
    try {
      const data = await FollowService.getDetailedFollowers(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.detailedMutualFollowings) {
    try {
      const data = await FollowService.getDetailedMutualFollowings(
        typeof req.query.sourceUser === 'string'
          ? req.query.sourceUser
          : req.query?.sourceUser[0],
        typeof req.query.destinationUser === 'string'
          ? req.query.destinationUser
          : req.query?.destinationUser[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.isFollowing) {
    try {
      const data = await FollowService.isFollowing(
        typeof req.query.sourceUserEmail === 'string'
          ? req.query.sourceUserEmail
          : req.query?.sourceUserEmail[0],
        typeof req.query.destinationUser === 'string'
          ? req.query.destinationUser
          : req.query?.destinationUser[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'PUT' && req.query.follow) {
    try {
      const data = await FollowService.follow(
        typeof req.query.sourceUser === 'string'
          ? req.query.sourceUser
          : req.query?.sourceUser[0],
        typeof req.query.destinationUser === 'string'
          ? req.query.destinationUser
          : req.query?.destinationUser[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'PUT' && req.query.unfollow) {
    try {
      const data = await FollowService.unfollow(
        typeof req.query.sourceUser === 'string'
          ? req.query.sourceUser
          : req.query?.sourceUser[0],
        typeof req.query.destinationUser === 'string'
          ? req.query.destinationUser
          : req.query?.destinationUser[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default Follows;
