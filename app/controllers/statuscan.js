import Status from '../models/statuscan.js';
import Candidate from '../models/candidate.js';


export async function  postStatusOnce  (req, res) {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
  
    try {
      let existingStatus = await Status.findOne({ name });
      if (existingStatus) {
        return res.status(409).json({ error: "Status already exists" });
      }
  
      const newStatus = new Status({ name });
      const savedStatus = await newStatus.save();
  
      res.status(201).json(savedStatus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export async function getStatus (req, res)  {
    const { statusId } = req.params;
  
    if (!statusId) {
      return res.status(400).json({ error: "Status ID is required" });
    }
  
    try {
      const cans = await Candidate.find({ status: statusId }).populate("status");
      res.status(200).json(cans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export async function updateCanStatus(req, res) {
    const { canId,statusId } = req.params;
    // const {  } = req.body;
  
    try {
      const candidate = await Candidate.findById(canId).populate("status");
  
      if (!candidate) {
        return res.status(404).json({ error: "Candidate not found" });
      }
  
      const newStatus = await Status.findById(statusId);
  
      if (!newStatus) {
        return res.status(404).json({ error: "Status not found" });
      }
  
      candidate.status = newStatus;
      await candidate.save();
  
      res.status(200).json(candidate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export async function updateCanStatusToAccepted(req, res) {
    const { canId } = req.params;
  
    try {
      // Récupérer l'ID du statut "closed" en utilisant son nom
      const statusClosed = await Status.findOne({ name: "accepted" });
      if (!statusClosed) {
        throw new Error("Status 'accepted' not found");
      }
  
      // Mettre à jour le job avec le statut "closed"
      const job = await Candidate.findByIdAndUpdate(
        canId,
        { $set: { status: statusClosed._id } },
        { new: true }
      );
  
      // Renvoyer la réponse avec le job mis à jour
      res.status(200).json(job);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update job status to 'closed'" });
    }
  }

  export async function getStatusIdByName(req, res) {
    const { name } = req.params;
  
    try {
      const status = await Status.findOne({ name });
  
      if (!status) {
        return res.status(404).json({ error: "Status not found" });
      }
  
      res.status(200).json({ statusId: status._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
//get status of th candidate._id

export async function getStatusofCan (req, res)  {
  const idCan = req.params.id;

  try {
    const candidate = await Candidate.findOne( idCan ).populate('status');
    console.log("ca n di date "+ candidate)
    if (!candidate) {
      return res.status(404).send(`No candidate found with id ${idCan}`);
    }
    const status = candidate.status.name;
    return res.json({ status });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
};