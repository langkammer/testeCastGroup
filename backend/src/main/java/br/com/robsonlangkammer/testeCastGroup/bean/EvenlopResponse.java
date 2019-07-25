package br.com.robsonlangkammer.testeCastGroup.bean;

import br.com.robsonlangkammer.testeCastGroup.model.StatusResponseEnum;
import com.fasterxml.jackson.annotation.JsonInclude;

public class EvenlopResponse {


    private final StatusResponseEnum status;

    private String menssage;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object data;

    private long totalElements;

    private long totalPages;

    public EvenlopResponse(StatusResponseEnum status,long totalPages,long totalElements, String menssage, Object data) {
        this.status = status;
        this.menssage = menssage;
        this.data = data;
        this.totalPages = totalPages;
        this.totalElements = totalElements;

    }

    public EvenlopResponse(StatusResponseEnum status, String menssage, Object data) {
        this.status = status;
        this.menssage = menssage;
        this.data = data;
    }

    public EvenlopResponse(StatusResponseEnum status, String menssage) {
        this.status = status;
        this.menssage = menssage;
    }

    public StatusResponseEnum getStatus() {
        return status;
    }

    public String getMenssage() {
        return menssage;
    }

    public void setMenssage(String menssage) {
        this.menssage = menssage;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public long getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(long totalPages) {
        this.totalPages = totalPages;
    }
}