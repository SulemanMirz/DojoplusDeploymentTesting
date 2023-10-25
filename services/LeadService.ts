/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable class-methods-use-this */
import { LeadFormFields } from '../src/shared/models/Lead.model';
import { TABLES, getTableInstance } from './Airtable';
import PostmarkService from './PostmarkService';

const table = getTableInstance(TABLES.LEADS);
const allSchoolsTable = getTableInstance(TABLES.ALL_SCHOOLS);
const plansTable = getTableInstance(TABLES.PLANS);
const timetableTable = getTableInstance(TABLES.TIMETABLE);

interface Data extends LeadFormFields {
  templateModel: {
    url: string;
    user_name: string;
    school_name: string;
    school_location: string;
    createAt: string;
    fullname: string;
    email: string;
    phone: string;
    description: string;
    schoolEmail: string;
  };
}
class LeadService {
  /**
   * @description - Create new leads.
   * @param data - Lead form fields.
   * @returns - Return newly created lead.
   */

  async createLead(data: Data) {
    const { templateModel, ...rest } = data;
    try {
      const record = await table.create({
        ...rest,
      });
      PostmarkService.sendPreSignEmail(templateModel, rest.Email);
      PostmarkService.sendFreeTrialToSchool(
        templateModel,
        templateModel.schoolEmail,
      );
      return record;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSchool(schoolName: string) {
    try {
      const requests = [];
      let schoolRecord = [];
      let timetableRecords = [];
      requests.push(
        allSchoolsTable
          .select({
            filterByFormula: `{Slug} = '${schoolName}'`,
          })
          .all(),
      );
      requests.push(
        timetableTable
          .select({
            filterByFormula: `{Slug Lookup} = '${schoolName}'`,
          })
          .all(),
      );
      await Promise.all(requests).then((res) => {
        schoolRecord = [...res[0]];
        timetableRecords = [...res[1]];
      });
      const plans =
        schoolRecord[0] &&
        (await plansTable
          .select({
            filterByFormula: `FIND("${schoolRecord[0].fields['School Name']}", ARRAYJOIN({School Name (from School)}))`,
          })
          .all());
      return {
        ...schoolRecord[0],
        scheduleSchool: timetableRecords,
        plans: plans || [],
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new LeadService();
