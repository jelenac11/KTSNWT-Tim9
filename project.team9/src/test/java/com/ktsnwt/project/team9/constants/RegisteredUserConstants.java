package com.ktsnwt.project.team9.constants;

public class RegisteredUserConstants {
	
	public static final int PAGE = 0;
	public static final int PAGE_SIZE = 5;
	
	public static final int NUMBER_OF_ITEMS = 6;
	
	public static final String EMAIL = "email_adresa20@gmail.com";
	public static final String 	NON_EXISTING_EMAIL = "email_adresa30@gmail.com";
	
	public static final String USERNAME = "user 20";
	public static final String 	NON_EXISTING_USERNAME = "user 30";

	public static final String PART = "%email%";
	public static final String NON_EXISTING_PART = "%jelena%";
<<<<<<< Updated upstream
=======
	
	public static final Long USER_ID = 7L;
	public static final Long NEW_USER_ID = 21L;
	public static final Long NON_EXISTING_USER_ID = 50L;
	
	public static final String FIRSTNAME = "user";
	public static final String LASTNAME = "user";
	public static final String PASSWORD = "123456";
	
	public static final String EXISTING_USERNAME = "user 20";
	public static final String EXISTING_EMAIL = "email_adresa20@gmail.com";
	
	public static final String NEW_USERNAME = "jelenac11";
	public static final String NEW_EMAIL = "jelenacupac99@gmail.com";
	
	public static final List<Authority> AUTHORITIES = new ArrayList<Authority>() {
		private static final long serialVersionUID = 1L;

		{add(new Authority(1L,"ROLE_REGISTERED_USER"));}
	};
	public static final String ROLE = "ROLE_REGISTERED_USER";
	public static final String EPASSWORD = "asdghjkafvsbgdnhf,bgghjukilofgthyjuik";
	
>>>>>>> Stashed changes
}
