package beans;

import pojo.ResultRow;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.enterprise.context.SessionScoped;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaQuery;
import javax.transaction.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Named("user")
@SessionScoped
public class User implements Serializable {
    private double y;
    private double x;
    private double r;
    private boolean in;

    @Resource
    private UserTransaction userTransaction;

    @PersistenceContext(unitName = "ResultTable")
    private EntityManager entityManager;

    @PostConstruct
    public void init(){
        r = 1;
        in = true;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isIn() {
        return in;
    }

    public List<ResultRow> getResultList() {
        CriteriaQuery<ResultRow> criteria = entityManager.getCriteriaBuilder().createQuery(ResultRow.class);
        criteria.select(criteria.from(ResultRow.class));
        return entityManager.createQuery(criteria).getResultList();
    }

    private void addToResultList(ResultRow resultRow){
        try {
            userTransaction.begin();
            entityManager.persist(resultRow);
            userTransaction.commit();
        } catch (NotSupportedException | SystemException | HeuristicMixedException | HeuristicRollbackException | RollbackException e) {
            e.printStackTrace();
        }
    }

    public void deleteAllResult(){
        try {
            userTransaction.begin();
            entityManager.createQuery("delete from ResultRow").executeUpdate();
            userTransaction.commit();
        } catch (NotSupportedException | SystemException | HeuristicMixedException | HeuristicRollbackException | RollbackException e) {
            e.printStackTrace();
        }
    }

    public void check(){

        in = (x <= 0 && x >= -r / 2 && y >= 0 && y <= (2 * x + r))
                || (x >= 0 && x <= r / 2 && y >= 0 && y <= Math.sqrt(r * r / 4 - x * x))
                || (x >= 0 && x <= r / 2 && y <= 0 && y >= -r);

        ResultRow currentRow = new ResultRow(getResultList().size() + 1,new Date(), in?"in":"out", x, y, r);
        addToResultList(currentRow);

    }
}
