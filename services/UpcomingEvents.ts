/* eslint-disable class-methods-use-this */
import SeminarsService from './SeminarsService';
import Competitions from './Competitions';
import { getTableInstance, TABLES } from './Airtable';
import { formattedResponse } from '../src/shared/utils/airtable-utils';
import { cache } from './cache';

const eventsTable = getTableInstance(TABLES.EVENTS);

class UpcomingEventsService {
  /**
   * @description - get all Events.
   * @returns - Return all Events.
   */

  async getAllEvents(pageNo = 1): Promise<any> {
    try {
      let events = [];
      const limit = 50;

      const processRecords = (): { events: any; length: number } => {
        const count = events.length;
        const page = pageNo || 1;
        const offset = page * limit - limit;
        const response = events.slice(offset, limit * page);
        return { events: response, length: count };
      };

      const seminars = await SeminarsService.getAllSeminars();
      const competitions = await Competitions.getAllCompetitions();
      const seminarsEvent = seminars.map((element) => {
        return { ...element, eventType: 'seminar' };
      });
      const competitionsEvent = competitions.map((element) => {
        return { ...element, eventType: 'competition' };
      });
      events = seminarsEvent.concat(competitionsEvent).sort((a, b): any => {
        if (!a.startDate || !b.startDate) return -1;
        return +new Date(b.startDate) - +new Date(a.startDate);
      });
      return processRecords();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getEvents(page = 1, countriesToFilter?): Promise<any> {
    try {
      let cachedData = await cache.get('events');
      const limit = 50;
      const today = new Date().toISOString().slice(0, 10);
      if (!cachedData) {
        cachedData = await eventsTable
          .select({
            view: 'Sorted',
            filterByFormula: `DATETIME_DIFF({Start Date}, '${today}', 'days') >= 0`,
          })
          .all();
        cachedData = formattedResponse(cachedData);
        cache.set('events', cachedData);
      }
      const count = cachedData?.length;
      const offset = page * limit - limit;
      let response = cachedData?.slice(offset, limit * page);
      const countriesAll: string[] = cachedData?.map((event) => {
        if (event?.country) {
          return event?.country;
        }
        return '';
      });
      const countries = [
        ...new Set(countriesAll.map((str) => str.toLowerCase())),
      ]
        .map((str) =>
          str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        )
        .map((country) => ({ name: country, selected: false }))
        .filter((country) => country.name !== '');
      if (countriesToFilter && countriesToFilter?.length) {
        response = response.filter((event) =>
          countriesToFilter.includes(event?.country),
        );
      }
      return { events: response, length: count, countries };
    } catch (error) {
      console.error(error, 'Error while getting events.');
      throw error;
    }
  }
}

export default new UpcomingEventsService();
