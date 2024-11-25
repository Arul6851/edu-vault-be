import prisma from "../middlewares/prisma.js";

const GetAllSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subjects.findMany();
    if (!subjects) return res.status(404).json({ error: "Subjects not Found" });
    res.status(200).json({ message: "Subjects Found", subjects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default GetAllSubjects;
