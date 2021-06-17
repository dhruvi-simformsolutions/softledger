import api from "./api";

export const all = (details) => api.get("journals", details);

export const create = (details) => api.post("journals", details);

export const approve = (details) => api.post("approve", details);

export const deleteJournal = (details) => api.post("delete-journal", details);
