import http from "./http";
import { MOCK_CURRENT_TEAM_ID } from "../constants";

export const taskApi = {
  getAllTaskInTeam: async () => {
    const response = await http.get(`/teams/${MOCK_CURRENT_TEAM_ID}/tasks`);
    return response.data;
  },

  getAssigneesByTaskId: async (taskId = null) => {
    const response = await http.get(`/tasks/${taskId}/assignees`);
    return response.data;
  },
};