import { User } from "../models";
import { hashPassword } from "../utils";

export const fetchAllInvestigators = async () => {
  try {
    const investigators = await User.find({ role: "investigator" });
    return investigators;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createInvestigator = async (investigator) => {
  try {
    let newInvestigator = new User({
      name: investigator?.name,
      email: investigator?.email,
      password: await hashPassword(investigator?.password), //hashing password before saving in db.
      role: investigator?.role,
      CNIC: investigator?.CNIC,
      availability: true,
    });
    await newInvestigator.save();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchInvestigatorId = async (id, options = {}) => {
  try {
    const investigator =
      (await User.findOne({ role: "investigator", _id: id }, options)) || null;
    return investigator;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteInvestigator = async (id) => {
  try {
    const investigator = await fetchInvestigatorId(id, { _id: id });
    if (investigator) {
      await User.findByIdAndDelete(investigator);
      return true;
    }
    return false;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateInvestigatorAvailability = async (id, isAvailable) => {
  try {
    await User.findOneAndUpdate(id, { availability: isAvailable });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateInvestigator = async (id, body) => {
  try {
    return await User.findByIdAndUpdate(id, body, { new: true });
  } catch (error) {
    return Promise.reject(error);
  }
};
