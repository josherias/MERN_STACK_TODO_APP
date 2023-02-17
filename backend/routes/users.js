const express = require("express");
const bcrypt = require("bcrypt");
const { validateUser, validateUserOnEdit, User } = require("../models/user");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send(user);
});

const upload = multer({ dest: "uploads/" });
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  let uploadedFile;

  const { path, originalname } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  uploadedFile = newPath.replace("uploads/", "");

  res.status(200).send(uploadedFile);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  const { name, email, password } = req.body;

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: email });
  if (user) return res.status(400).send("User already exits, sign in");

  user = new User({ name: name, email: email, password: password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).status(201).send(user);
});

router.put("/", auth, async (req, res) => {
  const { error } = validateUserOnEdit(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, phone, photo } = req.body;

  let user = await User.findOne({ email: email });
  if (!user) return res.status(404).send("User was not found");

  const authorised = checkAuthorisedUser(user._id, req.user._id);
  if (!authorised)
    return res.status(403).send("Your not authorised to edit this resource");

  user.set({
    name: name,
    phone: phone,
    photo: photo,
  });

  user = await user.save();

  res.status(200).send(user);
});

function checkAuthorisedUser(owner, userInrequest) {
  return owner.toString() == userInrequest;
}

module.exports = router;
