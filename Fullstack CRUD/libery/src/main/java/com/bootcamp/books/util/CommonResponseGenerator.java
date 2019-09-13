package com.bootcamp.books.util;

import java.util.UUID;

public class CommonResponseGenerator {
	public <T> CommonResponse<T> generateCommonResponse(Class<T> clz) {
		CommonResponse<T> resp = new CommonResponse<T>();
		resp.setRequestId(generateRequestId());
		return resp;
	}

	public <T> CommonResponse<T> generateCommonResponse(String responseCode, String responseDesc, Class<T> clz) {
		CommonResponse<T> resp = generateCommonResponse(clz);
		CommonStatus stat = new CommonStatus(responseCode, responseDesc);
		resp.setResponseStatus(stat);
		return resp;
	}

	public <T> CommonResponse<T> generateCommonResponse(T t) {
		CommonResponse<T> resp = new CommonResponse<T>();
		resp.setRequestId(generateRequestId());
		resp.setData(t);
		return resp;
	}

	public <T> CommonResponsePaging<T> generateCommonResponsePaging(Class<T> clz) {
		CommonResponsePaging<T> resp = new CommonResponsePaging<T>();
		resp.setRequestId(generateRequestId());
		return resp;
	}

	public <T> CommonResponsePaging<T> generateCommonResponsePaging(String responseCode, String responseDesc,
			Class<T> clz) {
		CommonResponsePaging<T> resp = generateCommonResponsePaging(clz);
		CommonStatus stat =  new CommonStatus (responseCode, responseDesc);
		resp.setResponseStatus(stat);
		return resp;
	}

	public <T> CommonResponsePaging<T> generateCommonResponsePaging(CommonPaging<T> t) {
		CommonResponsePaging<T> resp = new CommonResponsePaging<T>();
		resp.setRequestId(generateRequestId());
		resp.setPaging(t);
		return resp;
	}

	public String generateRequestId() {
		return UUID.randomUUID().toString();
	}
}
