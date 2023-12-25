import { R2XX, R4XX } from "../API";
import {
  createNewFIR,
  fetchActive,
  fetchAllFIRs,
  fetchCaseByCaseNo,
  fetchCaseById,
  fetchCaseByOperatorId,
  fetchClosed,
  fetchCompleted,
  fetchCounts,
  fetchInvestigatorId,
  fetchPending,
  getUserByCNIC,
  updateInvestigatorAvailability,
  approveFIRandAssignment,
  deleteFIRId,
  fetchCaseByInvestigatorId,
  fetchCasesOfCitizen,
  uploadEvidenceOfFIR,
  fetchEvidencesWithFIRId,
  deleteEvidenceWithId,
  findEvidenceById,
} from "../services";
import cloudinary from "../configs/cloudinaryConfig";
import { sanitizeFir, sanitizeFirs } from "../utils";
import path from "path";

export const createFir = async (req, res, next) => {
  try {
    let upload;
    let { caseNo } = req.body;

    if (await fetchCaseByCaseNo(caseNo)) {
      return R4XX(res, 409, "CASE-ALREADY-EXISTS", `${caseNo} already exists`);
    }

    if (req.file) {
      //Save file if exists.
      upload = await cloudinary.upload(req.file.path, {
        folder: "files",
        resource_type: "auto",
      });
    }

    let complainantId = await getUserByCNIC(req.body?.complainantCNIC);

    let payload = {
      complainantName: req.body?.complainantName,
      complainantCNIC: req.body?.complainantCNIC,
      complainantId: complainantId?._id || undefined,
      complainantPhone: req.body?.complainantPhone,
      datetime: req.body?.datetime,
      applicationType: req.body?.applicationType,
      details: req.body?.details,
      location: req.body?.location,
      suspects: req.body?.suspects,
      relevantDocs: {
        url: upload?.secure_url,
        public_id: upload?.public_id,
      },
      operatorId: req?.user,
      caseNo: req.body.caseNo,
    };

    let fir = await createNewFIR(payload);

    R2XX(res, 201, "SUCCESS", "FIR created successfully", {
      fir: sanitizeFir(fir),
    });
  } catch (error) {
    next(error);
  }
};

export const getAllFIRs = async (req, res, next) => {
  try {
    let firs = [];
    switch (req.role) {
      case "admin":
        firs = await fetchAllFIRs();
        break;
      case "operator":
        firs = await fetchCaseByOperatorId(req.user);
        break;
      case "citizen":
        firs = await fetchCasesOfCitizen(req.user);
        break;
      default:
        firs = await fetchCaseByInvestigatorId(req.user);
    }
    R2XX(res, 200, "SUCCESS", "FIRs list in payload", {
      firs: sanitizeFirs(firs),
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveFIRs = async (req, res, next) => {
  try {
    let firs = await fetchActive();
    R2XX(res, 200, "SUCCESS", "Active FIRs list in payload", {
      firs: sanitizeFirs(firs),
    });
  } catch (error) {
    next(error);
  }
};

export const getPendingFIRs = async (req, res, next) => {
  try {
    let firs = await fetchPending();
    R2XX(res, 200, "SUCCESS", "Pending FIRs list in payload", {
      firs: sanitizeFirs(firs),
    });
  } catch (error) {
    next(error);
  }
};

export const getCompletedFIRs = async (req, res, next) => {
  try {
    let firs = await fetchCompleted();
    R2XX(res, 200, "SUCCESS", "Completed FIRs list in payload", {
      firs: sanitizeFirs(firs),
    });
  } catch (error) {
    next(error);
  }
};

export const getClosedFIRs = async (req, res, next) => {
  try {
    let firs = await fetchClosed();
    R2XX(res, 200, "SUCCESS", "Closed FIRs list in payload", {
      firs: sanitizeFirs(firs),
    });
  } catch (error) {
    next(error);
  }
};

export const getFIRCounts = async (req, res, next) => {
  try {
    let counts = await fetchCounts();
    R2XX(res, 200, "SUCCESS", "Counts of FIRs in payload", {
      counts,
    });
  } catch (error) {
    next(error);
  }
};

export const approveFIRandAssignInvestigator = async (req, res, next) => {
  try {
    const fir = await fetchCaseById(req.params.caseId);

    if (!fir) {
      return R4XX(
        res,
        404,
        "NOT-FOUND",
        `Case with id ${req.params.caseId} not found.`
      );
    }

    const investigator = await fetchInvestigatorId(req?.body?.investigatorId);

    if (!investigator) {
      return R4XX(
        res,
        404,
        "NOT-FOUND",
        `Investigator with id ${req.body.investigatorId} not found.`
      );
    }

    if (!investigator?.availability) {
      return R4XX(
        res,
        400,
        "RESOURCE-ALREADY-OCCUPIED",
        `Investigator with CNIC ${investigator?.CNIC} is already occupied.`
      );
    }

    await Promise.all([
      approveFIRandAssignment(req.params.caseId, req.body.investigatorId),
      updateInvestigatorAvailability(investigator._id, false), //Setting the availability of INVESTIGATOR to false.
    ]);

    return R2XX(
      res,
      200,
      "SUCCESS",
      `Investigator with CNIC ${investigator?.CNIC} is assigned to Case #${fir?.caseNo}`
    );
  } catch (error) {
    next(error);
  }
};

export const deleteFIR = async (req, res, next) => {
  try {
    let fir = await fetchCaseById(req.params.caseId);
    if (!fir) {
      return R4XX(
        res,
        404,
        "NOT-FOUND",
        `Case with id ${req.params.caseId} not found.`
      );
    }

    if (fir?.relevantDocs["public_id"]) {
      await cloudinary.destroy(fir?.relevantDocs?.public_id, {
        resource_type: "raw",
      });
    }

    await deleteFIRId(fir?._id);
    R2XX(res, 200, "SUCCESS", `Case ${fir?._id} deleted successfully.`, {
      fir,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFIRStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const fir = await fetchCaseById(id);

    if (!fir) {
      return R4XX(res, 404, "NOT-FOUND", `Case ${id} not found.`);
    }

    fir.status = status;

    await Promise.all([
      fir.save(),
      updateInvestigatorAvailability(fir?.investigatorId, true),
    ]);

    R2XX(res, 200, "SUCCESS", `Case ${id}'s status updated.`, {
      fir: sanitizeFir(fir),
    });
  } catch (error) {
    next(error);
  }
};

export const postEvidenceFIRId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fir = await fetchCaseById(id);
    //Checking if FIR exist in system
    if (!fir) {
      return R4XX(res, 404, "NOT-FOUND", `Case with id ${id} not found.`);
    }
    //Checking if the evidences are not in array format
    const files = req.files;
    console.log(req);
    if (!Array.isArray(files) || !files.length) {
      return R4XX(
        res,
        403,
        "VALIDATION-ERROR",
        "Evidences must be in the form of an array."
      );
    }
    //Upload evidence on Cloudinary
    let cloudinaryResponses = [];

    for (const item of files) {
      const upload = await cloudinary.upload(item.path, {
        resource_type: "auto",
      });
      const extname = path.extname(item.originalname).split(".")[1];

      cloudinaryResponses.push({
        url: upload.secure_url,
        public_id: upload.public_id,
        caseId: req.params.id,
        fileType: extname,
      });
    }
    //Save the references in Database
    let dbReferences = [];
    for (const obj of cloudinaryResponses) {
      const newEvidence = await uploadEvidenceOfFIR(obj);
      dbReferences.push(newEvidence);
    }
    //Sending response to user
    R2XX(res, 200, "SUCCESS", "Evidences Uploaded successfully.", {
      data: dbReferences,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getEvidenceFIRId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!(await fetchCaseById(id))) {
      return R4XX(
        res,
        404,
        "NOT-FOUND",
        `Case with id ${id} not found in system`
      );
    }

    const evidences = await fetchEvidencesWithFIRId(id);
    R2XX(res, 200, "SUCCESS", "Evidences attached in payload.", { evidences });
  } catch (error) {
    next(error);
  }
};

export const deleteEvidenceFIRId = async (req, res, next) => {
  try {
    const { id } = req.params;
    //Finding the Evidence
    const evidence = await findEvidenceById(id);
    // Deleting from Cloundinary
    await cloudinary.destroy(evidence?.public_id);
    //Deleting reference form db
    const deletedFIR = await deleteEvidenceWithId(id);
    //Sending response
    R2XX(res, 200, "SUCCESS", "Evidence deleted successfully", {
      deletedFIR: deletedFIR._id,
    });
  } catch (error) {
    next(error);
  }
};
