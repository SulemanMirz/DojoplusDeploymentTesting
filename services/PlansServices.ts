/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { FieldSet, Record, Records } from 'airtable';
import {
  PlanCategories,
  Plans,
  PlanSubscriber,
} from '../src/shared/models/school.model';
import { formattedResponse } from '../src/shared/utils/airtable-utils';

import { TABLES, getTableInstance } from './Airtable';

const table = getTableInstance(TABLES.PLANS);
const categoriesTable = getTableInstance(TABLES.PLANS_CATEGORIES);
const subscriptionTable = getTableInstance(TABLES.PLANS_SUBSCRIPTION);
const plansProfilesTable = getTableInstance(TABLES.PLANS_PROFILES);
const allSchoolPlansTable = getTableInstance(TABLES.ALL_SCHOOLS_PLANS);

class PlansServices {
  /**
   * @description - get all competitions.
   * @returns - Return all competitions.
   */

  async getPlans(slug: string): Promise<Plans[]> {
    try {
      const plans: readonly Record<FieldSet>[] = await table
        .select({
          filterByFormula: `AND({Slug (from School)} = '${slug}', Disabled = FALSE())`,
        })
        .all();
      const records: Plans[] = formattedResponse([...plans]);
      const requests = [];
      records.forEach((record) =>
        requests.push(
          this.getPlanSubscribers(record.planName).then((response) => {
            record.subscribers = response;
          }),
        ),
      );
      await Promise.all(requests);
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getPlanCategories(): Promise<PlanCategories[]> {
    try {
      const plansCategories: readonly Record<FieldSet>[] = await categoriesTable
        .select({
          filterByFormula: '{Name} != ""',
        })
        .all();
      const records: PlanCategories[] = formattedResponse([...plansCategories]);
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addPlansCategoriesName(body): Promise<PlanCategories[]> {
    try {
      const plansCategories: readonly Record<FieldSet>[] =
        await categoriesTable.create({
          ...body,
        });
      const records = formattedResponse([plansCategories]);
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addPlan(body): Promise<Plans> {
    try {
      const plan: Records<FieldSet> = await table.create({
        ...body,
      });
      const records: Plans = formattedResponse([...[plan]]);
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updatePlan(body): Promise<Plans> {
    try {
      const plan: readonly Record<FieldSet>[] = await table.update([
        { ...body },
      ]);
      const records: Plans = formattedResponse([...plan]);
      return records?.[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletePlan(id: string): Promise<Plans> {
    try {
      const plan: Record<FieldSet> = await table.destroy(id);
      const records: Plans = formattedResponse([...[plan]]);
      return records?.[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getPlanSubscribers(planName: string): Promise<Plans[]> {
    try {
      const plans: readonly Record<FieldSet>[] = await subscriptionTable
        .select({
          filterByFormula: `{Plan Name (from Plan)} = '${planName}'`,
        })
        .all();
      const records: Plans[] = formattedResponse([...plans]);
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSchoolMembers(schoolSlug?): Promise<PlanSubscriber[]> {
    try {
      const plans: readonly Record<FieldSet>[] = await subscriptionTable
        .select({
          filterByFormula: `{School Slug (from Plan)} = '${schoolSlug}'`,
        })
        .all();
      const records: PlanSubscriber[] = formattedResponse([...plans]);
      const arrayUniqueByKey = [
        ...new Map(
          records.map((item) => [item.usernameFromProfile?.[0], item]),
        ).values(),
      ];
      return arrayUniqueByKey;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createSchoolMembers(username, data): Promise<PlanSubscriber[]> {
    try {
      let user: any = await plansProfilesTable
        .select({ filterByFormula: `{Username} = '${username}'` })
        .all();
      user = formattedResponse(user);
      const subscriber: Records<FieldSet> = await subscriptionTable.create({
        ...data,
        Profile: [user?.[0]?.id],
      });
      const records: PlanSubscriber[] = formattedResponse([...[subscriber]]);
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSchoolWithSlug(slug): Promise<[]> {
    try {
      const schoolSlugFromPlan = await allSchoolPlansTable
        .select({
          filterByFormula: `{Slug} = "${slug}"`,
        })
        .all();
      const records = formattedResponse([...schoolSlugFromPlan]);
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getPaymentHistory(
    username: string,
    schoolSlug: string,
  ): Promise<Plans[]> {
    try {
      const plans: readonly Record<FieldSet>[] = await subscriptionTable
        .select({
          filterByFormula: `AND({Username (from Profile)} = '${username}' , {School Slug (from Plan)} = '${schoolSlug}')`,
        })
        .all();
      const records: Plans[] = formattedResponse([...plans]);
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new PlansServices();
