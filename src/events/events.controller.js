import prisma from "../middlewares/prisma.js";

const CreateEvent = async (req, res) => {
  const { title, date, stud_id } = req.body;

  if (!title || !date || !stud_id) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  try {
    const newEvent = await prisma.events.create({
      data: {
        title,
        date,
        stud_id,
      },
    });

    if (!newEvent) {
      return res.status(500).json({ error: "Event not created" });
    }
    return res.status(201).json({ message: "Event created", newEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetAllEvents = async (req, res) => {
  try {
    const events = await prisma.events.findMany();
    if (!events) {
      return res.status(404).json({ error: "Events not found" });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { CreateEvent, GetAllEvents };
