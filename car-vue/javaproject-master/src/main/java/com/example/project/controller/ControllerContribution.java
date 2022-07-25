package com.example.project.controller;

import com.example.project.config.UserLoginToken;
import com.example.project.entity.Complaint;
import com.example.project.entity.Contribution;
import com.example.project.service.ServiceContribution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created with IntelliJ IDEA.
 *
 * @Author: XXXXX
 * @Date: 2022/02/19/0:58
 * @Description:
 */
@RestController
@RequestMapping("contribution")
public class ControllerContribution {
    @Autowired
    ServiceContribution serviceContribution;

    @UserLoginToken
    @GetMapping("pages")
    @ResponseBody
    public Object getPages(
            @RequestParam(value = "current", defaultValue = "1") Integer current,
            @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize,
            @RequestParam(value = "userId",defaultValue = "0") Integer userId,
            @RequestParam(value = "type",defaultValue = "") String type,
            @RequestParam(value = "project",defaultValue = "") String project,
            @RequestParam(value = "userName",defaultValue = "") String userName,
            @RequestParam(value = "userPhone",defaultValue = "") String userPhone

    ){
        return serviceContribution.getPages(current,pageSize,userId,type,project,userName,userPhone);
    }

    @UserLoginToken
    @PostMapping("insert")
    @ResponseBody
    public Object insert(@RequestBody Contribution contribution){
        return serviceContribution.insertData(contribution);
    }
}
