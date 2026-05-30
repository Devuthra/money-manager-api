package in.dev.moneymanager.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import in.dev.moneymanager.dto.ExpenseDTO;
import in.dev.moneymanager.dto.IncomeDTO;
import in.dev.moneymanager.dto.RecentTransactionDTO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    public Map<String, Object> getDashboardData() {

        Map<String, Object> returnValue = new LinkedHashMap<>();

        // Latest incomes
        List<IncomeDTO> latestIncomes =
                incomeService.getLatest5IncomeForCurrentUser();

        // Latest expenses
        List<ExpenseDTO> latestExpenses =
                expenseService.getLatest5ExpensesForCurrentUser();

        // Recent transactions
        List<RecentTransactionDTO> recentTransactions =

                Stream.concat(

                        latestIncomes.stream().map(income ->

                                RecentTransactionDTO.builder()
                                        .id(income.getId())
                                        .icon(income.getIcon())
                                        .name(income.getName())
                                        .amount(income.getAmount())
                                        .date(income.getDate())
                                        .type("income")
                                        .build()

                        ),

                        latestExpenses.stream().map(expense ->

                                RecentTransactionDTO.builder()
                                        .id(expense.getId())
                                        .icon(expense.getIcon())
                                        .name(expense.getName())
                                        .amount(expense.getAmount())
                                        .date(expense.getDate())
                                        .type("expense")
                                        .build()

                        )

                )

                .sorted((a, b) ->
                        b.getDate().compareTo(a.getDate())
                )

                .collect(Collectors.toList());

        // Total Balance
        returnValue.put(
                "totalBalance",
                incomeService.getTotalIncomeForCurrentUser()
                        .subtract(
                                expenseService.getTotalExpenseForCurrentUser()
                        )
        );

        // Total Income
        returnValue.put(
                "totalIncome",
                incomeService.getTotalIncomeForCurrentUser()
        );

        // Total Expense
        returnValue.put(
                "totalExpense",
                expenseService.getTotalExpenseForCurrentUser()
        );

        // Recent Data
        returnValue.put("recent5Expenses", latestExpenses);
        returnValue.put("recent5Incomes", latestIncomes);
        returnValue.put("recentTransactions", recentTransactions);

        return returnValue;
    }
}