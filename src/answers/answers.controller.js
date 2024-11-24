import prisma from "../middlewares/prisma.js";

const PostAnswers = async (req, res) => {
  const { questionID, answer } = req.body;
  if (!questionID || !answer) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }
  try {
    const newAnswer = await prisma.answers.create({
      data: {
        qid: questionID,
        answer,
      },
    });
    if (!newAnswer) {
      return res.status(500).json({ error: "Answer not created" });
    }
    return res.status(201).json({ message: "Answer created", newAnswer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetAnswersByQuestionID = async (req, res) => {
  const { questionID } = req.params;
  if (!questionID) {
    return res.status(400).json({ error: "Please provide question ID" });
  }
  try {
    const answers = await prisma.answers.findMany({
      where: {
        qid: questionID,
      },
    });
    if (!answers) {
      return res.status(404).json({ error: "Answers not found" });
    }
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetAllAnswers = async (req, res) => {
  try {
    const answers = await prisma.answers.findMany();
    if (!answers) {
      return res.status(404).json({ error: "Answers not found" });
    }
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { PostAnswers, GetAnswersByQuestionID, GetAllAnswers };
