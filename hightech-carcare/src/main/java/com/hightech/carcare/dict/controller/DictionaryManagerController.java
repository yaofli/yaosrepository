package com.hightech.carcare.dict.controller;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.hightech.carcare.controller.BaseController;
import com.hightech.carcare.dict.model.Dictionary;
import com.hightech.carcare.dict.service.DictionaryManagerService;

@Controller("dictionaryManagerController")
@Component
public class DictionaryManagerController extends BaseController<Dictionary> {
	
	private static final String ENABLED_PARENTCODE="001";
	
	@Inject
	DictionaryManagerService dictionaryManagerService;
	
	@RequestMapping(value = "/dictmanager/dictenabled", method = RequestMethod.POST)
	public void enabledDicts(HttpServletResponse resp){
		List<Dictionary> dicts = dictionaryManagerService.fetchDictionaryByParentCode(ENABLED_PARENTCODE);
		
		this.write(dicts, resp);
		System.out.println("adfasdf");
	}
}
