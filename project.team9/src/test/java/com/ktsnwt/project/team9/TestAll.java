package com.ktsnwt.project.team9;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;
import org.springframework.test.context.TestPropertySource;

import com.ktsnwt.project.team9.controller.integration.CulturalOfferControllerIntegrationTest;
import com.ktsnwt.project.team9.controller.integration.GeolocationControllerIntegrationTest;
import com.ktsnwt.project.team9.repository.integration.CulturalOfferRepositoryIntegrationTest;
import com.ktsnwt.project.team9.repository.integration.GeolocationRepositoryIntegrationTest;
import com.ktsnwt.project.team9.service.integration.CulturalOfferServiceIntegrationTest;
import com.ktsnwt.project.team9.service.integration.GeolocationServiceIntegrationTest;
import com.ktsnwt.project.team9.service.unit.CulturalOfferServiceUnitTest;
import com.ktsnwt.project.team9.service.unit.FileServiceUnitTest;
import com.ktsnwt.project.team9.service.unit.GeolocationServiceUnitTest;

@RunWith(Suite.class)
@SuiteClasses({ CulturalOfferControllerIntegrationTest.class, GeolocationControllerIntegrationTest.class,
		CulturalOfferServiceIntegrationTest.class, GeolocationServiceIntegrationTest.class,
		GeolocationServiceUnitTest.class, CulturalOfferServiceUnitTest.class, FileServiceUnitTest.class,
		CulturalOfferRepositoryIntegrationTest.class, GeolocationRepositoryIntegrationTest.class })
@TestPropertySource("classpath:test.properties")
public class TestAll {

}
