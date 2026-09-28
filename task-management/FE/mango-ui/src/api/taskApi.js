import { MOCK_CURRENT_TEAM_ID } from "../constants";
const BASE_URL = "http://localhost:8081/api/v1";
export const taskApi = {
  
  getAllTaskInTeam: async () => {
    
    const response = await fetch(`${BASE_URL}/teams/${MOCK_CURRENT_TEAM_ID}/tasks`);
    
    if (!response.ok) {
      throw new Error("Không thể tải danh sách công việc");
    }
    return response.json();
  },

  getAssigneesByTaskId: async(taskId = null) => {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}/assignees`)
    if (!response.ok) {
      throw new Error("Không thể tải danh sách người thực hiện");
    }
    return response.json();
  }
};