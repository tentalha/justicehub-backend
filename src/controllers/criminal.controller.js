import { R2XX, R4XX } from "../API";
import {
  createCriminal as createCriminalS,
  getCriminalByCNIC,
  fetchAllCriminals as fetchAllCriminalsS,
  deleteCriminal as deleteCriminalS,
} from "../services";
import { USER_ALREADY_EXIST } from "../constants";
import cloudinary from "../configs/cloudinaryConfig";

export const createCriminal = async (req, res, next) => {
  try {
    if (!req.file) {
      return R4XX(res, 403, "IMAGE-REQUIRED", "Image is required");
    }

    const _criminal = await getCriminalByCNIC(req.body.CNIC);

    if (_criminal) {
      return R4XX(
        res,
        409,
        USER_ALREADY_EXIST.type,
        `Criminal with CNIC ${req.body.CNIC} already exists`
      );
    }
    const upload = await cloudinary.upload(req.file.path);
    let payload = {
      name: req.body.name,
      age: req.body.age,
      CNIC: req.body.CNIC,
      image: upload?.secure_url,
    };
    await createCriminalS(payload);
    R2XX(res, 201, "SUCCESS", "Criminal created successfully", {
      criminal: payload,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCriminals = async (req, res, next) => {
  try {
    const criminals = await fetchAllCriminalsS();
    R2XX(res, 200, "SUCCESS", "Criminals list in payload", {
      criminals,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCriminalId = async (req, res, next) => {
  try {
    let id = req.params.id;
    const criminal = await deleteCriminalS(id);
    if (!criminal) {
      return R4XX(res, 404, "NOT-FOUND", `Criminal with id /${id}/ not found`);
    }
    R2XX(res, 200, "SUCCESS", "Criminal Deleted");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
