import { MOCK_CURRENT_USER_ID, MOCK_CURRENT_WORKSPACE_ID } from "../constants";
import { MOCK_CURRENT_TEAM_ID } from "../constants";
const BASE_URL = "http://localhost:8081/api/v1";
export const teamMemberApi = {
  getUserandRole: async () => {
      
      const response = await fetch(`${BASE_URL}/workspaces/${MOCK_CURRENT_WORKSPACE_ID}/teams/${MOCK_CURRENT_TEAM_ID}/members/${MOCK_CURRENT_USER_ID}`);
      
      if (!response.ok) {
        throw new Error("Không thể tải thông tin người dùng");
      }
      return response.json();
    },
  
};