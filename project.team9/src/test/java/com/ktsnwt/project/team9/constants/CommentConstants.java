package com.ktsnwt.project.team9.constants;

import com.ktsnwt.project.team9.model.CulturalOffer;
import com.ktsnwt.project.team9.model.Image;
import com.ktsnwt.project.team9.model.RegisteredUser;

public class CommentConstants {

	public static final int PAGE = 0;
	public static final int PAGE_SIZE = 5;
	
	public static final String PATH = "src/test/resources/uploadedImages/";
	
	public static final Long CULTURAL_OFFER_ID = 1L;
	public static final Long CULTURAL_OFFER_ID2 = 2L;
	public static final Long NON_EXISTING_CULTURAL_OFFER_ID = 20L;
	
	public static final Long CULTURAL_OFFER_USER_ID = 4L;
	public static final Long CULTURAL_OFFER_USER_ID_NO_COMMENTS_FOR_APPROVING = 1L;
	public static final Long NON_EXISTING_CULTURAL_OFFER_USER_ID = 11L;
	
	public static final boolean APPROVED = true;
	public static final boolean DECLINED = false;
	
	public static final Long COMMENT_ID = 1L;
	public static final Long COMMENT_ID2 = 2L;
	public static final Long COMMENT_ID3 = 3L;
	public static final Long COMMENT_ID4 = 4L;
	public static final Long NON_EXISTING_COMMENT_ID = 11L;
	
	public static final int NUMBER_OF_ITEMS = 7;
	
	public static final RegisteredUser REG_USER = new RegisteredUser(11L);
	public static final Long USER_ID = 11L;
	public static final CulturalOffer CULTURAL_OFFER = new CulturalOffer(1L);
	public static final CulturalOffer CULTURAL_OFFER2 = new CulturalOffer(2L);
	public static final CulturalOffer NON_EXISTING_CULTURAL_OFFER = new CulturalOffer(NON_EXISTING_CULTURAL_OFFER_ID);
	public static final String TEXT = "tekst komentara";
	public static final long TIME = 1608560339402L;
	
	public static final String IMAGEURL = "src/test/resources/uploadedImages/slika2.jpg";
	public static final Image IMAGE = new Image(IMAGEURL);
	public static final String IMAGE_PATH = PATH + "comment" + USER_ID + TIME + "_slika2.jpg";
	public static final Image CREATED_IMG = new Image(IMAGE_PATH);

}

