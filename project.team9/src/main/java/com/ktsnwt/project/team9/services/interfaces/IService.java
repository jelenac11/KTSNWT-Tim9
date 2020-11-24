package com.ktsnwt.project.team9.services.interfaces;

public interface IService<T,ID> {
	
	public Iterable<T> getAll();
	public T getById();
	public void add(T entity);
	public boolean delete(ID id);
	public void update(ID id, T entity);
}
