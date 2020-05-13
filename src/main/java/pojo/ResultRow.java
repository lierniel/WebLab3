package pojo;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "result_table")
public class ResultRow {
    @Id
    private int n;
    @Column(name = "creation_date")
    private Date creationDate;
    private String result;
    private double x;
    private double y;
    private double r;

    public ResultRow(){}

    public ResultRow(int n, Date creationDate, String result, double x, double y, double r) {
        this.n = n;
        this.creationDate = creationDate;
        this.result = result;
        this.x = x;
        this.y = y;
        this.r = r;
    }

    @Id
    @Column(name = "n")
    public int getN() {
        return n;
    }

    public void setN(int n) {
        this.n = n;
    }

    @Basic
    @Column(name = "result")
    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    @Basic
    @Column(name = "x")
    public double getX() {
        return this.x;
    }

    public void setX(double x) {
        this.x = x;
    }

    @Basic
    @Column(name = "y")
    public double getY() {
        return this.y;
    }

    public void setY(double y) {
        this.y = y;
    }

    @Basic
    @Column(name = "r")
    public double getR() {
        return this.r;
    }

    public void setR(double r) {
        this.r = r;
    }

    @Basic
    @Column(name = "creation_date")
    public Date getCreationDate(){
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

}
