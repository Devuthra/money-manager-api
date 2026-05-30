package in.dev.moneymanager.util;
import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private static final String SECRET =
            "mysecretkeymysecretkeymysecretkey12345";

    private static final long EXPIRATION =
            1000 * 60 * 60 * 24;

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    // generate token
    public String generateToken(String email){

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION)
                )
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // extract username/email
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    // extract expiration
    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    // generic claim extractor
    public <T> T extractClaim(String token,
                              Function<Claims, T> claimsResolver){

        final Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }

    // extract all claims
    private Claims extractAllClaims(String token){

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // check expiration
    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    // validate token
    public boolean validateToken(String token,
                                 UserDetails userDetails){

        final String username = extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }
}