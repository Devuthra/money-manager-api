package in.dev.moneymanager.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

     @Value("${spring.mail.password}") 
    private String mailPassword;

    public void sendEmail(String to, String subject, String body){

        //  Safe check - doesn't expose password
    System.out.println("MAIL PASSWORD IS NULL: " + (mailPassword == null));
    System.out.println("MAIL PASSWORD LENGTH: " + (mailPassword != null ? mailPassword.length() : 0));

        try{
            SimpleMailMessage message=new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);


        }catch(Exception e){
            e.printStackTrace();
        }

    }
    
}
