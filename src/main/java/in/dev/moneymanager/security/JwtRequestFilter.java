package in.dev.moneymanager.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import in.dev.moneymanager.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader =
                request.getHeader("Authorization");

        String email = null;
        String jwt = null;

        try {

            System.out.println("AUTH HEADER: " + authHeader);

            if (authHeader != null &&
                    authHeader.startsWith("Bearer ")) {

                jwt = authHeader.substring(7);

                System.out.println("JWT TOKEN: " + jwt);

                email = jwtUtil.extractUsername(jwt);

                System.out.println("EMAIL FROM TOKEN: " + email);
            }

            if (email != null &&
                    SecurityContextHolder.getContext()
                            .getAuthentication() == null) {

                UserDetails userDetails =
                        this.userDetailsService
                                .loadUserByUsername(email);

                System.out.println("USER DETAILS EMAIL: "
                        + userDetails.getUsername());

                boolean isValid =
                        jwtUtil.validateToken(jwt, userDetails);

                System.out.println("TOKEN VALID: " + isValid);

                if (isValid) {

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder.getContext()
                            .setAuthentication(authToken);

                    System.out.println("AUTHENTICATION SET SUCCESS");
                }
            }

        } catch (ExpiredJwtException e) {

            System.out.println("JWT TOKEN EXPIRED");

        } catch (JwtException e) {

            System.out.println("JWT TOKEN INVALID");

        } catch (Exception e) {

            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}