package com.example.project.controller;

import com.example.project.config.UserLoginToken;
import com.example.project.entity.Notice;
import com.example.project.entity.Servicing;
import com.example.project.service.ServiceServicing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

/**
 * Created with IntelliJ IDEA.
 *
 * @Author: XXXXX
 * @Date: 2022/02/19/0:58
 * @Description:
 */
@RestController
@RequestMapping("servicing")
public class ControllerServicing {
    @Autowired
    private ServiceServicing serviceServicing;

    @UserLoginToken
    @GetMapping("pages")
    @ResponseBody
    public Object getPages(
            @RequestParam(value = "current", defaultValue = "1") Integer current,
            @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize,
            @RequestParam(value = "status",defaultValue = "-1") Integer status,
            @RequestParam(value = "userPhone",defaultValue = "") String userPhone,
            @RequestParam(value = "userName",defaultValue = "") String userName
    ){
        return serviceServicing.getPages(current,pageSize,status,userName, userPhone);
    }

    @UserLoginToken
    @PostMapping("insert")
    @ResponseBody
    public Object insert(@RequestBody Servicing servicing){
        return serviceServicing.insertData(servicing);
    }

    @UserLoginToken
    @PostMapping("update")
    @ResponseBody
    public Object update(@RequestBody Servicing servicing){
        return serviceServicing.updateData(servicing);
    }

    @UserLoginToken
    @GetMapping("delete")
    @ResponseBody
    public Object delete(@RequestParam(value = "id", defaultValue = "0") Integer id){
        return serviceServicing.deleteData(id);
    }
}
