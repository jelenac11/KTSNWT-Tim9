package com.ktsnwt.project.team9.constants;

import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.RegisteredUser;

public class MarkConstants {

	public static final int PAGE = 0;
	public static final int PAGE_SIZE = 5;
	
	public static final int NUMBER_OF_ITEMS = 13;
	
	public static final int VALUE = 2;
	public static final int VALUE_UPDATED = 4;
	
	public static final Long GRADER_ID = 7L;
	public static final Long NON_EXISTING_GRADER_ID = 66L;
	public static final RegisteredUser GRADER = new RegisteredUser(GRADER_ID);
	public static final RegisteredUser NON_EXISTING_GRADER = new RegisteredUser(NON_EXISTING_GRADER_ID);
	
	public static final Long CULTURAL_OFFER_ID = 1L;
    public static final Long NON_EXISTING_CULTURAL_OFFER_ID = 66L;
    public static final CulturalOffer CULTURAL_OFFER = new CulturalOffer(CULTURAL_OFFER_ID);
    public static final CulturalOffer NON_EXISTING_CULTURAL_OFFER = new CulturalOffer(NON_EXISTING_CULTURAL_OFFER_ID);
    
    public static final Long MARK_ID = 1L;
    public static final Long NON_EXISTING_MARK_ID = 66L;
}
