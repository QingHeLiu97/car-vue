package com.example.project.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.project.config.UserLoginToken;
import com.example.project.entity.PayFree;
import com.example.project.service.PayFreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("pay")
public class PayFreecontroller {

    @Autowired
    private PayFreeService payFreeService;

    @UserLoginToken
    @PostMapping("insert")
    @ResponseBody
    public Object insertPayCount(PayFree payFree){
        return payFreeService.insertPayCount(payFree);
    }

    @UserLoginToken
    @GetMapping("delete")
    @ResponseBody
    public Object deletePayCount(@RequestParam(value = "id" ,required = false) String id){
        return payFreeService.deletePayCount(Integer.valueOf(id));
    }

    @UserLoginToken
    @PostMapping("update")
    @ResponseBody
    public Object updatePayCount(PayFree payFree){
        return payFreeService.updatePayCount(payFree);
    }

    @UserLoginToken
    @GetMapping("select")
    @ResponseBody
    public Object selectPayCount(
            @RequestParam(value = "current", defaultValue = "1") Integer current,
            @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize,
            @RequestParam(value = "status", defaultValue = "0") Integer status
    ){
        return payFreeService.selectPayCount(current, pageSize, status);
    }

    @UserLoginToken
    @GetMapping("/seletById")
    @ResponseBody
    public Object selectPayCountById(@RequestParam(value = "id") String id){
        return payFreeService.selectById(Integer.valueOf(id));
    }

}
