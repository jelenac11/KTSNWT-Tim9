package com.ktsnwt.project.team9.services.implementations;

import org.springframework.stereotype.Service;

import com.ktsnwt.project.team9.model.News;
import com.ktsnwt.project.team9.services.interfaces.INewsService;

@Service
public class NewsService implements INewsService {

	@Override
	public Iterable<News> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public News getById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public News create(News entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(Long id) throws Exception {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public News update(Long id, News entity) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
