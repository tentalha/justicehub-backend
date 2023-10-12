//Response Sanitizers

export const sanitizeUser = (user) => {
  return {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
    availability: user?.availability,
    CNIC: user?.CNIC,
    createdAt: new Date(user?.createdAt)?.toLocaleDateString(), //Converting date-time to readable format.
  };
};

export const sanitizeUsers = (users) => {
  return users.map((user) => sanitizeUser(user));
};

export const sanitizeFir = (fir) => {
  return {
    _id: fir?._id,
    caseNo: fir?.caseNo,
    details: fir?.caseNo,
    datetime: new Date(fir?.datetime).toLocaleDateString(),
    location: fir?.location,
    status: fir?.status,
    applicationType: fir?.applicationType,
    complainantName: fir?.complainantName,
    complainantCNIC: fir?.complainantCNIC,
    complainantPhone: fir?.complainantPhone,
    investigatorId: fir?.investigatorId,
    relevantDocs: fir?.relevantDocs,
  };
};

export const sanitizeFirs = (firs) => {
  return firs.map((fir) => sanitizeFir(fir));
};

export const sanitizeCriminal = (criminal) => {
  console.log(criminal);
  return {
    ...criminal,
    image: criminal?.image?.url,
  };
};

export const sanitizeCriminals = (criminals) => {
  return criminals.map((crim) => sanitizeCriminal(crim));
};
