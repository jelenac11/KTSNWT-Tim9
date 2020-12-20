package com.ktsnwt.project.team9.services.implementations;

import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.User;
import com.ktsnwt.project.team9.services.interfaces.IUserService;

@Service
<<<<<<< Updated upstream
public class UserService implements IUserService {

=======
public class UserService implements IUserService, UserDetailsService {
	
	@Autowired
	private IRegisteredUser userRepo;
	
	@Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
	private MailService mailService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with email '%s'.", email));
        } else {
            return user;
        }
    }

    public void changePassword(String oldPassword, String newPassword) throws Exception {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String username = "";
        try {
        	username = ((User) currentUser.getPrincipal()).getEmail();
        } catch (Exception e) {
        	throw new IllegalAccessException("Invalid token.");
        }
        if (authenticationManager != null) {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, oldPassword));
        } else {
            return;
        }
        User user = (User) loadUserByUsername(username);

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setLastPasswordResetDate(new Date().getTime());
        userRepository.save(user);
    }
    
    @Override
	public User changeProfile(User entity) {
    	User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (!entity.getUsername().equals(user.getUsername())) {
			User usernameUser = userRepository.findByUsername(entity.getUsername());
			if (usernameUser != null) {
				throw new IllegalArgumentException("Username already taken");
			}
		}
		user.setUsername(entity.getUsername());
		user.setFirstName(entity.getFirstName());
		user.setLastName(entity.getLastName());
		return userRepository.save(user);
	}
	
>>>>>>> Stashed changes
	@Override
	public Iterable<User> getAll() {
		return null;
	}

	@Override
	public User getById(Long id) {
		return null;
	}

	@Override
	public User create(User entity) throws Exception {
		return null;
	}

	@Override
	public boolean delete(Long id) throws Exception {
		return false;
	}

	@Override
	public User update(Long id, User entity) throws Exception {
		return null;
	}
}
