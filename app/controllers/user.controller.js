export function allAccess(req, res) {
  res.status(200).send("Public Content.");
}

export function userBoard(req, res) {
  res.status(200).send("User Content.");
}

export function adminBoard(req, res) {
  res.status(200).send("Admin Content.");
}

export function HrManagerBoard(req, res) {
  console.log("ok mnager")
  res.status(200).send("HrManager Content.");
}
