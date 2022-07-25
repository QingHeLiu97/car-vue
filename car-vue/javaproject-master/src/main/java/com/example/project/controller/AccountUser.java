package com.example.project.controller;

import com.example.project.entity.User;
import com.example.project.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("account")
public class AccountUser {
    @Autowired
    private AccountService accountService;

    @PostMapping("login")
    public Object login(@RequestBody User user){
        return accountService.login(user);
    }
}
