package com.codespring.sconesbackend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthEntryPoint authEntryPoint;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling((exceptionHandling) ->
                        exceptionHandling.authenticationEntryPoint(authEntryPoint)
                )
                .sessionManagement((sessionManagement) ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests((authorize) ->
                        authorize
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/users/**").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/conferences/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "api/conferences/**")
                                .hasAnyAuthority("DIRECTOR", "ADMIN")
                                .requestMatchers(HttpMethod.PUT, "api/conferences/**")
                                .hasAnyAuthority("DIRECTOR", "ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "api/conferences/**")
                                .hasAnyAuthority("DIRECTOR", "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/papers/by-user")
                                .hasAnyAuthority("AUTHOR", "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/papers/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/papers/**")
                                .hasAnyAuthority("AUTHOR", "ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/papers/approve/**")
                                .hasAnyAuthority("SUPERVISOR", "ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/papers/**")
                                .hasAnyAuthority("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/files/**")
                                .hasAnyAuthority("AUTHOR", "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/sections-conference/**")
                                .hasAnyAuthority("AUTHOR", "SUPERVISOR", "DIRECTOR", "ADMIN")
                                .requestMatchers(HttpMethod.PUT, "api/sections-conference/register-to-conference")
                                .hasAnyAuthority("AUTHOR", "ADMIN")
                                .requestMatchers(HttpMethod.PUT, "api/sections-conference/add-juries")
                                .hasAnyAuthority("DIRECTOR", "ADMIN")
                                .requestMatchers(HttpMethod.PUT, "api/sections-conference/id")
                                .hasAnyAuthority("DIRECTOR", "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/sections/**")
                                .hasAnyAuthority("DIRECTOR", "ADMIN", "AUTHOR")
                                .requestMatchers(HttpMethod.POST, "/api/sections/**")
                                .hasAnyAuthority("AUTHOR", "SUPERVISOR", "DIRECTOR", "ADMIN")
                                .anyRequest()
                                .permitAll()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider)
                .httpBasic(Customizer.withDefaults())
                .cors(Customizer.withDefaults());

        return http.build();
    }
}
