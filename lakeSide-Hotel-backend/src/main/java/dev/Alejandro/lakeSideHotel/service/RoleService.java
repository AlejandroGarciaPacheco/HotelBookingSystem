package dev.Alejandro.lakeSideHotel.service;

import dev.Alejandro.lakeSideHotel.exception.RoleAlreadyExistsException;
import dev.Alejandro.lakeSideHotel.exception.UserAlreadyExistsException;
import dev.Alejandro.lakeSideHotel.model.Role;
import dev.Alejandro.lakeSideHotel.model.User;
import dev.Alejandro.lakeSideHotel.repository.RoleRepository;
import dev.Alejandro.lakeSideHotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role createRole(Role theRole) {
        String roleName = "ROLE_"+theRole.getName().toUpperCase();
        //System.out.println(theRole.getName());
        Role role = new Role(roleName);
        if (roleRepository.existsByName(roleName)){
            throw new RoleAlreadyExistsException(theRole.getName() + " role already exists");
        }

        return roleRepository.save(role);

    }

    @Override
    public void deleteRole(Long roleId) {
        this.removeAllUsersFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    @Override
    public Role findRoleByName(String name) {

        return roleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {

        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (role.isPresent() && role.get().getUsers().contains(user.get())){
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }

        throw new UsernameNotFoundException("User not found");

    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {

        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (user.isPresent() && user.get().getRoles().contains(role.get())){
            throw new UserAlreadyExistsException(user.get().getFirstName()+ " is already been assigned assigned to the " + role.get().getName() + " role");
        }
        if (role.isPresent()){
            role.get().assignRoleToUser(user.get());
            roleRepository.save(role.get());

        }
        return user.get();
    }

    @Override
    public Role removeAllUsersFromRole(Long roleId)
    {
        Optional<Role> role = roleRepository.findById(roleId);
        role.ifPresent(Role::removeAllUsersFromRole);
        return roleRepository.save(role.get());
    }
}
