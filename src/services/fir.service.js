import { getUserById } from "../services";
import { FIR, User, Evidence } from "../models";

export const createNewFIR = async (fir) => {
  try {
    let newFir = new FIR({
      complainantName: fir?.complainantName,
      complainantCNIC: fir?.complainantCNIC,
      complainantPhone: fir?.complainantPhone,
      complainantId: fir?.complainantId,
      applicationType: fir?.applicationType,
      details: fir?.details,
      location: fir?.location,
      datetime: fir?.datetime,
      suspects: fir?.suspects,
      operatorId: fir?.operatorId,
      relevantDocs: fir?.relevantDocs,
      caseNo: fir?.caseNo,
    });
    await newFir.save();
    return newFir;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCaseByCaseNo = async (caseNo) => {
  try {
    const fir = await FIR.findOne({ caseNo });
    return fir;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCaseById = async (id) => {
  try {
    const fir = await FIR.findOne({ _id: id });
    return fir;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCaseByOperatorId = async (operatorId) => {
  try {
    const fir = await FIR.find({ operatorId });
    return fir;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCaseByInvestigatorId = async (investigatorId) => {
  try {
    const fir = await FIR.find({ investigatorId });
    return fir;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCaseByInvestigatorId_pop = async (investigatorId) => {
  try {
    const fir = await FIR.find({ investigatorId }).populate("complainantId");
    return fir;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCasesOfCitizen = async (citizenId) => {
  try {
    const user = await getUserById(citizenId);
    return await FIR.find({ complainantCNIC: user.CNIC });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCasesOfCitizen_pop = async (citizenId) => {
  try {
    const user = await getUserById(citizenId);
    return await FIR.find({ complainantCNIC: user.CNIC }).populate(
      "investigatorId"
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchAllFIRs = async () => {
  try {
    const allFirs = await FIR.find();
    return allFirs;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchActive = async () => {
  try {
    const activeFirs = await FIR.find({ status: "active" });
    return activeFirs;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchPending = async () => {
  try {
    const pendingFirs = await FIR.find({ status: "pending" });
    return pendingFirs;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchClosed = async () => {
  try {
    const closedFirs = await FIR.find({ status: "closed" });
    return closedFirs;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCompleted = async () => {
  try {
    const completedFirs = await FIR.find({ status: "completed" });
    return completedFirs;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCounts = async () => {
  try {
    const firs = await FIR.aggregate([
      { $match: { status: "completed" } },
      {
        $project: {
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$year",
          completedCount: { $sum: 1 },
        },
      },
      {
        $project: {
          year: "$_id",
          completedCount: 1,
          _id: 0,
        },
      },
      { $sort: { year: 1 } },
    ]);
    return firs;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const approveFIRandAssignment = async (caseId, investigatorId) => {
  try {
    return await FIR.findOneAndUpdate(
      { _id: caseId },
      { investigatorId, status: "active" },
      { new: true }
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteFIRId = async (id) => {
  try {
    await FIR.findByIdAndDelete(id);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadEvidenceOfFIR = async (evidence) => {
  try {
    let newEvidence = new Evidence({
      url: evidence?.url,
      public_id: evidence?.public_id,
      caseId: evidence?.caseId,
      fileType: evidence?.fileType,
    });
    await newEvidence.save();
    return newEvidence;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchEvidencesWithFIRId = async (firId) => {
  try {
    return await Evidence.find({ caseId: firId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteEvidenceWithId = async (evdId) => {
  try {
    return await Evidence.findByIdAndDelete(evdId);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findEvidenceById = async (id) => {
  try {
    const evidence = await Evidence.findOne({ _id: id });
    return evidence;
  } catch (error) {
    return Promise.reject(error);
  }
};
