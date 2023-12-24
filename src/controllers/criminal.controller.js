import { R2XX, R4XX } from "../API";
import {
  createCriminal as createCriminalS,
  getCriminalByCNIC,
  fetchAllCriminals as fetchAllCriminalsS,
  deleteCriminal as deleteCriminalS,
  fetchCriminalId,
  patchCriminal,
  checkStatus,
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
      image: {
        url: upload?.secure_url,
        public_id: upload?.public_id,
      },
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
    let criminals = await fetchAllCriminalsS();
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
    const criminal = await fetchCriminalId(id);

    if (!criminal) {
      return R4XX(res, 404, "NOT-FOUND", `Criminal with id /${id}/ not found`);
    }
    await deleteCriminalS(id);

    await cloudinary.destroy(criminal?.image?.public_id);

    R2XX(res, 200, "SUCCESS", "Criminal Deleted", { criminal });
  } catch (error) {
    next(error);
  }
};

export const updateCriminalId = async (req, res, next) => {
  try {
    let upload;
    let id = req.params.id;
    const criminal = await fetchCriminalId(id);

    if (!criminal) {
      return R4XX(res, 404, "NOT-FOUND", `Criminal with id /${id}/ not found`);
    }

    if (req.file) {
      await cloudinary.destroy(criminal?.image?.public_id);
      upload = await cloudinary.upload(req.file.path);
    }

    let payload = {
      name: req?.body?.name,
      age: req?.body?.age,
      CNIC: req?.body?.CNIC,
      image: {
        url: upload?.secure_url || criminal.image.url,
        public_id: upload?.public_id || criminal.image.public_id,
      },
    };

    let updatedCriminal = await patchCriminal(id, payload);

    R2XX(res, 200, "SUCCESS", `Criminal with id ${id} updated`, {
      criminal: updatedCriminal,
    });
  } catch (error) {
    next(error);
  }
};

export const checkCriminalStatus = async (req, res, next) => {
  try {
    const citizenCNIC = req.query.CNIC;
    const status = await checkStatus(citizenCNIC);

    if (status) {
      R2XX(
        res,
        200,
        "SUCCESS",
        `Citizen with CNIC ${citizenCNIC} is criminal.`
      );
    } else {
      R2XX(
        res,
        404,
        "NOT-FOUND",
        `Citizen with CNIC ${citizenCNIC} is not a criminal.`
      );
    }
  } catch (error) {
    next(error);
  }
};
