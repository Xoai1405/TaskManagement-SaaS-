package com.hagiabao.task_management.dto.response;
import com.hagiabao.task_management.entity.Status;

public record WorkspaceMemberResponse(
          Long userId,
     Long workspaceId,
     Status status
) {
   
}
