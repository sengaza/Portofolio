package com.bootcamp.books.util;

public class CommonResponse<T> {

	private CommonStatus responseStatus;
	private String requestId;
	private T data;
	
	public CommonResponse() {
		responseStatus = new CommonStatus("00", "Success");
	}
	
	public CommonStatus getResponseStatus() {
		return responseStatus;
	}
	public void setResponseStatus(CommonStatus responseStatus) {
		this.responseStatus = responseStatus;
	}
	public String getRequestId() {
		return requestId;
	}
	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	
	
}
