const questionModel = require("../model/questionModel");
const { exec } = require("child_process");
const path = require('path');
const fs = require("fs");
const userModel = require("../model/userModel");
const { v4: uuid } = require("uuid");
const CodeSubmission = require("../model/submitModel");
const opPath = path.join(__dirname, "../outputs");
const drCode = path.join(__dirname, "../codes");
const drInput = path.join(__dirname, "../inputs");

if (!fs.existsSync(opPath)) {
  fs.mkdirSync(opPath, { recursive: true });
}

if (!fs.existsSync(drCode)) {
  fs.mkdirSync(drCode, { recursive: true });
}

if (!fs.existsSync(drInput)) {
  fs.mkdirSync(drInput, { recursive: true });
}

const generateFile = async (format, content) => {
  const Id = uuid();
  const filename = format == "java" ? "Main.java" : `${Id}.${format}`;
  const filepath = path.join(drCode, filename);
  await fs.writeFileSync(filepath, content);
  return filepath;
};

const generateInput = async (input) => {
  const Id = uuid();
  const filename = `${Id}.txt`;
  const filepath = path.join(drInput, filename);
  await fs.writeFileSync(filepath, input);
  return filepath;
};

const executeCode = (filepath, language, inputPath) => {
  const Id = path.basename(filepath).split(".")[0];

  let executeCmd;

  switch (language) {
    case "java":
      executeCmd = `javac -d /app/outputs /app/codes/${Id}.java  && java -cp /app/outputs ${Id} < /app/inputs/${path.basename(inputPath).split(".")[0]}.txt`;
      break;
    case "py":
      executeCmd = `python -u /app/codes/${Id}.py < /app/inputs/${path.basename(inputPath).split(".")[0]}.txt`;
      break;
    case "cpp":
      executeCmd = `g++ /app/codes/${Id}.cpp -o /app/outputs/${Id}.exe && /app/outputs/${Id}.exe < /app/inputs/${path.basename(inputPath).split(".")[0]}.txt`;
      break;
    default:
      return Promise.reject(`Unsupported language: ${language}`);
  }

  return new Promise((resolve, reject) => {
    exec(executeCmd, (error, stdout, stderr) => {
      error && reject({ error, stderr });
      stderr && reject(stderr);
      resolve(stdout);
    });
  });
};

const submitquestion = async (req, res) => {
  const { code, userId, id, language, submittedAt } = req.body;
  console.log(code, userId, id, language, submittedAt);
  if (code === undefined) {
    return res.json({ success: false, message: "Code not found" });
  }

  let submission, submissionStatus, errorInfo;

  try {
    const question = await questionModel.findById(id);
    if (!question) {
      console.log(`Question with ID ${id} not found`);
      return res.json({ message: "Question not found" });
    }

    console.log("Question:", question);

    const testCases = question.testCases || [];

    console.log("Test Cases:", testCases);

    if (!testCases || testCases.length === 0) {
      console.log("Test cases not found or empty");
      return res.json({ message: "Test cases not found or empty" });
    }

    const user = await userModel.findById(userId);

    const filepath = await generateFile(language, code);

    submission = await CodeSubmission.create({
      code,
      user: user.username,
      question: question.title,
      language,
      submittedAt,
      status: "Pending",
    });

    const scoringSystem = {
      easy: 10,
      medium: 20,
      difficult: 30,
    };

    const defaultScore = 10;

    const userScore = scoringSystem[question.difficulty] || defaultScore;

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const inputPath = await generateInput(testCase.input);

      const executionStartTime = performance.now();

      const rawOutput = await executeCode(filepath, language, inputPath);

      const executionEndTime = performance.now();
      const executionTime = executionEndTime - executionStartTime;

      const output = rawOutput.replace(/\r\n/g, "\n").trim();

      if (output !== testCase.output) {
        submissionStatus = `Test cases ${i + 1} failed`;
        return res.json({
          message: `Test cases ${i + 1} failed`,
        });
      }

      if (executionTime > testCase.timeTaken) {
        submissionStatus = `Time limit exceeded for the test case ${i + 1}`;
        return res.json({
          message: `Time limit exceeded for the test case ${i + 1}`,
        });
      }
    }

    submissionStatus = "Code Accepted";
    submission.status = submissionStatus;
    await submission.save();

    if (!user.solvedquestions.includes(id)) {
      user.solvedquestions.push(id);
      user.score += userScore || defaultScore;
      await user.save();
    }
    return res.json({ message: "Code Accepted" });
  } catch (error) {
    errorInfo = {
      message: error.message || "Compilation error",
      stack: error.stack || "",
    };
    if (submission) {
      submission.status = `Error: ${errorInfo.message}`;
      await submission.save();
      return res.json({ message: errorInfo.message });
    }
    console.log(error);
    return res.json({ message: errorInfo.message, error });
  }
};

module.exports = { submitquestion };

