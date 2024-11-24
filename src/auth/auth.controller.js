import prisma from "../middlewares/prisma.js";
import * as crypto from "crypto";
import CryptoJS from "crypto-js";

class AuthController {
  Login = async (req, res) => {
    try {
      const { rollno, pass } = req.body;
      const hashPassword = crypto
        .createHash("sha512")
        .update(pass)
        .digest("hex");
      const student = await prisma.student.findUnique({
        where: {
          rollno,
        },
      });
      if (student) {
        if (student.pass === hashPassword) {
          const auth_token = crypto
            .createHash("sha512")
            .update(crypto.randomBytes(32).toString("hex"))
            .digest("hex");
          return res.status(200).json({ message: "Login Successful", student });
        } else {
          return res.status(401).json({ message: "Invalid Credentials" });
        }
      } else {
        return res.status(401).json({ message: "User does not exists" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  Register = async (req, res) => {
    try {
      const { rollno, regno, name, year, dept, dob, pass } = req.body;
      const hashPassword = crypto
        .createHash("sha512")
        .update(pass)
        .digest("hex");
      const studentAvailable = await prisma.student.findUnique({
        where: {
          rollno,
        },
      });
      if (studentAvailable) {
        return res.status(400).json({ message: "Student Already Exists" });
      } else {
        const student = await prisma.student.create({
          data: {
            rollno,
            regno,
            name,
            year,
            dept,
            dob,
            pass: hashPassword,
          },
        });
        if (!student) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
      }
      return res.status(200).json({ message: "Student Created Successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

export default AuthController;
