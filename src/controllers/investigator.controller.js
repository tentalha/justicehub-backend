import { USER_ALREADY_EXIST } from "../constants";
import {
  fetchAllInvestigators,
  getUserByEmail,
  getUserByCNIC,
  createInvestigator,
  fetchInvestigatorId,
  deleteInvestigator,
} from "../services";
import { R2XX, R4XX } from "../API";
import { sanitizeUser, sanitizeUsers } from "../utils";

export const getAllInvestigators = async (req, res, next) => {
  try {
    const investigators = await fetchAllInvestigators();
    R2XX(res, 200, "SUCCESS", "Investigators list in payload", {
      investigators: sanitizeUsers(investigators),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const postInvestigator = async (req, res, next) => {
  try {
    const { email, CNIC } = req.body;
    // -------------------------------------------------------------------------->>
    const user = await getUserByEmail(email);
    if (user) {
      return R4XX(
        res,
        409,
        USER_ALREADY_EXIST.type,
        USER_ALREADY_EXIST.message
      );
    }
    // -------------------------------------------------------------------------->>
    const _user = await getUserByCNIC(CNIC);
    if (_user) {
      return R4XX(
        res,
        409,
        USER_ALREADY_EXIST.type,
        "Resource with this CNIC already exist."
      );
    }
    // -------------------------------------------------------------------------->>
    await createInvestigator(req.body);
    R2XX(
      res,
      201,
      "SUCCESS",
      "Investigator created successfully",
      sanitizeUser(req.body)
    );
  } catch (error) {
    next(error);
  }
};

export const getInvestigatorId = async (req, res, next) => {
  try {
    let id = req.params.id;
    const investigator = await fetchInvestigatorId(id);
    if (!investigator) {
      return R4XX(
        res,
        404,
        "NOT-FOUND",
        `Investigator with id /${id}/ not found`
      );
    }
    R2XX(res, 200, "SUCCESS", "Investigator found", sanitizeUser(investigator));
  } catch (error) {
    next(error);
  }
};

export const deleteInvestigatorId = async (req, res, next) => {
  try {
    let id = req.params.id;
    const investigatorToDelete = await fetchInvestigatorId(id);
    const investigator = await deleteInvestigator(id);
    if (!investigator) {
      return R4XX(
        res,
        404,
        "NOT-FOUND",
        `Investigator with id /${id}/ not found`
      );
    }
    R2XX(res, 200, "SUCCESS", "Investigator Deleted", {
      investigator: sanitizeUser(investigatorToDelete),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
