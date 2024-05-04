const { Router } = require("express");
const { check } = require("express-validator");
const { validateJwt } = require("../middlewares/jwt-validator");
const { isDate } = require("../helpers/isDate");

const {
  validateField,
  validateFields,
} = require("../middlewares/field-validator");

const {
  createEvent,
  deleteEvent,
  getEvents,
  getEvent,
  updateEvent,
} = require("../controllers/events");

const router = Router();
//All routes beyond only can be accessed with a valid token
router.use(validateJwt);

router.get("/", getEvents);
router.get("/:id", getEvent);
router.post(
  "/",
  [
    check("title", "Title is mandatory").not().isEmpty(),
    check("start", "Start date is mandatory").custom( isDate),
    check("end", "End date is mandatory").custom( isDate),
    validateFields,
  ],
  createEvent
);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
