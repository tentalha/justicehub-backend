import { Criminal } from "../models";

export const fetchAllCriminals = async () => {
  try {
    const criminals = await Criminal.find();
    return criminals;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createCriminal = async (criminal) => {
  try {
    let newCriminal = new Criminal({
      name: criminal?.name,
      age: criminal?.age,
      CNIC: criminal?.CNIC,
      image: criminal?.image,
    });
    await newCriminal.save();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCriminalId = async (id, options = {}) => {
  try {
    const criminal = (await Criminal.findOne({ _id: id }, options)) || null;
    return criminal;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteCriminal = async (id) => {
  try {
    const criminal = await fetchCriminalId(id, { _id: id });
    if (criminal) {
      await Criminal.findByIdAndDelete(criminal);
      return criminal;
    }
    return false;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCriminalByCNIC = async (CNIC) => {
  try {
    return await Criminal.findOne({ CNIC });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const patchCriminal = async (id, body) => {};
