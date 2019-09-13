package com.bootcamp.books.controller;

import java.util.List;

import com.bootcamp.books.dto.TransactionsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.books.enttity.Transactions;
import com.bootcamp.books.services.TransactionsDao;
import com.bootcamp.books.util.CommonResponse;
import com.bootcamp.books.util.CommonStatus;
import com.bootcamp.books.util.JsonUtil;

@RestController
@RequestMapping(path = "/api", produces = "application/json; charset=UTF-8")
public class TransactionsController {
    private static final String TRANSACTIONS_ADDR = "/transactions";
    private static final String TRANSACTIONS_BY_ID_ADDR = TRANSACTIONS_ADDR + "/{transactionId}";
    private static final String TRANSACTIONS_PAGE_ADDR = TRANSACTIONS_ADDR + "/page";

    private CommonStatus commonStatus = new CommonStatus();

    @Autowired
    private TransactionsDao transactionDao;

    @GetMapping(TRANSACTIONS_ADDR)
    public String getAllTrans() throws Exception {
        List<Transactions> result = transactionDao.getAllTransactions();
        CommonResponse<List<Transactions>> response = new CommonResponse<List<Transactions>>();
        try {
            if (result == null) {
                commonStatus.setResponseCode("404");
                commonStatus.setResponseDesc("Transactions not found");
                response.setResponseStatus(commonStatus);
                return JsonUtil.generateJson(response);
            } else {
                commonStatus.setResponseCode("200");
                commonStatus.setResponseDesc("Success");
                response.setResponseStatus(commonStatus);
                response.setData(result);

            }
        } catch (Exception e) {
            e.getMessage();
        }
        return JsonUtil.generateJson(response);
    }

    @GetMapping(TRANSACTIONS_BY_ID_ADDR)
    public String getBookByBookId(@PathVariable("transactionId") String transactionId) throws Exception {
        Transactions result = transactionDao.getTransactionById(transactionId);
        CommonResponse<Transactions> response = new CommonResponse<Transactions>();
        try {
            if (result == null) {
                commonStatus.setResponseCode("404");
                commonStatus.setResponseDesc("Transaction not found");
                response.setResponseStatus(commonStatus);
                return JsonUtil.generateJson(response);
            } else {
                commonStatus.setResponseCode("200");
                commonStatus.setResponseDesc("Success");
                response.setResponseStatus(commonStatus);
                response.setData(result);
            }
        } catch (Exception e) {
            e.getMessage();
        }
        return JsonUtil.generateJson(response);
    }

    @PostMapping(TRANSACTIONS_ADDR)
    public String addTransaction(@RequestBody TransactionsDto tmpTransaction) throws Exception {
        Transactions result = transactionDao.addTransaction(tmpTransaction);
        CommonResponse<Transactions> response = new CommonResponse<Transactions>();
        try {
            commonStatus.setResponseCode("200");
            commonStatus.setResponseDesc("Success");
            response.setResponseStatus(commonStatus);
            response.setData(result);
        } catch (Exception e) {
            commonStatus.setResponseCode("409");
            commonStatus.setResponseDesc(e.getMessage());
            response.setResponseStatus(commonStatus);
        }
		return JsonUtil.generateJson(response);
    }

    @PutMapping(TRANSACTIONS_BY_ID_ADDR)
    public String updateTransactionById(@RequestBody Transactions transaction) throws Exception {
        Transactions result = transactionDao.updateTransactionById(transaction);
        CommonResponse<Transactions> response = new CommonResponse<Transactions>();
        try {
            if (result == null) {
                commonStatus.setResponseCode("404");
                commonStatus.setResponseDesc("Students not found");
                response.setResponseStatus(commonStatus);
                return JsonUtil.generateJson(response);
            } else {
                commonStatus.setResponseCode("200");
                commonStatus.setResponseDesc("Success");
                response.setResponseStatus(commonStatus);
                response.setData(result);
            }
        } catch (Exception e) {
            e.getMessage();
        }
        return JsonUtil.generateJson(response);
    }

    @DeleteMapping(TRANSACTIONS_BY_ID_ADDR)
    public String deleteTransactionById(@PathVariable("transactionId") String transactionId) throws Exception {
        Boolean result = transactionDao.deleteTransactionById(transactionId);
        CommonResponse<Transactions> response = new CommonResponse<Transactions>();
        try {
            if (!result) {
                commonStatus.setResponseCode("404");
                commonStatus.setResponseDesc("Transactions not found");
                response.setResponseStatus(commonStatus);
                return JsonUtil.generateJson(response);
            } else {
                transactionDao.deleteTransactionById(transactionId);
                commonStatus.setResponseCode("200");
                commonStatus.setResponseDesc("Delete students success");
                response.setResponseStatus(commonStatus);
            }
        } catch (Exception e) {
            e.getMessage();
        }
        return JsonUtil.generateJson(response);
    }

    @GetMapping(TRANSACTIONS_PAGE_ADDR)
    public Page<Transactions> getPage(@RequestParam(name = "page", defaultValue = "0") int page) throws Exception {
        return transactionDao.findPaging(page);
    }
}
