package br.com.robsonlangkammer.testeCastGroup.bean;


import java.util.List;

/**
 * Created by robson on 19/06/19.
 */
public class ResultResponseList {
    private List<Object> data;

    private long totalElements;
    private long totalPages;

    public ResultResponseList() {

    }
    public ResultResponseList(List<Object> data, long totalPages,long totalElements) {
        this.data = data;
        this.totalPages = totalPages;
        this.totalElements = totalElements;

    }

    public List<Object> getData() {
        return data;
    }

    public void setData(List<Object> data) {
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