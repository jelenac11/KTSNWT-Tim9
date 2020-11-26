package com.ktsnwt.project.team9.services.interfaces;

public interface IService<T,ID> {
	
	public Iterable<T> getAll();
	public T getById(ID id);
	public T create(T entity) throws Exception;
	public boolean delete(ID id) throws Exception;
	public T update(ID id, T entity) throws Exception;
}
