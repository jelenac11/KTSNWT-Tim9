package com.ktsnwt.project.team9.helper.implementations;

import org.springframework.stereotype.Component;
import com.ktsnwt.project.team9.dto.TextDTO;
import com.ktsnwt.project.team9.helper.interfaces.IMapper;
import com.ktsnwt.project.team9.model.Text;

@Component
public class TextMapper implements IMapper<Text, TextDTO> {

	@Override
	public Text toEntity(TextDTO dto) {
		return new Text();
	}

	@Override
	public TextDTO toDto(Text entity) {
		return new TextDTO();
	}
}
