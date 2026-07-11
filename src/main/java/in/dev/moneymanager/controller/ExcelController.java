package in.dev.moneymanager.controller;

import java.io.ByteArrayInputStream;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.dev.moneymanager.service.ExcelService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/excel")
public class ExcelController {

    private final ExcelService excelService;

    @GetMapping("/download/income")
    public ResponseEntity<InputStreamResource> downloadIncomeExcel() {
        ByteArrayInputStream stream = excelService.generateIncomeExcel();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=income_details.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(stream));
    }

    @GetMapping("/download/expense")
public ResponseEntity<InputStreamResource> downloadExpenseExcel() {
    ByteArrayInputStream stream = excelService.generateExpenseExcel();

    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-Disposition", "attachment; filename=expense_details.xlsx");

    return ResponseEntity.ok()
            .headers(headers)
            .contentType(MediaType.parseMediaType(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
            .body(new InputStreamResource(stream));
}
}