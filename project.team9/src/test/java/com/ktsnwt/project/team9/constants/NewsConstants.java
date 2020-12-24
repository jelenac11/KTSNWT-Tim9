package com.ktsnwt.project.team9.constants;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import com.ktsnwt.project.team9.dto.NewsDTO;

public class NewsConstants {

	public static final int PAGE_NO = 0;
	public static final int NON_EXISTING_PAGE_NO = 50;
	public static final int PAGE_SIZE = 5;
	

	public static final Long EXISTING_CULTURAL_OFFER_ID = 1L;
	public static final Long NON_EXISTING_CULTURAL_OFFER_ID = 300L;
	public static final Long CULTURAL_OFFER_ID_NOT_SUBSCRIBED = 5L;
	
	public static final Long NEWS_ID = 1L;
	public static final Long NON_EXIST_NEWS_ID = 200L;
	
	
	public static final Long EXISTING_REGISTERED_USER_ID = 7L;
	public static final Long NON_EXISTING_REGISTERED_USER_ID = 200L;
	
	public static final long FIRST_NEWS_DATE = 1606750229093L;
	
	private static final Set<String> IMAGES = new HashSet<String>(Arrays.asList("random_slika1.jpg", "random_slika2.jpg", "random_slika3.jpg"));
	public static final NewsDTO NEWS_FOR_CREATE = new NewsDTO(null, "RNG", FIRST_NEWS_DATE, false, IMAGES, 1L);
	
	public static final NewsDTO NEWS_FOR_UPDATE = new NewsDTO(null, "RNG_UPDATE", FIRST_NEWS_DATE, false, IMAGES, 1L);
	
}
