package in.dev.moneymanager.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Service;

import in.dev.moneymanager.dto.IncomeDTO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExcelService {

    private final IncomeService incomeService;

    public ByteArrayInputStream generateIncomeExcel() {
        List<IncomeDTO> incomes = incomeService.getCurrentMonthIncomeForCurrentUser();

        try (XSSFWorkbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("Income");

            // Header style
            XSSFCellStyle headerStyle = workbook.createCellStyle();
            XSSFFont headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(new XSSFColor(new byte[]{(byte)255, (byte)255, (byte)255}, null)); // white text
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(
                new XSSFColor(new byte[]{(byte)103, (byte)58, (byte)183}, null) // purple
            );
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // Header row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"#", "Name", "Category", "Amount", "Date"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Data rows
            int rowNum = 1;
            for (IncomeDTO income : incomes) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(rowNum - 1);
                row.createCell(1).setCellValue(income.getName());
                row.createCell(2).setCellValue(income.getCategoryName());
                row.createCell(3).setCellValue(income.getAmount().doubleValue());
                row.createCell(4).setCellValue(income.getDate().toString());
            }

            // Auto size columns
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate Excel file: " + e.getMessage());
        }
    }
}