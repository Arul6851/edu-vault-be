import prisma from "../middlewares/prisma.js";

const PostQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }
    const newQuestion = await prisma.questions.create({
      data: {
        question,
      },
    });
    if (!newQuestion) {
      return res.status(501).json({ message: "Question not created" });
    }
    res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetQuestions = async (req, res) => {
  try {
    const questions = await prisma.questions.findMany();
    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }
    res.json(questions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const GetQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await prisma.questions.findUnique({
      where: { id: parseInt(id) },
    });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json({ message: "Question Found", question });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { PostQuestion, GetQuestions, GetQuestionById };
