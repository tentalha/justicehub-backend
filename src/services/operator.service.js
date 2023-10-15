import { hashPassword } from "../utils";
import { User } from "../models";

export const fetchAllOperators = async () => {
  try {
    const operators = await User.find({ role: "operator" });
    return operators;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createOperator = async (operator) => {
  try {
    let newOperator = new User({
      name: operator?.name,
      email: operator?.email,
      password: await hashPassword(operator?.password), //hashing password before saving in db.
      role: operator?.role,
      CNIC: operator?.CNIC,
    });
    await newOperator.save();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchOperatorId = async (id, options = {}) => {
  try {
    const operator =
      (await User.findOne({ role: "operator", _id: id }, options)) || null;
    return operator;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteOperator = async (id) => {
  try {
    const operator = await fetchOperatorId(id, { _id: id });
    if (operator) {
      await User.findByIdAndDelete(operator);
      return true;
    }
    return false;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateOperator = async (id, body) => {
  try {
    return await User.findByIdAndUpdate(id, body, { new: true });
  } catch (error) {
    return Promise.reject(error);
  }
};
