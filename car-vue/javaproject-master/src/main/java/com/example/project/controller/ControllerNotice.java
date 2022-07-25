package com.example.project.controller;

import com.example.project.config.UserLoginToken;
import com.example.project.entity.Notice;
import com.example.project.service.ServiceNotice;
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
@RequestMapping("notice")
public class ControllerNotice {
    @Autowired
    private ServiceNotice serviceNotice;

    @UserLoginToken
    @GetMapping("pages")
    @ResponseBody
    public Object getPages(
            @RequestParam(value = "current", defaultValue = "1") Integer current,
            @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize
    ){
        return serviceNotice.getPages(current,pageSize);
    }

    @UserLoginToken
    @PostMapping("insert")
    @ResponseBody
    public Object insert(@RequestBody Notice notice){
        return serviceNotice.insertData(notice);
    }

    @UserLoginToken
    @PostMapping("update")
    @ResponseBody
    public Object update(@RequestBody Notice notice){
        return serviceNotice.updateData(notice);
    }

    @UserLoginToken
    @GetMapping("delete")
    @ResponseBody
    public Object delete(@RequestParam(value = "id", defaultValue = "") Integer id){
        return serviceNotice.deleteData(id);
    }
}
