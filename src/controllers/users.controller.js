import { R2XX } from "../API";
import {
  fetchCaseByInvestigatorId_pop,
  fetchCasesOfCitizen_pop,
} from "../services";

export const getContactsOfUser = async (req, res, next) => {
  try {
    //Get FIRS assigned to investigator/citizen
    let role = req?.role;
    let userId = req?.user;
    let contacts = [];

    switch (role) {
      case "investigator":
        const cases = await fetchCaseByInvestigatorId_pop(userId);
        contacts = cases
          .filter((i) => i?.complainantId)
          .map((i) => ({
            _id: i.complainantId._id,
            name: i.complainantId.name,
            email: i.complainantId.email,
            role: i.complainantId.role,
            CNIC: i.complainantId.CNIC,
          }));
        break;
      default:
        const _cases = await fetchCasesOfCitizen_pop(userId);
        contacts = _cases
          .filter((i) => i?.investigatorId)
          .map((i) => ({
            _id: i.investigatorId._id,
            name: i.investigatorId.name,
            email: i.investigatorId.email,
            role: i.investigatorId.role,
            CNIC: i.investigatorId.CNIC,
          }));
    }

    R2XX(res, 200, "SUCCESS", "Contacts list in payload.", {
      contacts,
    });
  } catch (error) {
    next(error);
  }
};
