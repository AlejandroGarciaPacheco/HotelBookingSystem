package dev.Alejandro.lakeSideHotel.service;

import dev.Alejandro.lakeSideHotel.model.Role;
import dev.Alejandro.lakeSideHotel.model.User;

import java.util.List;

public interface IRoleService {
    List<Role> getRoles();
    Role createRole(Role theRole);
    void deleteRole(Long id);
    Role findRoleByName(String name);
    User removeUserFromRole(Long userId, Long roleId);
    User assignRoleToUser (Long userId, Long roleId);
    Role removeAllUsersFromRole(Long roleId);
}
